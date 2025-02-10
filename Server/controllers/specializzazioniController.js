const dbConnection = require("../data/dbConnection");

const index = (req, res, next) => {
    const sql = `
    SELECT *
    FROM specializzazioni
    `;
    const params = [];
    dbConnection.query(sql, params, (err, specializzazioni) => {
        if (err) {
            return next(new Error(err.message))
        }
        return res.status(200).json({
            status: "success",
            data: specializzazioni
        })
    });
};

const show = (req, res, next) => {
    const id = req.params.id

    const sql = `
    SELECT dottori.*
    FROM dottori 
    JOIN dottore_specializzazioni 
    ON dottori.id = dottore_specializzazioni.dottore_id
    JOIN specializzazioni 
    ON dottore_specializzazioni.specializzazione_id = specializzazioni.id
    WHERE specializzazioni.id = ?
    `;
    
    dbConnection.query(sql, [id], (err, dottoriSpecializzati) => {
        if (err) {
            return next(new Error(err.message))
        };
        if (dottoriSpecializzati.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Dottori non trovati"
            })
        };
        return res.status(200).json({
            status: "success",
            data: dottoriSpecializzati
        });
    });
};

module.exports = {
    index,
    show
};