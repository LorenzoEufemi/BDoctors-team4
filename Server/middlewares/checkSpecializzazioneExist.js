const dbConnection = require("../data/dbConnection")

const checkSpecializazioneExist = (req, res, next) => {
    //prendo un array con la lista di tutte le quary
    const listKey = Object.keys(req.query);

    console.log(listKey);

    //     //controllo che nell'array generato ci sia scpecializzazioni
    if (listKey.includes("specializzazione")) {

        const specializzazione = `%${req.query.specializzazione}%`;

        const sql = `
           SELECT *
           FROM specializzazioni
           WHERE specializzazione LIKE ?
        `;

        dbConnection.query(sql, [specializzazione], (err, result) => {

            //se non c'è do errore
            if (err) {
                return next(new Error(err.message))
            }
            next();
        });
    };
};

module.exports = checkSpecializazioneExist;