const dbConnection = require("../data/dbConnection");
const slugify = require("slugify");

const index = (req, res, next) => {
    const filters = req.query;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let sql = `
      SELECT doctors.*, GROUP_CONCAT(specializations.specialization) AS specializations
      FROM doctors
      LEFT JOIN doctors_specializations ON doctors_specializations.doctor_id = doctors.id
      LEFT JOIN specializations ON doctors_specializations.specialization_id = specializations.id
    `;

    const params = [];
    const conditions = [];

    for (const key in filters) {
        if (filters[key]) {
            if (key === "firstname" || key === "lastname") {
                conditions.push(`doctors.${key} LIKE ?`);
                params.push(`%${filters[key]}%`);
            } else if (key === "specialization") {
                conditions.push("specializations.specialization LIKE ?");
                params.push(`%${filters[key]}%`);
            }
        }
    };

    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` GROUP BY doctors.id LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    dbConnection.query(sql, params, (err, results) => {

        if (err) {
            return next(new Error(err.message))
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            })
        }

        return res.status(200).json({
            status: "success",
            page,
            limit,
            data: results
        })
    });
};

const show = (req, res, next) => {
    const slug = req.params.slug;

    // Doctor details
    const sql = `
        SELECT doctors.*, CAST(AVG(reviews.vote) AS DECIMAL(10, 1)) AS vote_avg
        FROM doctors
        LEFT JOIN reviews
        ON reviews.doctor_id = doctors.id
        WHERE doctors.slug = ?`;

    const reviewsSql = `
        SELECT reviews.*
        FROM reviews
        JOIN doctors
        ON reviews.doctor_id = doctors.id
        WHERE doctors.slug = ?
    `;

    dbConnection.query(sql, [slug], (err, doctor) => {
        if (err) {
            return next(new Error(err.message))
        }
        console.log(doctor)
        if (doctor.length === 0 || doctor[0].slug === null) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            })
        };

        dbConnection.query(reviewsSql, [slug], (err, reviews) => {
            return res.status(200).json({
                status: "success",
                data: {
                    ...doctor[0],
                    reviews
                }
            });
        });
    });
};

// Aggiunta doctor - Move to Controller
const store = (req, res, next) => {

    //se req.file esiste accede a filename e carichi cmq img - altrimenti imgname=undefined e non da errori
    const imageName = req.files?.image ? req.files.image[0].filename : null;
    const resumeName = req.files?.resume ? req.files.resume[0].filename : null;

    //specialization ??
    const { firstname, lastname, phone, email, address, city, specialization} = req.body
    const slug = slugify(`${firstname} ${lastname}`, {
        lower: true,
        strict: true,
    })

    if ((firstname.length && lastname.length) <= 3) {
        return res.status(400).json({
            status: "fail",
            message: "Il firstname e il lastname devono essere piu' lunghi di 3 caratteri"
        })
    }

    if (address.length <= 5) {
        return res.status(400).json({
            status: "fail",
            message: "L`indirizzo deve essere piu'lungo di 5 caratteri"
        });
    };

    //ciclo caratteri phone
    for (let char of phone) {
        if (!(char >= "0" && char <= "9") && (char !== ("+" && phone[0]))) {
            return res.status(400).json({
                status: "fail",
                message: "Deve contenere solo numeri e il segno + va messo unicamente davanti al numero"
            });
        };
    };

    for (let key in req.body) {
        if (key.trim().length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Non ci possono essere campi vuoti"
            });
        };
    };

    const sql = `
      INSERT INTO doctors(slug, firstname, lastname, phone, email, address, city, image, resume)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConnection.query(sql, [slug, firstname, lastname, phone, email, address, city, imageName, resumeName], (err, doctors) => {
        if (err) {
            return next(new Error(err.message))
        };

        //aggiungiamo campo specialization
        const sqlNewIdDoctor = `
           select id
           from doctors
           where slug = ?
         `;

        dbConnection.query(sqlNewIdDoctor, [slug], (err, results) => {
            if (err) {
                return next(new Error(err.message))
            };

            const sqlTabellaPonte = `
              INSERT INTO doctors_specializations(doctor_id, specialization_id)
              VALUES(?, ?)
            `;

            dbConnection.query(sqlTabellaPonte, [results[0].id, specialization], (err, risultati) => {
                if (err) {
                    return next(new Error(err.message))
                }
                return res.status(201).json({
                    status: "success",
                    message: "doctor aggiunto con successo"
                });
            });
        });
    });
};

const storereviews = (req, res, next) => {
    const id = req.params.id;
    const { patient, vote, review, email } = req.body;

    // Validation vote
    if (isNaN(vote) || vote < 0 || vote > 5) {
        return res.status(400).json({
            status: "fail",
            message: "Il vote deve essere compreso tra 0 e 5"
        });
    }

    // Validation patient
    if (patient.length <= 3) {
        return res.status(400).json({
            status: "fail",
            message: "firstname e lastname incompleto, almeno 4 caratteri"
        });
    }

    // Validation review
    if (review && review.length > 0 && review.length < 5) {
        return res.statu(400).json({
            status: "fail",
            message: "La review deve essere più lunga"
        });
    }

    const doctorsSql = `
      SELECT *
      FROM doctors
      WHERE id = ?
    `
    dbConnection.query(doctorsSql, [id], (err, results) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            });
        };

        const sql = `
          INSERT INTO reviews(doctor_id, patient, review, vote, email)
          VALUE (?, ?, ?, ?, ?)
         `;

        dbConnection.query(sql, [id, patient, review, vote, email], (err) => {
            if (err) {
                return next(new Error("Errore interno del server"));
            }
            res.status(201).json({
                status: "success",
                message: "review aggiunta"
            });
        });
    });
};

const destroy = (req, res, next) => {

};

module.exports = {
    index,
    show,
    store,
    storereviews,
    destroy
};