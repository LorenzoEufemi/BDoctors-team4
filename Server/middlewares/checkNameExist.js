const dbConnection = require("../data/dbConnection")

const checkfisrtnameExist = (req, res, next) => {

    //prendo un array con la lista di tutte le quary
    const listKey = Object.keys(req.query);

    //controllo che nell'array generato ci sia nome
    if (listKey.includes("fisrtname")) {

        //se nome c'è genero la stringa da inserire come parametro nella quary
        const name = `%${req.query.fisrtname}%`;

        //genero la quary che mi restituisce il dottore con il fisrtname
        const sql = `
          SELECT *
          FROM doctors
          WHERE nome LIKE ?
        `;

        //controllo nel db se c'è il dottore con il nome scelto dall'utente 
        dbConnection.query(sql, [fisrtname], (err, result) => {

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

module.exports = checkfisrtnameExist;