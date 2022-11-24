import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
//dayjs().format("LLL");

const formatDate = (rawDate) => {
  return dayjs(rawDate).format("LLL");
};

export default formatDate;
