import styles from "./index.module.scss";
import TaskTitle from "./TaskTitle";
import { useEffect, useState } from "react";

const Task = ({
  task,
  setEditMode,
  isEditMode,
  register,
  control,
  handleSubmit,
  errors,
}) => {
  const { id, title, description, deadline } = task;

  return (
    <li className={styles.item}>
      <TaskTitle
        title={title}
        setEditMode={setEditMode}
        isEditMode={isEditMode}
        register={register}
        errors={errors}
      />
      <p className={styles.description}>
        {description || `add a more detailed description...`}
      </p>
      <p className={styles.deadline}>
        <span>deadline:</span>
        <span>{deadline || `-`}</span>
      </p>
      <button>Cancel</button>
      <button
        onClick={() =>
          setEditMode((prev) => ({
            ...prev,
            taskId: id,
          }))
        }
      >
        Edit
      </button>
    </li>
  );
};

export default Task;
