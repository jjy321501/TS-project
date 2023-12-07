var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { validate } from "../util/validation.js";
import { autobind } from "../decorators/autobind.js";
import { prjState } from "../state/project-state.js";
// 입력폼 양식 클래스
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputEl = this.element.querySelector("#title");
        this.descInputEl = this.element.querySelector("#description");
        this.peopleInputEl = this.element.querySelector("#people");
        this.configure();
        this.renderContent();
    }
    // input 요소들을 모아서 반환하는 메소드
    gatherUserInput() {
        const enteredTitle = this.titleInputEl.value;
        const enteredDesc = this.descInputEl.value;
        const enteredPeople = this.peopleInputEl.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descValidatable = {
            value: enteredDesc,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (
        //   enteredTitle.trim().length === 0 ||
        //   enteredDesc.trim().length === 0 ||
        //   enteredPeople.trim().length === 0
        !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid Input, try again!");
            // Tuple 타입을 반환하지 못할경우 void 타입을 리턴
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    // Input 배열을 비우는 메소드
    clearInputs() {
        this.titleInputEl.value = "";
        this.descInputEl.value = "";
        this.peopleInputEl.value = "";
    }
    // submit 시에 발동할 메소드
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        // JS에서 튜블이란 타입은 일종의 배열이기 때문에
        if (Array.isArray(userInput)) {
            // JS 구조분해할당 문법
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            prjState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
    // element(Form)에 이벤트 리스너를 등록하는 메소드
    configure() {
        // 여기의 submitHandler는 클래스의 this가 아닌 event객체의 this이기 때문에 바인딩을 한다
        this.element.addEventListener("submit", this.submitHandler);
    }
    // prjList에 부여된 type에 맞게 ID와 텍스트를 변화를 주는 메소드,
    renderContent() {
        //여기선 형식만 맞춰준다.
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map