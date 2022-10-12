const process = require('process');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    transactionAPIAddress : process.env["TRANSACTION_API_ADDRESS"],
    ehterscanAPIKey : process.env["ETHERSCAN_API_KEY"],
    ethereumPriceAPIAddress : process.env["EHTEREUM_PRICE_API_ADDRESS"]
}

module.exports = config;