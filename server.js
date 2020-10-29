const express = require('express');

const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const port = 3000;

app.use(cors());

const mongoose = require("mongoose")
const budgetModel = require("./public/model/budgetModel")

let url = 'mongodb://localhost:27017/myBudget';
let budget = {
    myBudget: []
};

app.get('/budget', (req, res) => {
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database")

            budgetModel.find({})
                .then((data) => {
                    console.log(data)
                    budget.myBudget = data;
                    res.json(budget);
                    mongoose.connection.close()
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })

});


app.post('/addBudget', function (req, res) {
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database")
            console.log(req.body.title, req.body.budget, req.body.color);
            let newData = new budgetModel({
                title: req.body.title,
                budget: req.body.budget,
                color: req.body.color
            });
            budgetModel.insertMany(newData)
                .then((data) => {
                    console.log(data)
                    mongoose.connection.close();
                    res.end("Data Added Successfully");
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                    res.end("Error: " + connectionError._message);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
   

});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});