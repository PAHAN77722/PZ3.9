const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
    base_ccy: {
        type: String,
        required: true
    },
    ccy: {
        type: String,
        required: true
    },
    buy: {
        type: String,
        required: true
    },
    sale: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Currency', CurrencySchema);
