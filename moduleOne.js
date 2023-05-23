const cowsay = require(`cowsay`)
module.exports.moduleCow = function cowMessage(body){
    let message = cowsay.say({
        text: body,
        e: `oO`,
        T: `U `,
        r: true,
    })
    return message
}
