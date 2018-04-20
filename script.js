import { date, options, weekdays, days, months} from "./scripts/mains";
let actualDate = new Date();

//1! при загрузке страницы выдает
window.onload = function() {
	loadSomeBlocks (); //загружает несменные блоки, но с обновляшками
	loadBlocks(new Date()); //прогружает с новой датой; 1 - актуальная, 2 - смена
	changeMonth(); //смена месяца
  showToday(); //подсветка текущего  дня месяца
  daysMonth.addEventListener('click', chooseDayForLog, false); // прослушка по клику добавляет
  daysMonth.addEventListener('contextmenu', chooseDayDelLog, false); // прослушка по 2клику убивает
}

function loadSomeBlocks () {
	//1. строка с текущей датой при загрузке календаря
	document.getElementById('todayIs').innerHTML =
		'<p>Today is ' + actualDate.toLocaleString("en", options) + '</p>';
	//2. добавляет или заменяет строчку месяц actualDate
	document.getElementById('monthIs').innerHTML =
		'<span>' + months[actualDate.getMonth()] +'</span>';
}
//todayIs curr, weekday names
function loadBlocks(actualDate) {
	//создаем див daysLoad в space
	let daysLoad = document.createElement('div');
	daysLoad.setAttribute('id', 'daysLoad');
	space.appendChild(daysLoad);
	//создаем див weekdaysName в daysLoad
	let weekdaysName = document.createElement('div');
	weekdaysName.setAttribute('id', 'weekdaysName');
	daysLoad.appendChild(weekdaysName);
	//создаем див daysMonth в daysLoad
	let daysMonth = document.createElement('div');
	daysMonth.setAttribute('id', 'daysMonth');
	daysLoad.appendChild(daysMonth);

	//2. прогружаем имена дней недели из массива weekdays
	for (let i = 0; i < weekdays.length; i++) {
		let divWeekday = document.createElement('div');
		divWeekday.setAttribute('class','divWeekday');
		divWeekday.innerHTML = weekdays[i];
		weekdaysName.appendChild(divWeekday);
	}

	//3. получаем день недели первого числа месяца
	let firstDay = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);

	//3.1 добавляем пустые ячейки в начало месяца, если начало недели пн-сб
	for (let j = 0; j < firstDay.getDay()-1; j++) { // -1 т.к. количество пустых ячеек нужно
		let divEmptyDay = document.createElement('div');
		divEmptyDay.setAttribute('class', 'divEmptyDay');
		divEmptyDay.innerHTML = ""; //добавляем пустые ячейки
		daysMonth.appendChild(divEmptyDay);
	}

	//3.2 добавляем пустые ячейки в начало месяца, если начало недели воскресение
	if (firstDay.getDay() === 0) {
		for (let j = 0; j < 6; j++) { //date
		let divEmptyDay = document.createElement('div');
		divEmptyDay.setAttribute('class', 'divEmptyDay');
		divEmptyDay.innerHTML = ""; //добавляем пустые ячейки
		daysMonth.appendChild(divEmptyDay);
		}
	}

	//4. прогружаем числа месяца из массива days
	for (let i = 0; i < days[actualDate.getMonth()]; i++) { //перебирает числа из days
		let divDay = document.createElement('div');
		divDay.setAttribute('class', 'divDay');
		divDay.innerHTML = i + 1; //выгружает числа типа 0+1 чётенько
		daysMonth.appendChild(divDay);
	}
}
//подсветка текущего дня месяца
function showToday() {
  let todayDay = date.getDate();
  let actMonth = actualDate.getMonth();
  let actYear = actualDate.getYear();
  let chooseThisDay = [].slice.call(document.getElementsByClassName("divDay"));
  if (actMonth === date.getMonth() & actYear === date.getYear() ) {  // сравнение с текущим месяцем и годом
    chooseThisDay.forEach(function(item, i) {
      if (+item.innerHTML === todayDay) {
         chooseThisDay[todayDay - 1].style = "border: 1px solid red; border-radius: 20px; background-color: #f7f8f9; font-weight: bold";
      }
    });
  }
}
//смена месяца по кнопкам, +, -
function changeMonth() {
	//смена месяца по клинку на левую кнопку
	document.getElementById('buttonLeft').addEventListener('click', function() {
		actualDate.setMonth(actualDate.getMonth()-1); //уменьшение месяца
		document.getElementById('monthIs').innerHTML =
			'<span>' + months[actualDate.getMonth()] + '</span>'; //изменение строки monthIs
		let delDiv = document.getElementById("daysLoad");
		delDiv.parentNode.removeChild(delDiv); //удаляем див daysLoad
		loadBlocks(actualDate); //передаем на перезагрузку архумент с новым месяцем именно actualDate
    showToday();//подсветка текущего  дня месяца
    chooseDayForLog(actualDate);
  })
	//смена месяца по клинку на правую кнопку
	document.getElementById('buttonRight').addEventListener('click', function() {
		actualDate.setMonth(actualDate.getMonth()+1); //увеличение месяца
		document.getElementById('monthIs').innerHTML =
			'<span>' + months[actualDate.getMonth()] + '</span>'; //изменение строки monthIs
		let delDiv = document.getElementById("daysLoad");
		delDiv.parentNode.removeChild(delDiv); //удаляем див daysLoad
		loadBlocks(actualDate); //передаем на перезагрузку архумент с новым месяцем именно actualDate
    showToday();//подсветка текущего  дня месяца
    chooseDayForLog(actualDate);
  })
};



//ТОТ САМЫЙ ЛОГ
let datasave = []
window.datasave = datasave

// смена стиля для даты
function chooseDayForLog(e) {
  if (e.target.className === "divDay") {
    e.target.style = 'background-color: #cee1ff';
  dateInLog(e); //добавление в массив лога
  }
}
//убивает стиль
function chooseDayDelLog(e) {
  if (e.target.className === "divDay") {
    document.oncontextmenu = function (){
      return false
    }
    e.target.style = "none";
    dateDelFromLog(e); //удаление из массива лога
    showToday();
  }
}

//добавление в массив лога
function dateInLog(e) {
  let addThisDate = new Date(date.getFullYear(), date.getMonth(), e.target.innerHTML); //преобразование даты "4/27/2018"
  let check = false;
  for (let i = 0; i < datasave.length; i++) {
    if (addThisDate.toString() === datasave[i].toString()) {
      check = true;
    }
  }
  if (!check) {
    datasave.push(addThisDate);
  }
  showLog(datasave.sort(compareDate));
}
//for sort
function compareDate(a, b) {
  return a > b;
}

//удаление из массива лога
function dateDelFromLog(e) {
  let addThisDate = new Date(date.getFullYear(), date.getMonth(), e.target.innerHTML); // даты "4/27/2018"
  for (let i = 0; i < datasave.length; i++) {
    if (addThisDate.toString() === datasave[i].toString()) {
      datasave.splice([i], 1);
    }
  }
  showLog(datasave);
}

//вывод лога в лог-спейс, перезаписывает массив
function showLog(e) {
  document.getElementById('showLog').innerHTML = "";//need
  for (let i = 0; i < datasave.length; i++) {
    let datasaveDiv = document.createElement('div');
    datasaveDiv.setAttribute('class', 'datasaveDiv');
    // if (datasave[i].getDate().length === 1) {
    //   console.log('aaaa');
    // }
    //console.log(datasave[i].getDate().);
    datasaveDiv.innerHTML = datasave[i].getDate()
                              + "." + datasave[i].getMonth()
                              + "." + datasave[i].getFullYear();
    document.getElementById('showLog').appendChild(datasaveDiv);
  }
      //console.log(datasave);
}
