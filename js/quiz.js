const Extra = require('telegraf/extra')

const fs = require('fs')

module.exports.quiz = async ctx => {

    if(ctx.message.chat.type != 'private') {
        ctx.reply('Quiz available in private chat -> @basicnew20bot')
    }else {
        let question = await newQuestion(ctx)
        let logo = question.url
        let msg =`What is the name of this cryptocurrency?<a href="${logo}">&#160;</a>`

        return ctx.replyWithHTML(msg, 
            Extra.markup(m => m.inlineKeyboard(keyboard(m, 1, question.answer)))
            )
    }
}

module.exports.actions = async (ctx, actionName) => {
    let res
    const re = /answer[0-3]/g
    if(actionName.match(re)){
        answerNum = +actionName[actionName.length -1]
        const question = ctx.session.question
        let coinName = question.answer[question.correct].name 
        let logo = question.url
        
        if(question.correct === answerNum) {
            ctx.session.score++

            res = `Correct! <b>${coinName}</b> Score: ${ctx.session.score}\n<a href="${logo}">&#160;</a>`
        }else {
            res = `Wrong!\nCorrect Answer: <b>${coinName}</b>\nScore: ${ctx.session.score}\n<a href="${logo}">&#160;</a>`
        }
        ctx.editMessageText(res, Extra.HTML().markup(m => m.inlineKeyboard(keyboard(m,2))))
        
    } else if(actionName == 'next'){
        const question = await newQuestion(ctx)
        let logo = question.url
        let msg =`What is the name of this cryptocurrency?<a href="${logo}">&#160;</a>`
        ctx.editMessageText(msg, Extra.HTML().markup(m => m.inlineKeyboard(keyboard(m,1,question.answer))))
        
    }else if (actionName == 'quit'){
        let msg =`<b>Nice Game!\nFinal Score: ${ctx.session.score}</b>`
        ctx.session = null
        ctx.editMessageText(msg, Extra.HTML())
        
    }
}

const keyboard = (m,step,answer) => {
    if (step==1){
        return [
            [m.callbackButton(answer[0].name, 'answer0'),m.callbackButton(answer[1].name, 'answer1')],
            [m.callbackButton(answer[2].name, 'answer2'),m.callbackButton(answer[3].name, 'answer3')]
        ]
    }else if (step ==2) {
        return [
            [m.callbackButton('NEXT', 'next')],
            [m.callbackButton('QUIT', 'quit')]
        ]
    }
}

const newQuestion = async ctx => {
    const filePath = './coins.json'
    const coins = await readFile(filePath)
    const question = {
        answer: [],
        correct: '',
        url: ''
    }
    ctx.session.score = ctx.session.score || 0
    question.answer = randomAnswers(coins,4, ctx.session.score)
    question.correct = Math.floor(Math.random()*4)
    question.url = "https://s2.coinmarketcap.com/static/img/coins/64x64/"+question.answer[question.correct].id+".png"
    
    ctx.session.question = question
    return question
}

const randomAnswers = (coins,answerQuantity, score) => {
    const answer = []
    const tmpArr = []
    const score = ctx.session.score
    //const difficulty = 0.01
    const coinsLen = coins.length +1
    let difficulty
    //console.log(coins.length)
    if(score > 0 && score <= 100) {
        difficulty = 0.01*score
    } else if (score >100){
        difficulty=1
    }else {
        difficulty= 0.01
    }
    while(tmpArr.length< answerQuantity){
        let n = Math.floor(Math.random()* coinsLen* difficulty)
        if (tmpArr.indexOf(n) === -1) {
            tmpArr.push(n)
            answer.push(coins[n])
        }
    }
    return answer
}

const readFile = filePath => {
    try {
        let rawData = fs.readFileSync(filePath)
        return JSON.parse(rawData)
    }catch(err){
        console.log(err)
    }
}
