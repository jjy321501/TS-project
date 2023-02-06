var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    function validate(validatableInput) {
        let isValid = true;
        // required validate
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        // minLength validate
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        // maxLength validate
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        //
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        //
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    exports.validate = validate;
});
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    // autobind decorator
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
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
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
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
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
            const newProject = new project_1.Project(Math.random().toString(), title, desc, numOfPeople, project_1.ProjectStatus.Active);
            this.projects.push(newProject);
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
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
    exports.projectState = ProjectState.getInstance();
});
define("components/project-input", ["require", "exports", "components/base", "util/validation", "decorators/autobind", "state/project-state"], function (require, exports, base_js_1, validation_js_1, autobind_js_1, project_state_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    // ProjectInput Class
    class ProjectInput extends base_js_1.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        gatherInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDesc = this.descInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
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
            if (!(0, validation_js_1.validate)(titleValidatable) ||
                !(0, validation_js_1.validate)(descValidatable) ||
                !(0, validation_js_1.validate)(peopleValidatable)) {
                alert("Invalid input, please try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDesc, +enteredPeople];
            }
        }
        clearInput() {
            this.titleInputElement.value = "";
            this.descInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                project_state_js_1.projectState.addProject(title, desc, people);
                this.clearInput();
            }
        }
    }
    __decorate([
        autobind_js_1.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base", "decorators/autobind"], function (require, exports, base_js_2, autobind_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    // ProjectItem Class
    class ProjectItem extends base_js_2.Component {
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            return `${this.project.people} persons`;
        }
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("DragEnd");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.desc;
        }
    }
    __decorate([
        autobind_js_2.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "models/project", "components/base", "decorators/autobind", "state/project-state", "components/project-item"], function (require, exports, project_js_1, base_js_3, autobind_js_3, project_state_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    // ProjectList Class
    class ProjectList extends base_js_3.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            project_state_js_2.projectState.moveProject(prjId, this.type === "active" ? project_js_1.ProjectStatus.Active : project_js_1.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            project_state_js_2.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === project_js_1.ProjectStatus.Active;
                    }
                    return prj.status === project_js_1.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new project_item_js_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_1, project_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        new project_input_1.ProjectInput();
        new project_list_1.ProjectList("active");
        new project_list_1.ProjectList("finished");
    })(App || (App = {}));
});