import PropTypes from "prop-types";

export const TaskType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string),
  isDone: PropTypes.bool,
  deadline: PropTypes.number,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
    nanoseconds: PropTypes.number,
  }),
});
