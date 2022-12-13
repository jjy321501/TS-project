function addNum(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const res = n1 + n2;
  const value = cb(res);
}

printResult(addNum(5, 12));

let combineVal: (a: number, b: number) => number;

combineVal = addNum;
// combineVal = printRes; // combineVal 에 함수타입 인자 타입까지 설정한후 오류 잡힘
// combineVal = 5;

console.log(combineVal(8, 8));

// let someVal: undefined;
addAndHandle(10, 20, (res) => {
  console.log(res);
});
