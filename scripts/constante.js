const date = new Date();

let options = {
  year: 'numeric',
  month: 'long',
};
let year = date.getYear();
if (year < 2000) {
  year = year + 1900;
}
let thisDay = date.getDate();
if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
  days[1] = 29;
}

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let days = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

export {
  date,
  options,
  weekdays,
  months,
  days,
  year,
  thisDay
};
