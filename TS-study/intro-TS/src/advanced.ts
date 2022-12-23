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
type Numeric = number | boolean;

type Universal = Combine & Numeric; // number type

function addCombine(a: number, b: number): number;
function addCombine(a: string, b: string): string;
function addCombine(a: string, b: number): string;
function addCombine(a: number, b: string): string;
function addCombine(a: Combine, b: Combine) {
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

console.log(fetchedUserData?.job?.title);

// const emptyInput = null;
const emptyInput = ""; // '' 그냥 빈 문자열을 넣고싶을때 null,undefined 와 다른 처리가 필요하다.

const storedData = emptyInput || "DEFAULT"; // => DEFAULT
// const storedData = emptyInput ?? "DEFAULT"; // => ''

console.log(storedData);

// console.log(addCombine("a", "b")); // ab
// console.log(addCombine(1, 3)); //4

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
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
    // instanceof 타입가드
    vehicle.loadCargo(10000);
  }
}
useVehicle(v1);
useVehicle(v2);

//구별된 유니언타입
interface Bird {
  type: "bird"; // type 이 Bird 여야하는 문자열 리터럴타입
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
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
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement; // as 뒤에 타입캐스팅

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

// { email: 'Not a valid email' , username: 'Must start with a character!'}
interface ErrorContainer {
  [prop: string]: string;
}
const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};
