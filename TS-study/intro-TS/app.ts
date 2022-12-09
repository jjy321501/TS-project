// const person: {
//   name: string;
//   age: number;
// } = {
const person = {
  name: "Minimillion",
  age: 28,
  hobbies: ["Cooking", "Exercise"],
};

let fovoriteActivities: string[];

fovoriteActivities = ["Exercise"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hobby.map()); !! ERROR !!
}
