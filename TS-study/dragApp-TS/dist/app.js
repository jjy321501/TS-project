import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
var App;
(function (App) {
    new ProjectInput();
    new ProjectList("active");
    new ProjectList("finished");
})(App || (App = {}));
//# sourceMappingURL=app.js.map