const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const mlreg = require('ml-regression');
const PORT = process.env.PORT || 3001;

const app = express();

const datasetInfo = [
    {
        id: 0,
        name: "Automobile MPG Dataset",
        type: "Regression",
        entires: 398,
        description: "This dataset contains a list of 398 automobiles as well as some information about each. You will attempt to predict the MPG an automobile recieves."
    },
    {
        id: 1,
        name: "Iris Flower Dataset",
        type: "Classification",
        entires: 150,
        description: "This dataset contains a list of characterists pertaining to 150 individual iris flowers. There are 3 classes of such flowers and you will attempt to predict which class a given flower falls under."
    },
    {
        id: 2,
        name: "Census Income Dataset",
        type: "Classification",
        entires: 48842,
        description: "This dataset contains data from the 1994 US Census pertaining to nearly 49,000 people. Your task is to determine whether or not a given person makes over $50,000 a year."
    }
];

const datasetPaths = [
    '/datasets/auto-mpg/auto-mpg.txt',
    '/datasets/auto-mpg/auto-mpg.txt',
    '/datasets/auto-mpg/auto-mpg.txt'
]

app.use(express.json());
// Routes
app.get('/api/datasets/info/:id', (req, res) => {
    res.json(datasetInfo[req.params.id]);
})

app.get('/api/datasets/:id', (req, res) => {
    csv().fromFile(path.join(__dirname, datasetPaths[req.params.id])).then((jsonObj) => {
        res.json({ data: jsonObj} );
    });
})

app.post('/api/predict', (req, res) => {
    // Create model
    let regressionModel = new mlreg.MultivariateLinearRegression(req.body.train.X, req.body.train.y);
    let preds = []
    req.body.test.X.forEach((row) => {
        preds.push(regressionModel.predict(row));
    })
    res.json({real: req.body.test.y, predictions: preds});
});

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