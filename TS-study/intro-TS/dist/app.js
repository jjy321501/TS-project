"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logStr) {
    console.log("LOGGER FACTORY");
    return function (constructor) {
        console.log(logStr);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("Rendering Template");
                const hookEl = document.getElementById(hookId);
                // const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").innerText = this.name; // 오리지널 생성자를 부르지않으니 p.name 대신 this. 이용
                }
            }
        };
    };
}
// @Logger("LOGGING - PERSON")
let Human = class Human {
    constructor() {
        this.name = "jun";
        console.log("Creating person object...");
    }
};
Human = __decorate([
    Logger("LOGGING"),
    WithTemplate("<h1>My Person Object </h1>", "app")
], Human);
const pers = new Human();
console.log(pers);
// ---
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, desciptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(desciptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price");
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 19);
