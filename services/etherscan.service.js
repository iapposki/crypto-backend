const {PrismaClient} = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const {transactionAPIAddress,ehterscanAPIKey} = require('../config');
const { getEthereumPrice } = require('./ethereum.service');

const getTransactionData = async (address, shouldSave) => {
    const fetchURL = transactionAPIAddress + `?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ehterscanAPIKey}`

    const data = await axios.get(fetchURL)

    if (shouldSave){

        const task = async () =>{
            for (var i = 0; i < data.data.result.length; i++){
                var ele = data.data.result[i]
                var temp = await prisma.transaction.findUnique({
                    where : {
                        hash : ele.hash
                    }
                })
                if (!temp){
                    var timeStamp = new Date(Number(ele.timeStamp)*1000)
                    var date = String(timeStamp.getDate())+ "-" + String(timeStamp.getMonth()) + "-" + String(timeStamp.getFullYear())
                    const conversionRate = await getEthereumPrice(date=date)
                    console.log("Transaction saved with hash : ", ele.hash)
                    await prisma.transaction.create({data : {...ele, conversionRate: String(conversionRate.inr) }})
                }
            }
        }

        task()
    }

    // console.log(data.data)
    return data.data
}

getTransactionData("0xce94e5621a5f7068253c42558c147480f38b5e0d")
module.exports = {
    getTransactionData,
}