const {getEthereumPrice} = require('../services/ethereum.service')
const cron = require('node-cron');
const { saveCryptoPrice } = require('../services/crypto.service');


const savePeriodicPrice = async (req, res) => {
    var priceNow = await getEthereumPrice();
    cron.schedule('*/10 * * * *', async () => {
        var ethereumPrice = await getEthereumPrice();
        await saveCryptoPrice("ethereum", ethereumPrice)
      });
    res.status(200).json({status: "success", message : "Current price is : " + priceNow.inr + ". Saving price of ethereum in db every 10 minutes"})
}

module.exports = {
    savePeriodicPrice,
}