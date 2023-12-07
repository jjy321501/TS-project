var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
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
        attach(insertAtBeginning) {
            this.hostEl.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    class Project {
        constructor(id, title, desc, people, status) {
            this.id = id;
            this.title = title;
            this.desc = desc;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    function autobind(_, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    exports.autobind = autobind;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prjState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, desc, numOfPeople) {
            const newPrj = new project_1.Project(Math.random().toString(), title, desc, numOfPeople, project_1.ProjectStatus.Active);
            this.projects.push(newPrj);
            this.updateListeners();
        }
        moveProject(prjId, newStatus) {
            const project = this.projects.find((prj) => prj.id === prjId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.prjState = ProjectState.getInstance();
});
define("components/project-item", ["require", "exports", "components/base-component", "decorators/autobind"], function (require, exports, base_component_js_1, autobind_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_component_js_1.Component {
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
            e.dataTransfer.setData("text/plain", this.project.id);
            e.dataTransfer.effectAllowed = "move";
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
    exports.ProjectItem = ProjectItem;
    __decorate([
        autobind_js_1.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
});
define("components/project-list", ["require", "exports", "components/base-component", "models/project", "decorators/autobind", "state/project-state", "components/project-item"], function (require, exports, base_component_1, project_2, autobind_1, project_state_1, project_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_component_1.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(e) {
            if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
                e.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(e) {
            console.log(e.dataTransfer.getData("text/plain"));
            const prjId = e.dataTransfer.getData("text/plain");
            project_state_1.prjState.moveProject(prjId, this.type === "active" ? project_2.ProjectStatus.Active : project_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            project_state_1.prjState.addListener((projects) => {
                const revelantProject = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === project_2.ProjectStatus.Active;
                    }
                    else {
                        return prj.status === project_2.ProjectStatus.Finished;
                    }
                });
                this.assignedProjects = revelantProject;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                `${this.type.toUpperCase()}` + " PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new project_item_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_1.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_1.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_1.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    exports.validate = validate;
});
define("components/project-input", ["require", "exports", "components/base-component", "util/validation", "decorators/autobind", "state/project-state"], function (require, exports, base_component_js_2, validation_1, autobind_2, project_state_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_component_js_2.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputEl = this.element.querySelector("#title");
            this.descInputEl = this.element.querySelector("#description");
            this.peopleInputEl = this.element.querySelector("#people");
            this.configure();
            this.renderContent();
        }
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
            if (!(0, validation_1.validate)(titleValidatable) ||
                !(0, validation_1.validate)(descValidatable) ||
                !(0, validation_1.validate)(peopleValidatable)) {
                alert("Invalid Input, try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDesc, +enteredPeople];
            }
        }
        clearInputs() {
            this.titleInputEl.value = "";
            this.descInputEl.value = "";
            this.peopleInputEl.value = "";
        }
        submitHandler(e) {
            e.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                project_state_2.prjState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() {
        }
    }
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_2.autobind
    ], ProjectInput.prototype, "submitHandler", null);
});
define("app", ["require", "exports", "components/project-list", "components/project-input"], function (require, exports, project_list_1, project_input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const prjInput = new project_input_1.ProjectInput();
    const activePrjList = new project_list_1.ProjectList("active");
    const finishedPrjList = new project_list_1.ProjectList("finished");
});
//# sourceMappingURL=bundle.js.map