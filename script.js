import {  date, options,  weekdays,  months,  days,  year,  thisDay} from "./scripts/constante";
import { firstLoad, divload } from './scripts/firstLoad';

firstLoad();
divload();


window.onload = function() {
  tableLoad(new Date());
  showMonth();
  chooseDateNow();
  showToday();
}

function tableLoad(actualDate) {

  let tableCalendar = document.createElement('div');
  tableCalendar.setAttribute('id', 'divCalendar');
  // debugger
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
  for (let j = 0; j < firstDay.getDay() -1; j++) {   //change firstDay.getDay()
  	let divEmptyCell = document.createElement('div');
  	divEmptyCell.setAttribute('class', 'divEmptyCell');
  	divEmptyCell.innerHTML = "";
  	divCalendar.appendChild(divEmptyCell);
  }
	//это для воскресения, которое возвращает ноль
  if (firstDay.getDay() === 0) {   //change clone
  	for (let j2 = 0; j2 < 6; j2++) {
    	let divEmptyCell = document.createElement('div');
    	divEmptyCell.setAttribute('class', 'divEmptyCell');
    	divEmptyCell.innerHTML = "";
    	divCalendar.appendChild(divEmptyCell);
    }
  }

	//добавление ячеек даты согласно текущему месяцу
  for (let i = 0; i < days[actualDate.getMonth()]; i++) {  //change date.getMonth()
    let divCell = document.createElement('div');
    divCell.setAttribute('class', 'divCell');
    divCell.innerHTML = i + 1;
    divCalendar.appendChild(divCell);
  }
}

function showToday() {
	let todayDay = date.getDate();
	let chooseDay = document.getElementsByClassName("divCell");
	if (chooseDay.innerHTML = todayDay) {
		chooseDay[todayDay - 1].style = "border: 1px solid #dddddd; border-radius: 20px; background-color: #f7f8f9; font-weight: bold";
	}
}


//смена месяца по кнопкам
function showMonth() {
	document.getElementById("btnLeft").addEventListener("click", function(){
  	date.setMonth(date.getMonth()-1);
  	document.getElementById("monthYear").innerHTML = date.toLocaleString("ru", options);
    //  //date.toLocaleString("ru", options)
    var delDiv = document.getElementById("divCalendar"); //delete nafig
    delDiv.parentNode.removeChild(delDiv);
    tableLoad(date);
    showToday();
    chooseDateNow();
  });

	document.getElementById("btnRight").addEventListener("click", function() {
  	date.setMonth(date.getMonth()+1);
  	document.getElementById("monthYear").innerHTML = date.toLocaleString("ru", options);
    var delDiv = document.getElementById("divCalendar"); //delete nafig
    delDiv.parentNode.removeChild(delDiv);
    tableLoad(date);
    chooseDateNow();
  })
};

let yearObj = {
  "Jan": [],
  "Feb": [],
  "March": [],
  "April": [],
  "May": [],
  "June": [],
  "July": [],
  "Aug": [],
  "Sept": [],
  "Oct": [],
  "Nov": [],
  "Dec": []
//  'актуальная дата': [], //агуст
}
let timetable = [];
//yearObj["Jan"] = [1, 2, 3, 4, 5];
//console.log(yearObj);

//смена стиля выбранного числа
function chooseDateNow() {

	function chooseDate(e) {
	  if (e.target.className === "divCell") {
  	  e.target.style = 'border: 1px solid red; border-radius: 20px; background-color: #e5e5e5';

      let test = false;
       for (let i = 0; i < timetable.length; i++) {
          if (e.target.innerHTML === timetable[i]) {
            test = true;
          }
       }
       if (!test) {
         timetable.push(e.target.innerHTML);
       }
       parseTimeTable(timetable.sort(compareNumbers));
   };
	}

  function parseTimeTable(timetable) {
    document.getElementById('logTimetable').innerHTML = '';
    for(let i = 0; i < timetable.length; i++) {
      let div = document.createElement('div');
          div.innerHTML = timetable[i];
      document.getElementById('logTimetable').appendChild(div);
    }
  }

  function compareNumbers(a, b) {
    return a - b;
  }

	function chooseDateNo(e) {
	  if (e.target.className === "divCell") {
      document.oncontextmenu = function (){
        return false
      };
  	  e.target.style = "none";

      let arr = [];
      for(let i = 0; i < timetable.length; i++) {
         if (e.target.innerHTML !== timetable[i]) {
            arr.push(timetable[i]);
         }
      }
      timetable = arr;
      parseTimeTable(timetable);
  	  showToday(); //возвращает стиль текущего числа
	  };
	}
	divCalendar.addEventListener('click', chooseDate, false);
	divCalendar.addEventListener('contextmenu', chooseDateNo, false);

};

// кликнули на число создали массив записали в объект
// если переходишь на другой меясяц записываешь в другую ячейку объекта
// отображаешь нужную ячейку с массивом (timetable => yearObj[актуальная дата])
// let yearObj = {
//   'апрель': [], //январ
//   'актуальная дата': [], //агуст
//   3: []
// }
