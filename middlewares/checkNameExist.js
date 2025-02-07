const dbConnection = require("../data/dbConnection")

const checkNameExist = (req, res, next) => {
    console.log("sono qui");
    // console.log(Object.keys(req.query));
    const listKey = Object.keys(req.query)
    console.log(listKey);

    if(listKey.includes("nome")){
        console.log("sono nel nome");
        const nome = `%${req.query.nome}%`
        console.log(nome);
        

        let sql = `
        SELECT *
        FROM dottori
        WHERE nome LIKE ?
        `;

        dbConnection.query(sql, [nome], (err, result) => {
            if(err) {
                return next (new Error (err.message))
            }
            next()
        })
    }
}

module.exports = checkNameExist;