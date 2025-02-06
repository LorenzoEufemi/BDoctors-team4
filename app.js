const express = require("express");
const dottoriRouter = require("./routers/dottoriRouter");
const specializzazioniRouter = require("./routers/specializzazioniRouter")
const cors = require("cors");
const notFound = require("./middlewares/NotFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();
const port = process.env.SERVER_PORT;

// Middleware Cors
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

// Static Files Middlewarenp
app.use(express.static("public"));

// Json Middleware
app.use(express.json());

// Router Doctor
app.use("/dottori", dottoriRouter);

// Router Specializzazioni
app.use("/specializzazioni", specializzazioniRouter)

// Error Handler middleware
app.use(errorsHandler);

// Not Found Middleware
app.use(notFound);

// Server
app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});