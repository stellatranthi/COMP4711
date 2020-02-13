const express = require("express");
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const util = require('util');
const readFile = util.promisify(fs.readFile);
const filePath = express.static(path.join(__dirname,'data.json'));

app.use(staticPath);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
})