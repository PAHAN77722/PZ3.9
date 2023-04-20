const request = require("request");
const CurrencyModel = require("../models/currency-model");
const schedule = require("node-schedule");

class CurrencyService {
    async updateCurrency() {
        console.log()
        return new Promise((resolve, reject) => {
            request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let currencies = JSON.parse(body);
                    let promises = currencies.map(currency => {
                        return CurrencyModel.findOneAndUpdate(
                            {base_ccy: currency.base_ccy, ccy: currency.ccy},
                            {buy: currency.buy, sale: currency.sale},
                            {upsert: true, new: true}
                        ).exec();
                    });
                    Promise.all(promises)
                        .then(updatedCurrencies => {
                            console.log(updatedCurrencies);
                            resolve(currencies);
                        })
                        .catch(err => reject(err));
                } else {
                    reject(new Error(error));
                }
            });
        });
    }

    async getCurrency() {
        const currencies = await CurrencyModel.find({})
        return currencies
    }

    async convert(from, to, value) {
        if(from === to) {
            return value
        }

        if(from === "UAH") {
            const currency = await CurrencyModel.findOne({ccy: to})
            return (value / currency.sale).toFixed(2);
        }

        if(to === "UAH") {
            const currency = await CurrencyModel.findOne({ccy: from})
            return (value * currency.buy).toFixed(2)
        }

        const currencyTo = await CurrencyModel.findOne({ccy: to})
        const currencyFrom = await CurrencyModel.findOne({ccy: from})

        return  ((currencyFrom.buy * value) / currencyTo.sale).toFixed(2)
    }

    async updateCurrencyJob() {
        schedule.scheduleJob("* * * * *", this.updateCurrency)
    }

    async getCurrenciesName() {
            const currencies = await CurrencyModel.find().select('ccy').exec();
            currencies.push({_id: 0, ccy: "UAH"})
            return currencies.sort();
    }

    constructor() {
        this.updateCurrencyJob()
    }
}

module.exports = new CurrencyService()