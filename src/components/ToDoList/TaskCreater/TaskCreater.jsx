import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./index.module.scss";
import classNames from "classnames";
import { uploadFile } from "../../../utils/api";

const TaskCreater = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
    /*  const { file } = data;
       if (file.length) {
      uploadFile(file[0]);
    } */
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        <span>Title</span>
        <input
          className={classNames(styles.input, {
            [styles.invalid]: errors.title,
          })}
          type="text"
          {...register("title", {
            required: "this field is required!",
          })}
        />
        {errors.title && (
          <span className={styles.invalid_text}>{errors.title.message}</span>
        )}
      </label>
      <label className={styles.label}>
        <span>Description</span>
        <textarea className={styles.textarea} {...register("description")} />
      </label>
      <Controller
        control={control}
        name="deadline"
        defaultValue={null}
        render={({ field }) => (
          <label className={styles.label}>
            <span>Deadline</span>
            <DatePicker
              className={styles.input}
              onChange={(e) => field.onChange(e)}
              selected={field.value}
              minDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              placeholderText="Click to select a date"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        )}
      />
      <label className={styles.label}>
        <span>Select file</span>
        <input type="file" {...register("file")} />
      </label>
      <input type="submit" className={styles.button} value="Add" />
    </form>
  );
};

export default TaskCreater;
