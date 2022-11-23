import { useState } from "react";
import styles from "../index.module.scss";
import InputText from "../../../../Forms/InputText";
import { useForm } from "react-hook-form";

const TaskTitle = ({ title, isEditMode, setEditMode, register, errors }) => {
  if (isEditMode)
    return (
      <InputText
        name="title"
        defaultValue={title}
        label=""
        register={register}
        error={errors.title}
        required="this field is required!"
      />
    );

  return <h4 className={styles.title}>{title}</h4>;
};

export default TaskTitle;
