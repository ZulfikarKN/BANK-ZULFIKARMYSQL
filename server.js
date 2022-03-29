const express = require("express");
const cors = require("cors");
const app = express();
var nasabahRouter = require("./app/routes/Nasabah.routes.js");

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome"})
});

app.use('/nasabah', nasabahRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})