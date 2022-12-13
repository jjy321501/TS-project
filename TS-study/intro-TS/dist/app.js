"use strict";
class Department {
    constructor(n) {
        this.employees = [];
        this.name = n;
    }
    describe() {
        console.log("Department: " + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department("Accounting");
accounting.addEmployee("jun");
accounting.addEmployee("young");
// accounting.employees[2] = "anna"; // ! private 속성이므로 클래스 외부 접근 X
accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();
// const accountingCopy = { name: "s", describe: accounting.describe };
// accountingCopy.describe();
