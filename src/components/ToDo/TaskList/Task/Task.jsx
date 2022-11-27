import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import TaskDeadline from './TaskDeadline';
import { useState } from 'react';
import TaskImage from './TaskImage';
import PropTypes from 'prop-types';
import { TaskType } from '../../../../types';
import useImageUploader from '../../../../hooks/useImageUploader';

const Task = ({ task, updateTask }) => {
  const [isEditMode, setEditMode] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { imageState, onFileInput, onResetFile, setImage } = useImageUploader();

  const editModeSwitch = (e) => {
    e.preventDefault();
    setEditMode((prevEditMode) => {
      if (!prevEditMode) setImage(task.image);
      return !prevEditMode;
    });
  };

  const onSubmit = (data) => {
    updateTask({
      ...data,
      id: task.id,
      image: imageState.id,
    });
    setEditMode(false);
  };
  if (!task) return <div>task not found</div>;

  const { title, description, deadline, image: imageId } = task;

  return (
    <form className={styles.item}>
      <TaskTitle title={title} isEditMode={isEditMode} register={register} error={errors.title} />
      <TaskDescription description={description} isEditMode={isEditMode} register={register} />
      <TaskDeadline deadline={deadline} isEditMode={isEditMode} control={control} />
      <TaskImage
        register={register}
        isEditMode={isEditMode}
        imageState={imageState}
        imageId={imageId}
        onFileInput={onFileInput}
        onDeleteFile={onResetFile}
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={editModeSwitch} disabled={imageState.loading}>
          {isEditMode ? 'Cancel' : 'Edit'}
        </button>
        <input
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className={styles.button}
          value="Submit"
          disabled={!isEditMode || imageState.loading}
        />
      </div>
    </form>
  );
};

Task.propTypes = {
  task: TaskType.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
