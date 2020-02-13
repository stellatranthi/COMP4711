const express = require("express");
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const util = require('util');
const readFile = util.promisify(fs.readFile);
const staticPath = express.static(path.join(__dirname,'public'));

app.use(staticPath);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get("/artists", (req, res) => {
    readFile("data.json")
    .then(rawData => {
        res.send(rawData);
    })
})

app.post('/add', (req, res) => {
    readFile("data.json", "utf8")
    .then(rawData => {
        var artists = JSON.parse(rawData);
        var artistId = new Date().getTime();
        artists[artistId] = req.body;   
        fs.writeFile("data.json", JSON.stringify(artists), () => {});
        console.log(JSON.stringify(artists))
        res.json(artists[artistId])
    })
    .catch(e => console.log(e))
})

app.post('/delete', (req, res) => {
    readFile("data.json")
    .then(rawData => {
        var artists = JSON.parse(rawData);
        delete artists[req.body.id];
        fs.writeFile("data.json", JSON.stringify(artists), () => {});
        res.status(204).end();
    })
    .catch(e => console.log(e))
})

app.listen(8000, () => console.log('Server started at port 8000'));