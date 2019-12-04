// 111111 meets these criteria(double 11, never decreases).
// 223450 does not meet these criteria(decreasing pair of digits 50).
// 123789 does not meet these criteria(no double).
// How many different passwords within the range given in your puzzle input meet these criteria ?

//     Your puzzle input is 265275 - 781584.

function rangeChecker(){
    let count = 0;
    for (let i = 265275; i <= 781584; ++i){
        if(numberChecker(i)){
            count += 1;
        }
    }
    console.log(count);
    return count;
}

// rangeChecker();

function numberChecker(num){
    let digits = num.toString().split('');
    let count = {};
    count[digits[0]] = 1;
    for(let i = 1; i < digits.length; i++){
        if(digits[i] < digits[i-1]){
            return false;
        }
        if(count[digits[i]])
        {
            count[digits[i]] += 1;
        }else{
            count[digits[i]] = 1;
        }
    }
    let collection = Object.values(count);
    let doubles = collection.includes(2);
    return doubles;
}

rangeChecker();