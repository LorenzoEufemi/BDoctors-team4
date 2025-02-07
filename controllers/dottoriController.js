const dbConnection = require("../data/dbConnection");
const slugify = require("slugify");

const index = (req, res, next) => {
    const filters = req.query;
    // console.log(filters);
    
    let sql = `
    SELECT dottori.*, GROUP_CONCAT(specializzazioni.specializzazione) AS specializzazioni
    FROM dottori
    LEFT JOIN dottore_specializzazioni ON dottore_specializzazioni.dottore_id = dottori.id
    LEFT JOIN specializzazioni ON dottore_specializzazioni.specializzazione_id = specializzazioni.id
  `;

    const params = [];
    const conditions = [];

    for (const key in filters) {
        if (filters[key]) {
            if (key === "nome" || key === "cognome") {
                conditions.push(`dottori.${key} LIKE ?`);
                params.push(`%${filters[key]}%`);
            } else if (key === "specializzazione") {
                conditions.push("specializzazioni.specializzazione LIKE ?");
                params.push(`%${filters[key]}%`);
            }
        }
    };
    
    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
    }
    
    sql += ` GROUP BY dottori.id`;

    dbConnection.query(sql, params, (err, results) => {
        if (err) {
            return next(new Error(err.message))
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Dottore non trovato"
            })
        }
        return res.status(200).json({
            status: "success",
            data: results   
        })
    });
};

const show = (req, res, next) => {
    const slug = req.params.slug;

    //dettaglio dottoreLorenzo Eufemi
    const sql = `
        SELECT dottori.*, CAST(AVG(recensioni.voto) AS DECIMAL(10, 1)) AS vote_avg
        FROM dottori
        JOIN recensioni
        ON recensioni.dottore_id = dottori.id
        WHERE dottori.slug = ?`;
    
    const recensioniSql =  `
        SELECT recensioni.*
        FROM recensioni
        JOIN dottori
        ON recensioni.dottore_id = dottori.id
        WHERE dottori.slug = ?
    `;
    
    dbConnection.query(sql, [slug], (err, dottore) => {
        if (err) {
            return next(new Error(err.message))
        }
        if (dottore.length === 0 || dottore[0].slug === null) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            })
        };

        dbConnection.query(recensioniSql, [slug], (err, reviews) => {
            return res.status(200).json({
                status: "success",
                data: {
                    ...dottore[0],
                    reviews
                }
            });
        });
    });
};

const store = (req, res, next) => {

};

const storeRecensioni = (req, res, next) => {
    const id = req.params.id;
    const {paziente, voto, recensione} = req.body;

    // Validation voto
    if (isNaN(voto) || voto < 0 || voto > 5) {
        return res.statu(400).json({
            status: "fail",
            message: "Il voto deve essere compreso tra 0 e 5"
        });
    }
    
    // Validation paziente
    if (paziente.lenght <= 3) {
        return res.status(400).json({
            status: "fail",
            message: "Nome e Cognome incompleto, almeno 4 caratteri"
        });
    }

    // Validation recensione
    if (recensione && recensione.lenght > 0 && recensione.lenght < 5) {
        return res.statu(400).json({
            status: "fail",
            message: "La recensione deve essere più lunga"
        });
    }

    const dottoriSql = `
      SELECT *
      FROM dottori
      WHERE id = ?
    `
    dbConnection.query(dottoriSql, [id], (err, results) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Dottore non trovato"
            });
        }

        const sql = `
        INSERT INTO recensioni(dottore_id, paziente, recensione, voto)
        VALUE (?, ?, ?, ?)
        `;

        dbConnection.query(sql, [id, paziente, recensione, voto], (err) => {
            if (err) {
                return next(new Error("Errore interno del server"));
            }
            res.statu(201).json({
                status: "success",
                message: "Recensione aggiunta"
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
    storeRecensioni,
    destroy
};