function add(n1: number, n2: number, showRes: Boolean, phrase: string) {
  //if(typeof n1 !== 'number' || typeof n2 !== 'number'){
  //   throw new Error('Incorrect input');
  // }
  let res = n1 + n2;
  if (showRes) {
    console.log(phrase + res);
  } else {
    return res;
  }
}

const number1 = 5;
const number2 = 2.8;
const printRes = true;
const phraseRes = "Result is: ";

add(number1, number2, printRes, phraseRes);
