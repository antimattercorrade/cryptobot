const {getdata} = require('./getData.js')

const {numRounding} = require('./numRounding.js')

const {emoji} =require('./emoji.js')

module.exports.inlineHandler = bot => {
    bot.on('inline_query', async ctx => {
        let msg = ctx.inlineQuery.query
        console.log(msg)

        ctx.answerInlineQuery(await resultconstructor(ctx))
    })
}

const resultconstructor = async ctx => {

    let data = await getdata()
    let result
        let msg = ctx.inlineQuery.query
        let name = msg.charAt(0).toUpperCase() +msg.slice(1)
        let symbol = msg.toUpperCase()
        let slug = msg.toLowerCase()
        
        let queryFound = false,queryCoin;
        //ctx.reply(data.data[0].name)

        data.data.forEach(element =>{
            if(element.name == name || element.symbol == symbol || element.slug == slug) {
                queryFound=true
                queryCoin = element
            }})
            
            if (!queryFound){
                result = [
                    {
                        type : 'article',
                        id : Math.random().toString(),
                        title: `Try again..`,
                        description: `Data not found. Enter cryptocurreny name.`,
                        input_message_content: {
                            message_text: 'Data not found',
                            
                        }
                    }
                ]
            } else {
                let logo = "https://s2.coinmarketcap.com/static/img/coins/64x64/"+queryCoin.id+".png"
                result = [
                    {
                        type: 'article',
                        id : Math.random().toString(),
                        title: `${queryCoin.name} (${queryCoin.symbol})`,
                        description: `Data with logo for ${queryCoin.name}`,
                        thumb_url: `${logo}`,
                        input_message_content: {
                            message_text: onSuccess(queryCoin),
                            parse_mode: 'HTML'
                        }
                    },
            
                    {
                        type: 'article',
                        id : Math.random().toString(),
                        title: `${queryCoin.name} (${queryCoin.symbol})`,
                        description: `Data without logo for ${queryCoin.name}`,
                        thumb_url: `${logo}`,
                        input_message_content: {
                            message_text: onSuccess(queryCoin,false),
                            parse_mode: 'HTML'
                        }
                    }
            
                ]
            }
            
            return result
    
}


const onSuccess = (element,addLogo=true) => {
    let logo = "https://s2.coinmarketcap.com/static/img/coins/64x64/"+element.id+".png"
    let price = numRounding(element.quote.USD.price)
    let change24 = numRounding(element.quote.USD.percent_change_24h)
    let marketcap = numRounding(element.quote.USD.market_cap)
    let val = `<b>${element.name} (${element.symbol})</b>
Price: <b>${price}</b>
Change 24h: <b>${change24}</b>${emoji(change24)}
Market Cap: <b>${marketcap}</b>
${ addLogo ? `<a href= "${logo}">&#160;</a>` : '' } `
    return val
}