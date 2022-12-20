// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

// 위의 인터페이스로 구현한 방식과 동일하게 작동하지만
// 인터섹션 타입
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "jun",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combine = string | number;
type Numberic = number | boolean;

type Universal = Combine & Numberic; // number type

function addCombine(a: Combine, b: Combine) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
// console.log(addCombine("a", "b")); // ab
// console.log(addCombine(1, 3)); //4

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
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

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ("loadCargo" in vehicle) {
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(10000);
  }
}
useVehicle(v1);
useVehicle(v2);
