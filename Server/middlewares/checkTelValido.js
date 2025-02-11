const checkTelValido = (req, res, next) => {

    const phone = req.body.phone.trim();

    if (phone.length !== 10) {
        return res.status(400).json({
            status: "fail",
            message: "la lunghezza del numero non è corretta"
        })
    } else {

        //ciclo caratteri phone
        for (let char of phone) {
            if (!(char >= "0" && char <= "9") && (char !== ("+" && phone[0]))) {
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