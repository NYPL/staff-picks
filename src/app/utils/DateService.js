function staffPicksDate(date) {
  if (!date) {
    return {month, year};
  }

  const d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/);
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
		     'July', 'August', 'September', 'October', 'November', 'December'];
  const newDate = new Date(d[1], d[2] - 1, d[3]);
  const month = monthsArr[newDate.getMonth()];
  const year = newDate.getFullYear();

  return {
    month,
    year
  }
};

export default staffPicksDate;
