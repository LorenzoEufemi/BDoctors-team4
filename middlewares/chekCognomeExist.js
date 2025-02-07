const dbConnection = require("../data/dbConnection")

const checkCognomeExist = (req, res, next) => {
    //prendo un array con la lista di tutte le quary
    const listKey = Object.keys(req.query)


     //controllo che nell'array generato ci sia cognome
    if(listKey.includes("cognomi")) {

                //se nome c'è genero la stringa da inserire come parametro nella quary

        const cognome = `%${req.query.cognome}%`



      //genero la quary che mi restituisce il dottore con il nome

        const sql = `
        SELECT *
        FROM dottori
        WHERE cognome LIKE ?
        `;

                //controllo nel db se c'è il dottore con il cognome scelto dall'utente 
        
        dbConnection.query(sql, [cognome], (err, result) => {

             //se non c'è do errore
            if (err) {
                return next (new Error (err.message))
            }
            //se c'è va tutto bene e si puo proseguire
            next()
        })

    }


    next()
}

module.exports = checkCognomeExist