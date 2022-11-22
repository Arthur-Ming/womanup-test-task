import TaskCreater from "./TaskCreater";
import TaskList from "./TaskList/TaskList";
import styles from "./index.module.scss";

const ToDoList = () => {
  return (
    <main className={styles.main}>
      <h1>To Do App</h1>
      <section className={styles.box}>
        <TaskCreater />
      </section>

      <TaskList />
    </main>
  );
};

export default ToDoList;
