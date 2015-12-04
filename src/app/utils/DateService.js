function staffPicksDate(date) {
  if (!date) {
    return {month, year};
  }

  let d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/),
    // year, month (0-11), day
    newDate = new Date(d[1], d[2] - 1, d[3]),
    monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    month = newDate.getMonth(),
    year = newDate.getFullYear();

  return {
    month: monthsArr[month],
    year
  }
};

export default staffPicksDate;
