const currencyService = require("../service/currency-service")

class CurrencyController {
    async updateCurrency(req, res, next) {
        try {
            const result = await currencyService.updateCurrency()
            res.send(result)
        } catch (e) {
            res.status(500).send({message: e.message})
        }
    }

    async getCurrency(req, res, next) {
        try {
            const currencies = await currencyService.getCurrency()
            res.send(currencies)
        } catch (e) {
            res.status(500).send({message: e.message})
        }
    }

    async convert(req, res, next) {
        try {
            const {from, to, value} = req.body
            console.log(req.body)
            const result = await currencyService.convert(from, to, value)
            res.send({result})
        } catch (e) {
            res.status(500).send({message: e.message})
        }
    }

    async getCurrenciesName(req, res, next) {
        try {
            const currenciesName = await currencyService.getCurrenciesName()
            res.send(currenciesName)
        } catch (e) {
            res.status(500).send({message: e.message})
        }
    }
}

module.exports = new CurrencyController()