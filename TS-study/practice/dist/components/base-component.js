export const something = "...";
//Component Base Class(공통적으로 쓰이는 프로퍼티, 메소드)
export default class Component {
    constructor(templateId, hostId, insertAtStart, newElId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElId) {
            this.element.id = newElId;
        }
        this.attach(insertAtStart);
    }
    // element 프로퍼티를 hostEl에서 노드 삽입하는 메소드
    attach(insertAtBeginning) {
        this.hostEl.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map