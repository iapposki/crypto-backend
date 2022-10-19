const {PrismaClient} = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const {ethereumPriceAPIAddress} = require('../config')


const getEthereumPrice = async (date="") => {
    if (!date) {
        const data = await axios.get(ethereumPriceAPIAddress)
        var res = data.data.ethereum
    } else {
        var url = "https://api.coingecko.com/api/v3/coins/ethereum/history?date=" + date
        const data = await axios.get(url)
        // console.log(data.data.market_data.current_price.inr 109990.49458930426 109990.49458930426  20-09-2022)
        var res = data.data.market_data.current_price
        console.log(res)
    }
    
    // console.log(data.data.ethereum.inr)
    return res
}



module.exports = {
    getEthereumPrice,
};