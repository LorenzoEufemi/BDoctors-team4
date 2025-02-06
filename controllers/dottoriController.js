const dbConnection = require("../data/dbConnection");
const slugify = require("slugify");

const index = (req, res, next) => {
    const filters = req.query;
    let sql = `
    SELECT *
    FROM dottori
    `;
    const params = [];
    dbConnection.query(sql, params, (err, dottori) => {
        if (err) {
            return next(new Error(err.message))
        }
        return res.status(200).json({
            status: "success",
            data: dottori
        })

    });


};

const show = (req, res, next) => {
    const slug = req.params.slug;

    //dettaglio dottore
    const sql = `
 SELECT *, CAST(AVG(recensioni.voto) AS DECIMAL(10, 1)) as voto_avg
 FROM dottori
 WHERE slug = ?
 `

    const recensioniSql = `
SELECT recensioni.* 
FROM recensioni
JOIN dottori
ON dottori.id = recensioni.dottore_id
WHERE dottori.slug = ?
`

    dbConnection.query(sql, [slug], (err, dottore) => {
        if (err) {
            return next(new Error(err.message))
        }

        if (dottore.length === 0 || dottore[0].slug === null) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            })
        }

        dbConnection.query(recensioniSql, [slug], (err, reviews) => {

            return res.status(200).json({
                status: "success",
                data: {
                    ...dottore[0],
                    reviews
                }
            })
        })

    })
};






const store = (req, res, next) => {


};
const destroy = (req, res, next) => {


};

module.exports = {
    index,
    show,
    store,
    destroy
}