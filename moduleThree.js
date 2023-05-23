const searching = function searchingWordInText(text,word){
    return text.toLowerCase().includes(word.toLowerCase())
}
exports.searchText = searching
exports.even = function isEven(num){
    return num%2==0
}
exports.prime = function isPrime(num){
    if(num==1 && num==2 && num==5){
        return true
    }else if(num!=0){
        if(num%2!=0 && num%3!=0 && num%5!=0){
            return true
        }
    }
    return false
}
