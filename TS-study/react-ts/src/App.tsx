import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const todos = [{ id: "t1", text: "완주 완료" }];
  return (
    <div className="App">
      {/* A component that adds todos */}
      <TodoList items={todos} />
    </div>
  );
};

export default App;
