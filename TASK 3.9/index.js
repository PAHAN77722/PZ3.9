const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const currencyController = require("./controllers/currency-controller")
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json())


const start = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/currency', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}

app.post('/api/update-currency', currencyController.updateCurrency)
app.get('/api/get-currency', currencyController.getCurrency)
app.post('/api/convert', currencyController.convert)
app.get('/api/currencies-name', currencyController.getCurrenciesName)

app.get("/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "pages/index.html"))
})


start()