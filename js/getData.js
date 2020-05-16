/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');

const requestOptions = () => {
    return {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '500',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.API_KEY
  },
  json: true,
  gzip: true
}
};


module.exports.getdata = async () => {
    try{
        return await rp(requestOptions())
    }catch(err){
        console.log('API call error: ',err.message)
    }
}

