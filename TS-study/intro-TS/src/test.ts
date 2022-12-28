type Fruit = {
  x: string;
};

interface Meal {
  x: string;
  y: string;
}

class Apple implements Fruit {
  x: string;
  z: number;

  constructor(x: string, z: number) {
    this.x = x;
    this.z = z;
  }
}
interface Apple extends Fruit {
  z: number;
}

interface Banana extends Meal {
  z: number;
}

const t: Apple = {
  x: "12",
  z: 3,
};
const e: Banana = {
  x: "12",
  y: "12",
  z: 3,
};
