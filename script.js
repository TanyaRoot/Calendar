// console.log('hi');
import {  date,
  options,
  weekdays,
  months,
  days,
  year,
  thisDay} from "./scripts/constante";

console.log(year);


window.onload = function() {
  //debugger
  firstLoad();
  divload();
  tableLoad(new Date());
  showToday();
  chooseDateNow();
  showMonth();
  //spaceLog();
}



 //////////////////////////change firstDay.getDay()

function firstLoad() {
   let container = document.createElement('div');
   container.setAttribute('id','container');

   let menu = document.createElement('div');
   menu.setAttribute('id','menu');

   let space = document.createElement('div');
   space.setAttribute('id','space');

   let log = document.createElement('div');
   log.setAttribute('id','log');

   document.body.appendChild(container);
   container.appendChild(menu);
   container.appendChild(space);
   container.appendChild(log);
 }

//div with buttons and monthYear
function divload() {
  //menu left
  let menuName = document.createElement('h1');
  menuName.setAttribute('id', 'menuName');
  menuName.innerHTML = "menu";

  //space center table
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
  space.appendChild(monthYear);

  let btnRight = document.createElement('div');
  btnRight.setAttribute('id','btnRight');
  btnRight.innerHTML= ">>>>";

  //log right
  let logSpace = document.createElement('h1');
  logSpace.setAttribute('id', 'logSpace');
  logSpace.innerHTML = "log";

  menu.appendChild(menuName);
  space.appendChild(divHead);
  divHead.appendChild(name);
  divHead.appendChild(divHeadBox);
  //block space
  divHeadBox.appendChild(btnLeft);
  divHeadBox.appendChild(monthYear);
  divHeadBox.appendChild(btnRight);
  log.appendChild(logSpace);

}
//table
function tableLoad(actualDate) {

  let tableCalendar = document.createElement('div');
  tableCalendar.setAttribute('id', 'divCalendar');
  space.appendChild(tableCalendar);

  //добавление дней недели
  for (let d = 0; d < weekdays.length; d++) {
    let divDayweek = document.createElement('div');
    divDayweek.setAttribute('class', 'divDayweek');
    divDayweek.innerHTML = weekdays[d];
    divCalendar.appendChild(divDayweek);
  }

  let firstDay = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);

	//добавление пустых ячеек, отсчет с нужного дня недели
  for (let j = 0; j < firstDay.getDay() -1; j++) {   //////////////////////////change firstDay.getDay()
	let divEmptyCell = document.createElement('div');
	divEmptyCell.setAttribute('class', 'divEmptyCell');
	divEmptyCell.innerHTML = "";
	divCalendar.appendChild(divEmptyCell);
  }
	//это для воскресения, которое возвращает ноль
  if (firstDay.getDay() === 0) {   //////////////////////////change clone
	for (let j2 = 0; j2 < 6; j2++) {
	let divEmptyCell = document.createElement('div');
	divEmptyCell.setAttribute('class', 'divEmptyCell');
	divEmptyCell.innerHTML = "";
	divCalendar.appendChild(divEmptyCell);
   }
  }

	//добавление ячеек даты согласно текущему месяцу
  for (let i = 0; i < days[actualDate.getMonth()]; i++) {  //////////////////////////change date.getMonth()
  let divCell = document.createElement('div');
  divCell.setAttribute('class', 'divCell');
  //divCell.setAttribute('class', 'divCell ' + (i+1));
  divCell.innerHTML = i + 1;
  divCalendar.appendChild(divCell);
  }
}

//подсвечивает текущий день
function showToday() {
	let todayDay = date.getDate();
	let chooseDay = document.getElementsByClassName("divCell");
	if (chooseDay.innerHTML = todayDay) {
		chooseDay[todayDay - 1].style = "border: 1px solid #dddddd; border-radius: 20px; background-color: #f7f8f9; font-weight: bold";
	}
}

let timetable = ['test'];
//смена стиля выбранного числа
function chooseDateNow() {

	function chooseDate(e) {
	  if (e.target.className === "divCell") {
	  e.target.style = 'border: 1px solid red; border-radius: 20px; background-color: #e5e5e5';
    // for (let i = 0; i < timetable.length; i++){
    //  if (e.target.innerHTML===timetable[i]){
    //    console.log(' уже есть');
    //    return   console.log(timetable);
    //   }
    //  else {
    //     timetable.push(e.target.innerHTML);
    //   }
    // }
   }; console.log(timetable);
	}
	function chooseDateNo(e) {
	  if (e.target.className === "divCell") {
    document.oncontextmenu = function (){
      return false
    };
	  e.target.style = "none";
    //timetable.pop(e.target.innerHTML);
    console.log(timetable);
	  showToday(); //возвращает стиль текущего числа
	  };
	}

	divCalendar.addEventListener('click', chooseDate, false);
	divCalendar.addEventListener('contextmenu', chooseDateNo, false);

};
//смена месяца по кнопкам
function showMonth() {
	document.getElementById("btnLeft").addEventListener("click", function(){
	date.setMonth(date.getMonth()-1);
	// //console.log(date.getMonth());
	document.getElementById("monthYear").innerHTML = date.toLocaleString("ru", options);
  //  //date.toLocaleString("ru", options)
  var delDiv = document.getElementById("divCalendar"); //delete nafig
  delDiv.parentNode.removeChild(delDiv);
  tableLoad(date);

  });

	document.getElementById("btnRight").addEventListener("click", function(){
	date.setMonth(date.getMonth()+1);
	// //console.log(date.getMonth());
	document.getElementById("monthYear").innerHTML = date.toLocaleString("ru", options);
  var delDiv = document.getElementById("divCalendar"); //delete nafig
  delDiv.parentNode.removeChild(delDiv);
  tableLoad(date);
  })
};


// вывести год месяц-дни,, проверка на февраль
//months[date.getMonth()] "April"
//for (var i = 1; i < days[date.getMonth() +1]; i++) {console.log(i)}
