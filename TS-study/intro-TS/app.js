function add(n1, n2) {
    return n1 + n2;
}
function printRes(num) {
    console.log("result: " + num);
}
function addAndHandle(n1, n2, cb) {
    var res = n1 + n2;
    cb(res);
}
printRes(add(5, 12));
var combineVal;
combineVal = add;
// combineVal = printRes; // combineVal 에 함수타입 인자 타입까지 설정한후 오류 잡힘
// combineVal = 5;
console.log(combineVal(8, 8));
// let someVal: undefined;
addAndHandle(10, 20, function (res) {
    console.log(res);
});
