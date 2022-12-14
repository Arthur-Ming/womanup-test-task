import { useForm } from 'react-hook-form';
import InputText from '../../Forms/InputText';
import Textarea from '../../Forms/Textarea';
import ImageUploader from '../../Forms/ImageUploader';
import InputDate from '../../Forms/InputDate';
import styles from './index.module.scss';
import useImageUploader from '../../../hooks/useImageUploader';
import PropTypes from 'prop-types';

const TaskCreater = ({ createTask }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });
  const { imageState, onFileInput, onDeleteFile, onResetFile } = useImageUploader();
  const onSubmit = (data) => {
    createTask({
      ...data,
      image: imageState.id,
    });
    reset();
    onResetFile();
  };

  return (
    <form className={styles.form}>
      <InputText
        name="title"
        label="Title"
        register={register}
        error={errors.title}
        required="this field is required!"
      />
      <Textarea name="description" label="Description" register={register} />
      <div className={styles.date_wrapper}>
        <InputDate name="deadline" label="Deadline" control={control} />
      </div>

      <ImageUploader
        name="image"
        label="Select file"
        register={register}
        onFileInput={onFileInput}
        onDeleteFile={onDeleteFile}
        imageState={imageState}
      />
      <div className={styles.buttons}>
        <input
          type="button"
          value="reset"
          onClick={() => {
            onDeleteFile();
            reset();
          }}
          disabled={imageState.loading}
          className={styles.button}
        />
        <input
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className={styles.button}
          value="add task"
          disabled={imageState.loading}
        />
      </div>
    </form>
  );
};

TaskCreater.propTypes = {
  createTask: PropTypes.func.isRequired,
};

export default TaskCreater;
