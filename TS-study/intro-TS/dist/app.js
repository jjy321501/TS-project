"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private id: string;
        // private name: string;
        this.employees = [];
        //   this.id = id;
        //   this.name = n;
    }
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
        // this.id = "d2";// read only!
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
    }
    addEmployee(name) {
        if (name === "jun") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
    }
    printReports() {
        console.log(this.reports);
    }
}
const it = new ITDepartment("d1", ["jun"]);
it.addEmployee("jun");
it.addEmployee("young");
// it.employees[2] = "anna"; // ! private 속성이므로 클래스 외부 접근 X
it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();
console.log(it);
const accounting = new AccountingDepartment("d2", []);
accounting.addReport("something went wrong");
accounting.addEmployee("jun");
accounting.addEmployee("young");
accounting.printReports();
accounting.printEmployeeInformation();
// const accountingCopy = { name: "s", describe: it.describe };
// accountingCopy.describe();
