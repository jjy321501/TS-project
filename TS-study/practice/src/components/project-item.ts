/// <reference path="base-component.ts"/>

namespace App {
  // 프로젝트 아이템 Class
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return "개인 프로젝트";
      } else {
        return `${this.project.people}인 프로젝트`;
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(e: DragEvent): void {
      e.dataTransfer!.setData("text/plain", this.project.id); //드래그 이벤트에 데이터를 담을 수 있다.
      e.dataTransfer!.effectAllowed = "move"; // 데이터를 현재위치에서 드롭위치로 (복사)
    }
    dragEndHandler(_: DragEvent): void {
      console.log("dragEnd");
    }

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.persons;
      this.element.querySelector("p")!.textContent = this.project.desc;
    }
  }
}
