const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getTransactions, getBalance } = require('./controllers/etherscan.controller')
const { savePeriodicPrice } = require('./controllers/cryptoPrice.controller')

const app = express()
const port = 3000


// -----------------------------------------------------


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())


// -----------------------------------------------------


app.get('/status', (req, res) => {
    res.send("Node server is running.")
})

app.post('/get-transaction-data', getTransactions)
app.post('/get-balance', getBalance)
app.get('/save-price', savePeriodicPrice)


// -----------------------------------------------------


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})