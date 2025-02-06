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



module.exports = {
    index,
}