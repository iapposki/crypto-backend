const {PrismaClient} = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const {ethereumPriceAPIAddress} = require('../config')


const getEthereumPrice = async () => {
    const data = await axios.get(ethereumPriceAPIAddress)
    // console.log(data.data.ethereum.inr)
    return data.data.ethereum
}



module.exports = {
    getEthereumPrice,
};