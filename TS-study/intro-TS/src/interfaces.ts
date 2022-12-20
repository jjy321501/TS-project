// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let addFn: AddFn;

addFn = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

// type Person {
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable, Named {
  name?: string;
  age = 28;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;
// let user1: Person; // Person 클래스가 Greetable 인터페이스를 구현했기때문에 설정 가능한 타입

user1 = new Person();
// user1.name = "young"; // !! readonly

user1.greet("hi there - I am");
console.log(user1);
