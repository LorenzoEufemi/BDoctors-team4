const multer = require("multer");
const path = require("path");

// Configura lo storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, "public/images/"); // Salva le immagini in "images/images"
        } else {
            cb(null, "public/resume/"); // Salva qualsiasi altro file in "uploads/files"
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Configura Multer senza limiti di peso e senza restrizioni sul formato
const upload = multer({ storage });

module.exports = upload;