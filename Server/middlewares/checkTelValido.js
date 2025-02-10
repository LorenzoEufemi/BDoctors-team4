const checkTelValido = (req, res, next) => {

    const telefono = req.body.telefono.trim();

    if (telefono.length !== 10) {
        return res.status(400).json({
            status: "fail",
            message: "la lunghezza del numero non è corretta"
        })
    } else {

        //ciclo caratteri telefono
        for (let char of telefono) {
            if (!(char >= "0" && char <= "9") && (char !== ("+" && telefono[0]))) {
                return res.status(400).json({
                    status: "fail",
                    message: "Deve contenere solo numeri e il segno + va messo unicamente davanti al numero"
                })
            };
        };
    };
    next();
};

module.exports = checkTelValido;