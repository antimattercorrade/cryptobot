const {getdata} = require('./getData.js')

const {numRounding} = require('./numRounding.js')

const {emoji} = require('./emoji.js')

const {quiz} =require('./quiz.js')

module.exports.commandHandler = bot => {
    bot.start(ctx => ctx.reply(`Hello, ${ctx.from.first_name} !
For more info see /help.`))

bot.help(ctx => ctx.reply(`Welcome to CryptoBot 
Search for top cryptocurrencies using their name and symbols. 
e.g. Try sending 'BTC'.
Other commands: 
/start: Get a hello message from the bot.
/top5: Get the details about the top 5 cryptocurrencies.
/quiz: Guess the cryptocurrency from their logo.`))

bot.command("top5", async ctx => {
    await commandTop5(ctx)
})

bot.command("quiz", async ctx => {
    await quiz(ctx)
})

}

const commandTop5 = async ctx => {
    let data = await getdata()
    data = data.data.slice(0,5)
    let replyMsg= ""
    data.forEach((element, index) => {
        let price = numRounding(element.quote.USD.price)
        let change24 = numRounding(element.quote.USD.percent_change_24h)
    
        replyMsg = replyMsg +`${index + 1} _${element.name}_ : *${price}$* _Change 24h_ : *${change24}%*${emoji(change24)}
    `
    })

    ctx.replyWithMarkdown(replyMsg)
}

