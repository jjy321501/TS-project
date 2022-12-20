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

type Universal = Combine | Numberic;
