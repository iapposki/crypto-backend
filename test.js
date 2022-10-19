const axios = require('axios');


const func = async () => {
    var url = "https://api.coingecko.com/api/v3/coins/ethereum/history?date=20-09-2022"
    const data = await axios.get(url)
    console.log(data.data.market_data.current_price.inr)
} 

func()