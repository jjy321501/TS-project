// 내장 제네릭
// const names: Array<string> = ["jun", "young"];
// // names[0].split("");

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then((data) => {
// //   data.split(" ");
// });

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// console.log(merge({ name: "jun" }, { age: 28 })); // 정상 작동 케이스

const mergedObj = merge({ name: "jun", hobbies: ["sports"] }, { age: 28 });
// const mergedObj2 = merge({ name: "jun" }, { age: 28 }); // object 의 속성을 맞추지않아도 에러X
console.log(mergedObj.age); // 사용할 수 있는 정보를 모르기때문에 타입캐스팅을 해야하는 번거로움이있다.
