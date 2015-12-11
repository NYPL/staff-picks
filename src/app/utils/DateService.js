function staffPicksDate(date) {
  if (!date) {
    return {month, year};
  }

  let d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/),
    monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    newDate = new Date(d[1], d[2] - 1, d[3]),
    month = monthsArr[newDate.getMonth()],
    year = newDate.getFullYear();

  return {
    month,
    year
  }
};

export default staffPicksDate;
