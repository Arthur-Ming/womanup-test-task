import Loader from "../../Loader";
import TaskLabel from "./TaskLabel";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TaskList = ({
  tasks,
  tasksLoading,
  setSeletedTaskId,
  deleteTask,
  updateTask,
}) => {
  if (tasksLoading) return <Loader />;
  console.log(tasks);
  return (
    <ul className={styles.list}>
      {tasks.map(({ id, title, deadline, isDone }) => (
        <TaskLabel
          key={id}
          title={title}
          deadline={deadline}
          id={id}
          setSeletedTaskId={setSeletedTaskId}
          isDone={isDone}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
