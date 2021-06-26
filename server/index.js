const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const PORT = process.env.PORT || 3001;

const app = express();

// Routes

app.get('/api/datasets/regression', (req, res) => {
    csv().fromFile(path.join(__dirname, '/datasets/auto-mpg/auto-mpg.txt')).then((jsonObj) => {
        res.json({ data: jsonObj} );
    });
})

app.get("/api", (req, res) => {
    fs.readFile(path.join(__dirname, '/datasets/auto-mpg/auto-mpg.names'), 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(data);
        res.json({ data: data });
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})