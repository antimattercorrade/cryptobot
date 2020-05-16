const Telegraf = require('telegraf')
 
const {getdata} = require('./js/getData.js')

const {textHandler} = require('./js/textHandler.js')

const {commandHandler} = require('./js/commandHandler.js')

const {inlineHandler} =require('./js/inlineHandler')

const session = require('telegraf/session')

const {actionHandler} =require('./js/actionHandler.js')

require('dotenv').config()

const token= process.env.BOT_TOKEN

const bot = new Telegraf(token)

bot.use(session())
// bot.on('text', ctx => {
//     ctx.session.counter = ctx.session.counter || 0
//     ctx.session.counter++
//     return ctx.reply(`Message counter : ${ctx.session.counter}`)
// })


inlineHandler(bot)

commandHandler(bot)

textHandler(bot)

actionHandler(bot)

bot.launch()

//https://api.telegram.org/bot1233986680:AAEmYgyuO3YjJbR9uuFejH53J1BjxCWFx3Q/getUpdates