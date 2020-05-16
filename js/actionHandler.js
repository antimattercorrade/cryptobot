const {actions} = require('./quiz.js')

module.exports.actionHandler = bot => {
    bot.action([/answer[0-3]/,/next/,/quit/], ctx => {
        actions(ctx, ctx.match[0])
    })
    
}