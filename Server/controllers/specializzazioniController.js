const dbConnection = require("../data/dbConnection");

const index = (req, res, next) => {
    const sql = `
    SELECT *
    FROM specializations
    `;
    const params = [];
    dbConnection.query(sql, params, (err, specializations) => {
        if (err) {
            return next(new Error(err.message))
        }
        return res.status(200).json({
            status: "success",
            data: specializations
        })
    });
};

const show = (req, res, next) => {
    const id = req.params.id

    const sql = `
    SELECT doctors.*
    FROM doctors 
    JOIN doctors_specializations 
    ON doctors.id = doctors_specializations.doctor_id
    JOIN specializations 
    ON doctors_specializations.specialization_id = specializations.id
    WHERE specializations.id = ?
    `;
    
    dbConnection.query(sql, [id], (err, specializedDoctors) => {
        if (err) {
            return next(new Error(err.message))
        };
        if (specializedDoctors.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Doctors not found"
            })
        };
        return res.status(200).json({
            status: "success",
            data: specializedDoctors
        });
    });
};

module.exports = {
    index,
    show
};