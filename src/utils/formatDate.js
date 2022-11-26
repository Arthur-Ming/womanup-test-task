import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

/**
 * Возвращает отформатированное время
 * @param {string} rawDate - числовой формат времени
 * @return {string} - отформатированное время
 */

const formatDate = (rawDate) => {
  return dayjs(rawDate).format('LLL');
};

export default formatDate;
