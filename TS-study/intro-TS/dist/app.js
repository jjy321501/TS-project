"use strict";
// interface Admin {
//   name: string;
//   privileges: string[];
// }
var _a;
const e1 = {
    name: "jun",
    privileges: ["create-server"],
    startDate: new Date(),
};
function addCombine(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        // typeof 타입가드
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = addCombine("Max", "jun");
result.split(" ");
//optional chaining
const fetchedUserData = {
    id: "u1",
    name: "jun",
    job: {
        title: "Free",
        description: "Freelancer",
    },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// const emptyInput = null;
const emptyInput = ""; // '' 그냥 빈 문자열을 넣고싶을때 null,undefined 와 다른 처리가 필요하다.
const storedData = emptyInput || "DEFAULT"; // => DEFAULT
// const storedData = emptyInput ?? "DEFAULT"; // => ''
console.log(storedData);
function printEmployeeInformation(emp) {
    console.log("Name: " + emp.name); // 두 속성 name 속성이 있어서 정상 작동
    if ("privileges" in emp) {
        // 리터럴 in 타입가드
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("startDate: " + emp.startDate);
    }
}
// printEmployeeInformation(e1); // 필드가 설정된 값
printEmployeeInformation({ name: "young", startDate: new Date() }); // prilvileges 즉석설정
// class 를 활용한 타입가드
class Car {
    drive() {
        console.log("Driving ...");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck ...");
    }
    loadCargo(amount) {
        console.log("Loading cargo ..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    //   if ("loadCargo" in vehicle) {
    if (vehicle instanceof Truck) {
        // instanceof 타입가드
        vehicle.loadCargo(10000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    //   //if (animal instanceof Bird) { // !! => X 인터페이스는 자바스크립트로 컴파일 되지 않았으므로
    //   if ("flyingSpeed" in animal) {
    //     console.log("Moving with speed: " + animal.flyingSpeed);
    //   }
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed: " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 1000 });
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!; // HTML 타입 캐스팅 리액트 JSX와 혼동요지가 있음
const userInputElement = document.getElementById("user-input"); // as 뒤에 타입캐스팅
if (userInputElement) {
    userInputElement.value = "Hi there!";
}
const errorBag = {
    email: "Not a valid email!",
    username: "Must start with a capital character!",
};
