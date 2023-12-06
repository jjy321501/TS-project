namespace App {
  //Component Base Class(공통적으로 쓰이는 프로퍼티, 메소드)
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
