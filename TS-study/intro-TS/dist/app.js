"use strict";
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
// 제너릭 함수 예제
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// console.log(merge({ name: "jun" }, { age: 28 })); // 정상 작동 케이스
const mergedObj = merge({ name: "jun", hobbies: ["sports"] }, { age: 28 });
console.log(mergedObj.hobbies); // 사용할 수 있는 정보를 모르기때문에 타입캐스팅을 해야하는 번거로움이있다.
function countAndDescribe(element) {
    let descriptionText = "Got no value";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(["Hi there", "Cooking"])); // Array(2), 2elements
// console.log(countAndDescribe("123")); // '123' , 3elements
// console.log(countAndDescribe(123)); // number 타입은 length를 사용할 수 없음
// keyof 제약조건으로 상세히 타입을 줄수있다.
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
console.log(extractAndConvert({ name: "jun" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("jun");
textStorage.addItem("young");
textStorage.removeItem("jun");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourseGoal(title, desc, date) {
    let courseGoal = {}; // Partial<> 타입은 빈 객체를 할당 할 수 있다.
    courseGoal.title = title;
    courseGoal.description = desc;
    courseGoal.completeUntil = date;
    return courseGoal; // Partial<> 타입을 반환할 수 없으므로 타입 캐스팅한다.
}
const names = ["jun", "young"]; // Readonly<> 타입으로 배열 뿐 아니라 객체도 지정가능하다.
// names.push("jung");
// names.pop();
