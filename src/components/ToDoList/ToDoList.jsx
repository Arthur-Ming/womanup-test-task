import TaskCreater from "./TaskCreater";
import TaskList from "./TaskList/TaskList";
import TaskWrapper from "./TaskList/TaskWrapper";
import Task from "./TaskList/Task/Task";
import styles from "./index.module.scss";
import useTodo from "../../hooks/useToDo";
import { useState } from "react";

const ToDoList = () => {
  const { createTask, state } = useTodo();
  const [isCreateTaskMode, setsCreateTaskMode] = useState(false);
  const [seletedTaskId, setSeletedTaskId] = useState(null);

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
        <TaskList
          tasks={state.entities}
          tasksLoading={state.loading}
          setSeletedTaskId={setSeletedTaskId}
        />
      </div>
      {seletedTaskId && (
        <TaskWrapper onCloseClick={() => setSeletedTaskId(null)}>
          <Task taskId={seletedTaskId} />
        </TaskWrapper>
      )}
    </main>
  );
};

export default ToDoList;
