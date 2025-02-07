const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, callbackFn) => {
        //da stabilire percorso cartella imagini
        callbackFn(null, "public/images");
    },
    filename: (req, file, callbackFn) => {
        //estrazione nome originale del file
        const orignalFileName = file.originalname;
        //aggiungo timestamp davanti al nome originale per renderlo univoco
        const uniqueName = `${Date.now()}-${orignalFileName}`;
        //imposto nome finale file
        callbackFn(null, uniqueName);
    },
});

//creo istanza multer - passo opzione salvataggio
const upload = multer({storage})

module.exports = upload;