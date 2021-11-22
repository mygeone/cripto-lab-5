const express = require("express");
const app = express();

app.use(express.json());


app.post('/data', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(ip);
    res.status(200).send();
})
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});