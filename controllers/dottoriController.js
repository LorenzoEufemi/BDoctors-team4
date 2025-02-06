const dbConnection = require ("../data/dbConnection");
const slugify = require ("slugify");

const index = (req, res, next) => {
    const filters = req.query;
    let sql = `
    SELECT *
    FROM dottori
    `;
    const params = [];
    dbConnection.query(sql, params, (err, dottori) => {
        if (err){
            return next(new Error(err.message))
        }
        return res.status(200).json({
            status: "success",
            data: dottori
        })

    });


};

const show = (req, res, next) => {

    
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