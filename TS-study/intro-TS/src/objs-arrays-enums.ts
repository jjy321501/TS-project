// const person: {
//   name: string;
//   age: number;
// } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Minimillion",
//   age: 28,
//   hobbies: ["Cooking", "Exercise"],
//   role: [2, "author"],
// };

// javascript 상수처리 해야 용이함
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN, // 0
  READ_ONLY, // 1
  AUTHOR, // 2
}

const person = {
  name: "Minimillion",
  age: 28,
  hobbies: ["Cooking", "Exercise"],
  role: Role.ADMIN,
};

// person.role.push("admin");
// person.role[1] = 10;
// person.role = [0, "author"];

let fovoriteActivities: string[];

fovoriteActivities = ["Exercise"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hobby.map()); !! ERROR !!
}

if (person.role === Role.ADMIN) {
  console.log("is Admin");
}
