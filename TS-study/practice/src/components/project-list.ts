/// <reference path="base-component.ts"/>

namespace App {
  // 목록 리스트 Class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }
    @autobind
    dragOverHandler(e: DragEvent): void {
      if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
        //더 많은 프로젝트 존재시 텍스트 프로젝트만 타겟
        e.preventDefault(); // default는 drop을 허용치 않기 때문
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind // drop 리스트 마다 달라지기때문에 decorator @autobind
    dropHandler(e: DragEvent): void {
      console.log(e.dataTransfer!.getData("text/plain")); //드래그 객체 데이터(id)를 가져온다.
      const prjId = e.dataTransfer!.getData("text/plain");
      prjState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }
    @autobind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure(): void {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("drop", this.dropHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);

      // 프로젝트 리스너를 추가하는 메소드
      prjState.addListener((projects: Project[]) => {
        //리터럴 값으로 프로젝트의 타입을 감별,선정
        const revelantProject = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          } else {
            return prj.status === ProjectStatus.Finished;
          }
        });
        this.assignedProjects = revelantProject;
        this.renderProjects();
      });
    }

    // prjList에 부여된 type에 맞게 ID와 텍스트를 변화를 주는 메소드
    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        `${this.type.toUpperCase()}` + " PROJECTS";
    }

    // 추가된 프로젝트들을 렌더링하는 메소드 ()
    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }
  }
}
