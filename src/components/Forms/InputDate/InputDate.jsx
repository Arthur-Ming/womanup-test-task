import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import styles from "../forms.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  name,
  label = "",
  control,
  timeIntervals = 30,
  defaultValue = null,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <label className={styles.label}>
          <span>{label}</span>
          <DatePicker
            className={styles.input}
            onChange={(e) => field.onChange(e)}
            selected={field.value}
            minDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={timeIntervals}
            timeCaption="time"
            placeholderText="Click to select a date"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </label>
      )}
    />
  );
};

export default InputDate;
