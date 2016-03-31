function monthOrSeason(month, year) {
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
		     'July', 'August', 'September', 'October', 'November',
		     'December'];

  // Unhappy hack. Starting with March 2016 the lists are seasonal ("Spring"
  // etc.) This implementation should perhaps be replaced with a different
  // data model that allows for arbitrary naming of lists.
  if (year >= 2016) {
    if (month >= 2) {
      return "Spring";
    }
  }

  return monthsArr[month];
}

function staffPicksDate(date) {
  if (!date) {
    return {month, year};
  }

  const d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/);
  const newDate = new Date(d[1], d[2] - 1, d[3]);
  const year = newDate.getFullYear();
  const month = monthOrSeason(newDate.getMonth(), year);
 
  return {
    month,
    year
  }
};

export default staffPicksDate;
