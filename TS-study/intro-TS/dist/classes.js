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
        // console.log(Department.fisicalYear); // this.fisicalYear 은 static 요소라서 인스턴스 유효 x
    }
    static createEmployee(name) {
        return { name: name };
    }
    // console.log(`Department (${this.id}): ${this.name}`);
    addEmployee(employee) {
        this.employees.push(employee);
        // this.id = "d2";// read only!
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fisicalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log("IT Department: " + this.id);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a valid value");
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
    addEmployee(name) {
        if (name === "jun") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const employee1 = Department.createEmployee("jun");
console.log(employee1, Department.fisicalYear);
const it = new ITDepartment("d1", ["jun"]);
it.addEmployee("jun");
it.addEmployee("young");
// it.employees[2] = "anna"; // ! private 속성이므로 클래스 외부 접근 X
it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();
console.log(it);
// const accounting = new AccountingDepartment('d2',[]);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2);
accounting.mostRecentReport = "Year End Report";
accounting.addReport("something went wrong");
console.log(accounting.mostRecentReport);
accounting.addEmployee("jun");
accounting.addEmployee("young");
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();
// const accountingCopy = { name: "s", describe: it.describe };
// accountingCopy.describe();
