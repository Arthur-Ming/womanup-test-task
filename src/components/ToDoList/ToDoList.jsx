import TaskCreater from "./TaskCreater";
import TaskList from "./TaskList/TaskList";
import styles from "./index.module.scss";
import useTodo from "../../hooks/useToDo";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const { createTask, state } = useTodo();
  const [isCreateTaskMode, setsCreateTaskMode] = useState(false);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <main className={styles.main}>
      <h1>To Do App</h1>
      <div className={styles.box}>
        {!isCreateTaskMode && (
          <button onClick={() => setsCreateTaskMode(true)}>Add new task</button>
        )}
        {isCreateTaskMode && (
          <section className={styles.box}>
            <TaskCreater createTask={createTask} />
          </section>
        )}
        <TaskList tasks={state.entities} tasksLoading={state.loading} />
      </div>
    </main>
  );
};

export default ToDoList;
