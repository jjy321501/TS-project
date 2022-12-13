"use strict";
function addNum(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("result: " + num);
}
function addAndHandle(n1, n2, cb) {
    const res = n1 + n2;
    const value = cb(res);
}
printResult(addNum(5, 12));
let combineVal;
combineVal = addNum;
// combineVal = printRes; // combineVal 에 함수타입 인자 타입까지 설정한후 오류 잡힘
// combineVal = 5;
console.log(combineVal(8, 8));
// let someVal: undefined;
addAndHandle(10, 20, (res) => {
    console.log(res);
});
