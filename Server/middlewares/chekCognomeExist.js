const dbConnection = require("../data/dbConnection")

const checklastnameExist = (req, res, next) => {

    //prendo un array con la lista di tutte le quary
    const listKey = Object.keys(req.query);

    //controllo che nell'array generato ci sia lastname
    if (listKey.includes("lastname")) {

        //se nome c'è genero la stringa da inserire come parametro nella quary
        const lastname = `%${req.query.lastname}%`;

        //genero la quary che mi restituisce il dottore con il nome
        const sql = `
          SELECT *
          FROM doctors
          WHERE lastname LIKE ?
        `;

        //controllo nel db se c'è il dottore con il lastname scelto dall'utente 
        dbConnection.query(sql, [lastname], (err, result) => {

            //se non c'è do errore
            if (err) {
                return next(new Error(err.message))
            }
            //se c'è va tutto bene e si puo proseguire
            next();
        });
    };
    next();
};

module.exports = checklastnameExist;