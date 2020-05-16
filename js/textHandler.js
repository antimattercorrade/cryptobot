const {getdata} = require('./getData.js')

const {numRounding} = require('./numRounding.js')

const {emoji} =require('./emoji.js')

module.exports.textHandler = bot => {
    bot.on('text',async ctx => {
        let data = await getdata()

        let msg = ctx.message.text
        let name = msg.charAt(0).toUpperCase() +msg.slice(1)
        let symbol = msg.toUpperCase()
        let slug = msg.toLowerCase()
        let queryFound = false

        data.data.forEach(element =>{
            if(element.name == name || element.symbol == symbol || element.slug == slug) {
                queryFound=true
                ctx.replyWithHTML(onSuccess(element))
            }})
            if(!queryFound){
                ctx.reply("Can't Find Data\nSee /help")
            }
    })
    
}



const onSuccess = element => {
    let logo = "https://s2.coinmarketcap.com/static/img/coins/64x64/"+element.id+".png"
    let price = numRounding(element.quote.USD.price)
    let change24 = numRounding(element.quote.USD.percent_change_24h)
    let marketcap = numRounding(element.quote.USD.market_cap)
    let val = `<b>${element.name} (${element.symbol})</b>
Price: <b>${price}</b>
Change 24h: <b>${change24}</b>${emoji(change24)}
Market Cap: <b>${marketcap}</b>
<a href="${logo}">&#160;</a>`
    return val
}