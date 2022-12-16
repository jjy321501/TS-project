abstract class Department {
  static fisicalYear = 2022;
  // private id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    //   this.id = id;
    //   this.name = n;
    // console.log(Department.fisicalYear); // this.fisicalYear 은 static 요소라서 인스턴스 유효 x
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;
  // console.log(`Department (${this.id}): ${this.name}`);

  addEmployee(employee: string) {
    this.employees.push(employee);
    // this.id = "d2";// read only!
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe() {
    console.log("IT Department: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe(): void {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "jun") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
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
