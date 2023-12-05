//Drag & Drop 인터페이스
interface Draggable {
  dragStartHandler(e: DragEvent): void; // 드래그 시작 시
  dragEndHandler(e: DragEvent): void; // 드래그 버튼을 놓을 시
}

interface DragTarget {
  dragOverHandler(e: DragEvent): void; // 대상 객체 위에 진입 시 (드롭을 할 수 있게)
  dropHandler(e: DragEvent): void; // 드래그 끝나서 객체를 놓는 장소에서 발생 (드롭 시 처리)
  dragLeaveHandler(e: DragEvent): void; // 드래그 끝나고 대상 객체에서 벗어날때 발생 (시각적인 피드백 등 드래그현황 체크)
}

// type 값을 리터럴타입 대신 enum 을 이용한다
enum ProjectStatus {
  Active,
  Finished,
}
// 프로젝트(배열)의 형식
class Project {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

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
class ProjectState extends State<Project> {
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
const prjState = ProjectState.getInstance();

// Validate Interface
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// Validate 함수
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// AutoBind 데코레이터
// 사용하지않는 파라미터는 _ 기호로 나중에 사용할 수 있도록 암시
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//Component Base Class(공통적으로 쓰이는 프로퍼티, 메소드)
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElId?: string
  ) {
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElId) {
      this.element.id = newElId;
    }

    this.attach(insertAtStart);
  }

  // element 프로퍼티를 hostEl에서 노드 삽입하는 메소드
  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

// 프로젝트 아이템 Class
class ProjectItem
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

// 목록 리스트 Class
class ProjectList
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

// 입력폼 양식 클래스
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputEl = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descInputEl = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.renderContent();
  }

  // input 요소들을 모아서 반환하는 메소드
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputEl.value;
    const enteredDesc = this.descInputEl.value;
    const enteredPeople = this.peopleInputEl.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDesc,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
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
      !validate(peopleValidatable)
    ) {
      alert("Invalid Input, try again!");
      // Tuple 타입을 반환하지 못할경우 void 타입을 리턴
      return;
    } else {
      return [enteredTitle, enteredDesc, +enteredPeople];
    }
  }

  // Input 배열을 비우는 메소드
  private clearInputs() {
    this.titleInputEl.value = "";
    this.descInputEl.value = "";
    this.peopleInputEl.value = "";
  }

  // submit 시에 발동할 메소드
  @autobind
  private submitHandler(e: Event) {
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
  renderContent(): void {
    //여기선 형식만 맞춰준다.
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
