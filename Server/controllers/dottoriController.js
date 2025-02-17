const dbConnection = require("../data/dbConnection");
const slugify = require("slugify");
const { v4: uuidv4 } = require('uuid'); // dipendenza uuid genera nuovo id/slug univoco

const index = (req, res, next) => {
    const filters = req.query;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    // GROUP_CONCAT(specializations.specialization) AS specializations
    // LEFT JOIN doctors_specializations ON doctors_specializations.doctor_id = doctors.id
    // LEFT JOIN specializations ON doctors_specializations.specialization_id = specializations.id

    // sql per prendere solo dottori
    // let sql = `
    //   SELECT doctors.*
    //   FROM doctors
    // `;

    let sql = `
    SELECT doctors.*
    FROM doctors
    LEFT JOIN doctors_specializations ON doctors_specializations.doctor_id = doctors.id
    INNER JOIN specializations ON doctors_specializations.specialization_id = specializations.id
`;

    const params = [];
    const conditions = [];

    // Filtri per nome e cognome - MIA
    for (const key in filters) {
        if (filters[key]) {
            if (key === "firstname" || key === "lastname") {
                conditions.push(`doctors.${key} LIKE ?`);
                params.push(`%${filters[key]}%`);
            } else if (key === "specialization") {
                conditions.push(`specializations.id = ?`);
                params.push(parseInt(filters[key]));
            }
        }
    }

    // for (const key in filters) {
    //     if (filters[key]) {
    //         if (key === "firstname" || key === "lastname") {
    //             conditions.push(`doctors.${key} LIKE ?`);
    //             params.push(`%${filters[key]}%`);
    //         };
    //     };
    // };

    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` GROUP BY doctors.id LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    console.log("sql:", sql)
    console.log("params:", params)

    dbConnection.query(sql, params, (err, doctors) => {
        if (err) {
            return next(new Error(err.message))
        }
        if (doctors.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            });
        };

        const allDocId = doctors.map(doc => doc.id);

        // se ci sono dottori ma non hanno specializzazioni
        if (allDocId.length === 0) {
            return res.status(200).json({
                status: "success",
                page,
                limit,
                data: doctors
            });
        };

        // sql abbinando tabella-ponte e tabella specializzazioni per prendere id dottore da tabella-ponte e le specializzazioni
        const specializationsSql = `
            SELECT doctors_specializations.doctor_id, specializations.*
            FROM doctors_specializations
            JOIN specializations ON doctors_specializations.specialization_id = specializations.id
            WHERE doctors_specializations.doctor_id IN (?)
        `;

        dbConnection.query(specializationsSql, [allDocId], (err, specializations) => {
            if (err) {
                return next(new Error(err.message))
            };

            // associare specializzazioni a dottori
            const docWithSpec = doctors.map(doctor => {

                const uniqueSpec = [];

                specializations.forEach(spec => {
                    if (spec.doctor_id === doctor.id) {
                        // controlla se l'id della spec è già presente nell'array
                        if (!uniqueSpec.some(special => special.id === spec.id)) {

                            // pusho i dati che mi servono della singola specializzazione
                            uniqueSpec.push({
                                id: spec.id,
                                specialization: spec.specialization,
                                created_at: spec.created_at,
                                updated_at: spec.updated_at,
                                slug: spec.slug
                            });
                        };
                    };
                });

                return {

                    // tutti i dati del dottore
                    ...doctor,
                    // più  specilizzazioni
                    specializations: uniqueSpec
                };
            });

            return res.status(200).json({
                status: "success",
                page,
                limit,
                data: docWithSpec
            });
        });
    });
};

const show = (req, res, next) => {
    const slug = req.params.slug;

    // Doctor details
    const sql = `
         SELECT doctors.*, 
       CAST(AVG(reviews.vote) AS DECIMAL(10, 1)) AS vote_avg,
       GROUP_CONCAT(DISTINCT specializations.specialization SEPARATOR ', ') AS specialization
FROM doctors
LEFT JOIN reviews ON reviews.doctor_id = doctors.id
LEFT JOIN doctors_specializations ON doctors_specializations.doctor_id = doctors.id
LEFT JOIN specializations ON doctors_specializations.specialization_id = specializations.id
WHERE doctors.slug = ?
GROUP BY doctors.id;`;

    const reviewsSql = `
        SELECT reviews.*
        FROM reviews
        JOIN doctors
        ON reviews.doctor_id = doctors.id
        WHERE doctors.slug = ?
        ORDER BY reviews.created_at DESC;
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

    // Estraggo gli altri dati dal body
    const { firstname, lastname, phone, email, address, city, specializations } = req.body
    const slug = slugify(`${firstname} ${lastname}`, {
        lower: true,
        strict: true,
    }) + `-${uuidv4()}`;



    // assicura che specializations sia un array
    const specializationsArray = Array.isArray(specializations) ? specializations : [specializations];
    console.log(specializationsArray, "specializzation");
    // verifca nome e cognome
    if ((firstname.length && lastname.length) <= 3) {
        return res.status(400).json({
            status: "fail",
            message: "Il firstname e il lastname devono essere piu' lunghi di 3 caratteri"
        })
    }

    // verifica indirizzo
    if (address.length <= 5) {
        return res.status(400).json({
            status: "fail",
            message: "L`indirizzo deve essere piu'lungo di 5 caratteri"
        });
    };

    // ciclo caratteri phone e verifico numero
    for (let char of phone) {
        if (!(char >= "0" && char <= "9") && (char !== ("+" && phone[0]))) {
            return res.status(400).json({
                status: "fail",
                message: "Deve contenere solo numeri e il segno + va messo unicamente davanti al numero"
            });
        };
    };

    // verifica campi vuoti
    for (let key in req.body) {
        if (key.trim().length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Non ci possono essere campi vuoti"
            });
        };
    };

    // Query per inserire i dati nel database
    const sql = `
      INSERT INTO doctors(slug, firstname, lastname, phone, email, address, city, image, resume)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConnection.query(sql, [slug, firstname, lastname, phone, email, address, city, imageName, resumeName], (err, doctors) => {
        if (err) {
            return next(new Error(err.message))
        };

        // aggiungiamo campo specialization
        const sqlNewIdDoctor = `
           select id
           from doctors
           where slug = ?
         `;

        dbConnection.query(sqlNewIdDoctor, [slug], (err, results) => {
            if (err) {
                return next(new Error(err.message))
            };

            // estrazione id dottore
            const doctorId = results[0].id;

            // sql per inserimento tabella ponte
            let sqlTabellaPonte = `
              INSERT INTO doctors_specializations(doctor_id, specialization_id)
              VALUES `;






            const arrayParams = specializations.split(",").map(Number);




            console.log(arrayParams, "array params");

            for (let num in arrayParams) {
                sqlTabellaPonte += `( ? , ? ),`
            }


            sqlTabellaPonte = sqlTabellaPonte.substring(0, sqlTabellaPonte.length - 1)




            const variabileColibri = []
            arrayParams.forEach(curElem => {
                variabileColibri.push(doctorId)
                variabileColibri.push(curElem)
            })






            dbConnection.query(sqlTabellaPonte, variabileColibri, (err, risults) => {
                if (err) {
                    return next(new Error(err.message));
                }
            });
            return res.status(201).json({
                status: "success",
                message: "doctor aggiunto con successo",
                // i file vengono salvati nel database e nei percorsi corretti
                image: imageName,
                resume: resumeName
            });

        });
    });
};

const storereviews = (req, res, next) => {
    const id = req.params.id;
    const { patient, vote, review, email } = req.body;

    // Validation vote
    if (isNaN(vote) || vote < 0 || vote > 5 || vote === "") {
        return res.status(400).json({
            status: "fail",
            message: "Il vote deve essere compreso tra 0 e 5"
        });
    };

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