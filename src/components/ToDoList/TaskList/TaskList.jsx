import Loader from "../../Loader";
import Task from "./Task";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TaskList = ({ tasks, tasksLoading }) => {
  const [editMode, setEditMode] = useState({
    taskId: null,
    editField: null,
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  if (tasksLoading) return <Loader />;

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          setEditMode={setEditMode}
          isEditMode={editMode.taskId === task.id}
          register={register}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      ))}
    </ul>
  );
};

export default TaskList;
