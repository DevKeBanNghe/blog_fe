import moment from 'moment';
const getCurrentDate = (format = 'DD/MM/YYYY') => {
  return moment().format(format);
};

const antdDateToStringDate = ({ value, format = 'DD/MM/YYYY' }) => {
  if (!value) return value;
  return moment(new Date(value)).format(format);
};

const getCurrentYear = () => new Date().getFullYear();

export { getCurrentDate, antdDateToStringDate, getCurrentYear };
