import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskDeadline from "./TaskDeadline";
import { useState } from "react";
import TaskImage from "./TaskImage";
import useImageUploader from "../../../../hooks/useImageUploader";

const Task = ({ task, updateTask }) => {
  const [isEditMode, setEditMode] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const imageURL = (task && task.files && task.files[0]) || "";

  const { image, onFileInput, onDeleteFile } = useImageUploader(imageURL);

  const editModeSwitch = (e) => {
    e.preventDefault();
    setEditMode((prevMode) => !prevMode);
  };

  const onSubmit = (data) => {
    updateTask({
      ...data,
      id: task.id,
      files: image.url ? [image.url] : [],
    });
    setEditMode(false);
  };
  if (!task) return <div>task not found</div>;

  const { title, description, deadline } = task;

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
        image={image}
        onFileInput={onFileInput}
        onDeleteFile={onDeleteFile}
      />
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={editModeSwitch}
          disabled={image.loading}
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>

        <input
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className={styles.button}
          value="Submit"
          disabled={!isEditMode || image.loading}
        />
      </div>
    </form>
  );
};

export default Task;
