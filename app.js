const express = require("express");

const app = express();
const port = process.env.SERVER_PORT;


app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});