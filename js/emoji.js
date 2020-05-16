module.exports.emoji = change => {
    let msg = '';
    if ( change > 0 && change <= 0.5) {
        msg =  msg +'😄'
    }else if (change > 0.5 && change <= 5){
        msg = msg + '↗️😄'
    } else if (change > 5 && change <= 15) {
        msg = msg+ '🤩'
    }else if (change > 15) {
        msg = msg+ '🚀'
    }

    if ( change < 0 && change >= -0.5) {
        msg =  msg +'😔'
    }else if (change < -0.5 && change >= -5){
        msg = msg + '↙️😔'
    } else if (change < -5 && change >= -15) {
        msg = msg+ '😫'
    }else if (change < -15) {
        msg = msg+ '🐌'
    }
    return msg

}