console.log('hi');

window.onload = function() {
  firstLoad();
  divload();
  tableLoad();
}
//current date
const date = new Date();
let year = date.getYear();
if (year < 2000)
    year = year + 1900;
let thisDay = date.getDate();
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
    days[1] = 29;

let options = {
  year: 'numeric',
  month: 'long',
};

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let days = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

//firstLoad
function firstLoad() {
  let container = document.createElement('div');
  container.setAttribute('id','container');
  document.body.appendChild(container);
}
//div with buttons and monthYear
function divload() {
  let divHead = document.createElement('div');
  divHead.setAttribute('id','divHead');

  let name = document.createElement('h1');
  name.setAttribute('id', 'name');
  name.innerHTML = "Calendar";

  //block space
  let divHeadBox = document.createElement('div');
  divHeadBox.setAttribute('id','divHeadBox');

  let btnLeft = document.createElement('div');
  btnLeft.setAttribute('id','btnLeft');
  btnLeft.innerHTML= "<<<<";

  let monthYear = document.createElement('h2');
  monthYear.setAttribute('id', 'monthYear');
  monthYear.innerHTML = date.toLocaleString("ru", options);
  container.appendChild(monthYear);

  let btnRight = document.createElement('div');
  btnRight.setAttribute('id','btnRight');
  btnRight.innerHTML= ">>>>";

  container.appendChild(divHead);
  divHead.appendChild(name);
  divHead.appendChild(divHeadBox);
  //block space
  divHeadBox.appendChild(btnLeft);
  divHeadBox.appendChild(monthYear);
  divHeadBox.appendChild(btnRight);

}
//table
function tableLoad() {
  let tableCalendar = document.createElement('div');
  tableCalendar.setAttribute('id', 'divCalendar');
  container.appendChild(tableCalendar);

  for (let i = 1; i < days[date.getMonth()+1]; i++) {
    let divCell = document.createElement('div');
    divCell.setAttribute('class', 'divCell');
    divCell.innerHTML = i;
    divCalendar.appendChild(divCell);
  }

}


// если кратно 7 то создает новый тр(строку) + 7 тд(ячеек) и опять
// вывести год месяц-дни,, проверка на февраль
//months[date.getMonth()] "April"
//for (var i = 1; i < days[date.getMonth() +1]; i++) {console.log(i)}
//function checkFeb {
//}
