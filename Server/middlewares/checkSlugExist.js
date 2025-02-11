const dbConnection = require("../data/dbConnection")

const checkSlugExist = (req, res, next) => {

    const slug = req.params.slug;

    const sql = `
      SELECT *
      FROM doctors
      WHERE slug = ?
    `
    dbConnection.query(sql, [slug], (err, respons) => {
        if (err) {
            return next(new Error(err.message))
        }
        next();
    });
};

module.exports = checkSlugExist;