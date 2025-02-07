const dbConnection = require("../data/dbConnection")

const checkEmailExist = (req, res, next) => {

    //prendo la mail dal body
    const email = req.body.email.trim()

    //faccio il param che servirà per la query params
    const params = `%${email}%`

    //costruisco la query
    const sql = `
        SELECT *
        FROM dottori
        WHERE email LIKE ?
        `;

        //faccio la connessione al db
        dbConnection.query(sql, [params], (err, result) => {
            //se c'è errore esco
            if (err){
                return next (new Error (err.message))
            }

            //controllo il risultato, se è maggiore di 0 ossia è presenta la mail nel db do errore
            if (result.length > 0){
                return res.status(409).json({
                    status: "fail",
                    message: "email gia presente"
                })
            } 
            //se il risultato non c'è significa che non c'è un riscontro nel db e quindi possiamo aggiungerla
            else {
                next()
            }
        })
}


module.exports = checkEmailExist