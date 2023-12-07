var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { autobind } from "../decorators/autobind.js";
// 프로젝트 아이템 Class
export class ProjectItem extends Component {
    get persons() {
        if (this.project.people === 1) {
            return "개인 프로젝트";
        }
        else {
            return `${this.project.people}인 프로젝트`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", this.project.id); //드래그 이벤트에 데이터를 담을 수 있다.
        e.dataTransfer.effectAllowed = "move"; // 데이터를 현재위치에서 드롭위치로 (복사)
    }
    dragEndHandler(_) {
        console.log("dragEnd");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons;
        this.element.querySelector("p").textContent = this.project.desc;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
//# sourceMappingURL=project-item.js.map