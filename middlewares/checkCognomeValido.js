const checkCognomeValido = (req, res, next) => {
    const cognomeMedico = req.body.cognome;

    if (cognomeMedico.trim().length <= 3){
        return res.status(400).json({
            status: "fail",
            message: "il cognome dev'essere di piu di 3 caratteri"
        })
        
    }
    next()
}

module.exports = checkCognomeValido