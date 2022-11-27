import PropTypes from 'prop-types';

export const TaskType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  deadline: PropTypes.number,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
    nanoseconds: PropTypes.number,
  }),
});
