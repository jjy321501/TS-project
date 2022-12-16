"use strict";
let addFn;
addFn = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 28;
        this.name = n;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let user1;
// let user1: Person; // Person 클래스가 Greetable 인터페이스를 구현했기때문에 설정 가능한 타입
user1 = new Person("jun");
// user1.name = "young"; // !! readonly
user1.greet("hi there - I am");
console.log(user1);
