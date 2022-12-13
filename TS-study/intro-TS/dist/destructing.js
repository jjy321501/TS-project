"use strict";
const myName = "Jun";
// myName = 'Young'; // ! const 변경 불가능한 상수 재할당 불가.
// let age = 29;
// age = 27; // ! let 은 재할당 가능함
function plus1(a, b) {
    // var result;
    let result;
    result = a + b;
    return result;
}
// if(age > 20){ // var 과 let 비슷하지만 var는 전역적인 할당
//   let isOld = true;
// }
// console.log(isOld);
// console.log(result); // let 과 var 둘다 result 타입스크립트 오류
const plus2 = (a, b) => {
    return a + b;
};
console.log(plus2(3, 5));
const printOut = (out) => {
    console.log(out);
};
const button = document.querySelector("button");
printOut(plus2(5, 2));
const hobbies = ["sports", "cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const human = {
    firstName: "jun",
    age: 28,
};
const copiedPerson = Object.assign({}, human);
// const add = (a, b, c, d) => {}; // 인자 개수 일일히 지정
// const add = (...numbers: number[]) => { // spread 연산자로 인자(number[])타입 지정
//   return numbers.reduce((curRes, curVal) => {
//     return curRes + curVal;
//   }, 0);
// };
const addTuple = (...numbers) => {
    // spread 연산자로 인자 (Tuple)타입 지정
    return numbers.reduce((curRes, curVal) => {
        return curRes + curVal;
    }, 0);
};
const addedNumbers = addTuple(5, 10, 2);
console.log(addedNumbers);
// const hobby1 = hobbies[0];
// const hobby1 = hobbies[1];
// const hobby1 = hobbies[2];
const [hobby1, hobby2, ...remainHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName: userName, age } = human;
console.log(userName, age, human);
