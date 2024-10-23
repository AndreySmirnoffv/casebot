import {RestClientV5} from 'bybit-api'
import logger from '../../../assets/logger/logger'

const client = new RestClientV5({
    key: "5O6WkQyGE0Ow6Ur8SJ",
    secret: "",
    testnet: true
})

client.getMarkPriceKline({
    category: "linear",
    symbol: "BTCUSDT",
    interval: "15"
}).then(response => {
    console.log(response)
}).catch(error => logger.error(error))