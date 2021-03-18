const currency = (cur) => {
    let formatted = '';

    if(cur === '$'){
        formatted = 'USD'
    }
    
    return formatted
}
module.exports = currency;