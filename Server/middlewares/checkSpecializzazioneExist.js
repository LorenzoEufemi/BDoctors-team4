const dbConnection = require("../data/dbConnection")

const checkSpecializazioneExist = (req, res, next) => {
    //prendo un array con la lista di tutte le quary
    const listKey = Object.keys(req.query);

    console.log(listKey);

    //     //controllo che nell'array generato ci sia scpecializzazioni
    if (listKey.includes("specialization")) {

        const specialization = `%${req.query.specialization}%`;

        const sql = `
           SELECT *
           FROM specializations
           WHERE specialization LIKE ?
        `;

        dbConnection.query(sql, [specialization], (err, result) => {

            //se non c'è do errore
            if (err) {
                return next(new Error(err.message))
            }
            next();
        });
    };
};

module.exports = checkSpecializazioneExist;