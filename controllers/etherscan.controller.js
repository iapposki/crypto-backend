const { getEthereumPrice } = require('../services/ethereum.service');
const {getTransactionData} = require('../services/etherscan.service')

const getTransactions = async (req, res) => {
    const {address, shouldSave} = req.body;
    const transactionData = await getTransactionData(address, shouldSave)
    res.status(200).json({status: "success", msg : transactionData})
}

const getBalance = async (req, res) => {
    const {address, shouldSave} = req.body;
    const transactionData = await getTransactionData(address, shouldSave)
    var plus = 0.0;
    var minus = 0.0;
    transactionData.result.forEach(element => {
        if (element.to === address){
            plus = plus + parseFloat(element.value)
        } else if (element.from === address ) {
            minus = minus + parseFloat(element.value)
        } else {
            console.log(address, element.to, element.from)
        }
    });
    const ethereumPrice = await getEthereumPrice()
    res.status(200).json({status: "success", msg: `Balance for user with address ${address} is : ${plus-minus}. Current ethereum price is : ${ethereumPrice.inr}`})
}

module.exports = {
    getTransactions,
    getBalance,
}