const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const saveCryptoPrice = async (currency, priceData) => {
    try {
        var temp = await prisma.cryptoData.findUnique({
            where : {
                cryptoCurrency : currency
            }
        })
    } catch (error) {
        console.log(error)
    }
    if (!temp){
        try{
            await prisma.cryptoData.create({
                data :{
                    cryptoCurrency : currency,
                    priceHistory : [parseFloat(priceData.inr)]
                }
            }) 
            // console.log("okay1")
        } catch (error) {
            console.log(error)
        }
    } else {
        await prisma.cryptoData.update({
            where : {
                cryptoCurrency : currency
            }, 
            data : {
                priceHistory : [...temp.priceHistory,  priceData.inr]
            }
        })
        // console.log("okay2")

    }
}

module.exports = {
    saveCryptoPrice,
}