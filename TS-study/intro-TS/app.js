var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var myName = "Jun";
// myName = 'Young'; // ! const 변경 불가능한 상수 재할당 불가.
// let age = 29;
// age = 27; // ! let 은 재할당 가능함
function plus1(a, b) {
    // var result;
    var result;
    result = a + b;
    return result;
}
// if(age > 20){ // var 과 let 비슷하지만 var는 전역적인 할당
//   let isOld = true;
// }
// console.log(isOld);
// console.log(result); // let 과 var 둘다 result 타입스크립트 오류
var plus2 = function (a, b) {
    return a + b;
};
console.log(plus2(3, 5));
var printOut = function (out) {
    console.log(out);
};
var button = document.querySelector("button");
printOut(plus2(5, 2));
var hobbies = ["sports", "cooking"];
var activeHobbies = ["Hiking"];
activeHobbies.push.apply(activeHobbies, hobbies);
var human = {
    firstName: "jun",
    age: 28
};
var copiedPerson = __assign({}, human);
// const add = (a, b, c, d) => {}; // 인자 개수 일일히 지정
// const add = (...numbers: number[]) => { // spread 연산자로 인자(number[])타입 지정
//   return numbers.reduce((curRes, curVal) => {
//     return curRes + curVal;
//   }, 0);
// };
var add = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    // spread 연산자로 인자 (Tuple)타입 지정
    return numbers.reduce(function (curRes, curVal) {
        return curRes + curVal;
    }, 0);
};
var addedNumbers = add(5, 10, 2);
console.log(addedNumbers);
// const hobby1 = hobbies[0];
// const hobby1 = hobbies[1];
// const hobby1 = hobbies[2];
var hobby1 = hobbies[0], hobby2 = hobbies[1], remainHobbies = hobbies.slice(2);
console.log(hobbies, hobby1, hobby2);
var userName = human.firstName, age = human.age;
console.log(userName, age, human);
