// const person: {
//   name: string;
//   age: number;
// } = {
var person = {
    name: "Minimillion",
    age: 28,
    hobbies: ["Cooking", "Exercise"]
};
var fovoriteActivities;
fovoriteActivities = ["Exercise"];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
