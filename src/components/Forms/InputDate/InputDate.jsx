import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import styles from '../forms.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

const InputDate = ({ name, label, control, timeIntervals, defaultValue }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => (
      <label className={styles.label}>
        <span>{label}</span>
        <DatePicker
          className={styles.input}
          onChange={(e) => field.onChange(Number(e))}
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

InputDate.defaultProps = {
  label: '',
  defaultValue: null,
  timeIntervals: 30,
};

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  timeIntervals: PropTypes.number,
  defaultValue: PropTypes.number,
};

export default InputDate;
