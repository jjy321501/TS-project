"use strict";
// interface Admin {
//   name: string;
//   privileges: string[];
// }
const e1 = {
    name: "jun",
    privileges: ["create-server"],
    startDate: new Date(),
};
function addCombine(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log("Name: " + emp.name); // 두 속성 name 속성이 있어서 정상 작동
    if ("privileges" in emp) {
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
        vehicle.loadCargo(10000);
    }
}
useVehicle(v1);
useVehicle(v2);
