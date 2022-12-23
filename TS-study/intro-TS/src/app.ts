function Logger(logStr: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logStr);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.innerText = p.name;
    }
  };
}

// @Logger("LOGGING - PERSON")
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object </h1>", "app")
class Person {
  name = "jun";
  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
