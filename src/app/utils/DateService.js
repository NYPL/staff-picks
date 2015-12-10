function staffPicksDate(date, pickType) {
  let monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    newDate,
    month,
    year,
    d;

  if (!date) {
    return {month, year};
  }

  // If a date is from a monthly pick: 2015-10-01, 2015-11-01, etc
  if (pickType === 'staffpicks') {
    d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/);
    // year, month (0-11), day
    newDate = new Date(d[1], d[2] - 1, d[3]);
    month = monthsArr[newDate.getMonth()];
    year = newDate.getFullYear();
  } else {
    // The year is simply what's already in the data.
    year = date;
  }

  return {
    year,
    month
  }
};

export default staffPicksDate;
