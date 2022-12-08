function add(n1, n2, showRes, phrase) {
    //if(typeof n1 !== 'number' || typeof n2 !== 'number'){
    //   throw new Error('Incorrect input');
    // }
    var res = n1 + n2;
    if (showRes) {
        console.log(phrase + res);
    }
    else {
        return res;
    }
}
var number1 = 5;
var number2 = 2.8;
var printRes = true;
var phraseRes = "Result is: ";
add(number1, number2, printRes, phraseRes);
