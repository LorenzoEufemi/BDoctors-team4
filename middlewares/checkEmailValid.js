const checkEmailValid = (req, res, next) => {

    //prendo la mail togliendo gli spazzi
    const email = req.body.email.trim()

    //faccio una variabile di appoggio 
    let count = 0

    //controllo che la mail sia almeno di 5 caratteri
    if(email.length !== 0 && email.length > 5){

        //ciclo tutte le lettere dalla email e segno ogni volta che c'è una @
        for (let char of email) {
            if (char === "@"){
                count += count
            }
        }
        // se alla fine del conteggio c'è solo una @ va tutto bene e si va avanti
        if (count === 1){
            next()
        } 
        //se c'è piu di una @ c'è un errore e blocco tutto
        else {
            return res.status(400).json({
                status: "fail",
                message: "l'email inserita non va bene!"
            })
        }
    }
}


module.exports = checkEmailValid