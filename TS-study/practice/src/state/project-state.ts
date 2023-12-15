import { Project, ProjectStatus } from "../models/project";

// 리스너 타입 (리스너 함수의 리턴값을 상관 안함)
type Listener<T> = (items: T[]) => void;

// state 관리하는 상태 클래스 (다양한 상태를 관리하기 위해 제네릭 타입) / ex) 프로젝트, 장바구니 등
class State<T> {
  protected listeners: Listener<T>[] = []; // 리스너함수를 담는 배열

  // 리스너함수를 리스너배열에 추가하는 메소드
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// 프로젝트 상태를 관리하는 class
export class ProjectState extends State<Project> {
  private projects: Project[] = []; // 프로젝트를 담는 배열

  // 무분별한 객체생성을 막는 싱글톤패턴 (인스턴스화)
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // 프로젝트 추가하는 메소드
  addProject(title: string, desc: string, numOfPeople: number) {
    const newPrj = new Project(
      Math.random().toString(),
      title,
      desc,
      numOfPeople,
      ProjectStatus.Active // 초기등록시 항상 active
    );
    this.projects.push(newPrj);
    this.updateListeners();
  }

  //프로젝트의 상태를 전환하는 메소드
  moveProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);
    if (project && project.status !== newStatus) {
      //프로젝트 배열의 프로젝트의 id가 찾는 prjId 이면 true
      project.status = newStatus;
      this.updateListeners();
    }
  }
  //프로젝트들의 변경을 listener가 알도록 다시 렌더링한다
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // 원본참조 대신 복사본 참조
    }
  }
}

// 전역상태 ProjectState 클래스 생성
export const prjState = ProjectState.getInstance();
