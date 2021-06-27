const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const PORT = process.env.PORT || 3001;

const app = express();

const datasetInfo = [
    {
        id: 0,
        name: "Automobile MPG Data",
        type: "Regression",
        entires: 398,
        description: "This dataset contains a list of 398 automobiles as well as some information about each. You will attempt to predict the MPG an automobile recieves."
    },
    {
        id: 1,
        name: "Automobile MPG Data",
        type: "Regression",
        entires: 398,
        description: "This dataset contains a list of 398 automobiles as well as some information about each. You will attempt to predict the MPG an automobile recieves."
    },
    {
        id: 2,
        name: "Automobile MPG Data",
        type: "Regression",
        entires: 398,
        description: "This dataset contains a list of 398 automobiles as well as some information about each. You will attempt to predict the MPG an automobile recieves."
    }
];

const datasetPaths = [
    '/datasets/auto-mpg/auto-mpg.txt',
    '/datasets/auto-mpg/auto-mpg.txt',
    '/datasets/auto-mpg/auto-mpg.txt'
]

// Routes
app.get('/api/datasets/info/:id', (req, res) => {
    res.json(datasetInfo[req.params.id]);
})

app.get('/api/datasets/:id', (req, res) => {
    csv().fromFile(path.join(__dirname, datasetPaths[req.params.id])).then((jsonObj) => {
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