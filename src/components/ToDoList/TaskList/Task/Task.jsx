import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskDeadline from "./TaskDeadline";
import Loader from "../../../Loader";
import useTask from "../../../../hooks/useTask";
import { useState } from "react";
import TaskImage from "./TaskImage/TaskImage";

const Task = ({ taskId }) => {
  const { task, loading } = useTask(taskId);
  const [isEditMode, setEditMode] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });
  if (loading) return <Loader />;

  const editModeSwitch = (e) => {
    e.preventDefault();
    setEditMode((prevMode) => !prevMode);
  };

  const { title, description, deadline, files } = task;
  console.log(task);
  console.log(files);
  const [imageURL = ""] = files;

  return (
    <form className={styles.item}>
      <TaskTitle
        title={title}
        isEditMode={isEditMode}
        register={register}
        error={errors.title}
      />
      <TaskDescription
        description={description}
        isEditMode={isEditMode}
        register={register}
      />
      <TaskDeadline
        deadline={deadline}
        isEditMode={isEditMode}
        control={control}
      />
      <TaskImage
        register={register}
        isEditMode={isEditMode}
        imageURL={imageURL}
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={editModeSwitch}>
          {isEditMode ? "Cancel" : "Edit"}
        </button>

        <input
          type="submit"
          /*  onClick={handleSubmit(onSubmit)} */
          className={styles.button}
          value="Submit"
          disabled={!isEditMode}
        />
      </div>
    </form>
  );
};

export default Task;
