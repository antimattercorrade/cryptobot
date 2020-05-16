module.exports.numRounding = num => {
    if(num >= 1){
        num = num.toFixed(2)
    } else {
        let numDecimal = num.toString().split(".")[1]
        for (let i=0; i<numDecimal.length; i++){
            if(numDecimal[i] != 0){
                num = num.toString().substr(0,i+6)
                break;
            }
        }
    }
    return num
}