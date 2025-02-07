const checkNomeValido = (req, res, next) => {
    const nomeMedico = req.body.nome;

    if (nomeMedico.trim().length <= 3){
        return res.status(400).json({
            status: "fail",
            message: "il nome dev'essere di piu di 3 caratteri"
        })
    }
    next();
};

module.exports = checkNomeValido;