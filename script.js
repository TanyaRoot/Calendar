import {
  date,
  options,
  weekdays,
  days,
  months
} from "./scripts/mains";

let actualDate = new Date();

//1! при загрузке страницы выдает
window.onload = function() {
  loadSomeBlocks(); //загружает несменные блоки, но с обновляшками
  loadBlocks(new Date()); //прогружает с новой датой; 1 - актуальная, 2 - смена
  changeMonthPrev(); //смена месяца prev
  changeMonthNext(); //смена месяца next
  showToday(); //подсветка текущего  дня месяца
  // console.log('TY');
  // daysMonth.addEventListener('click', chooseDayForLog, false); // прослушка по клику добавляет
  // daysMonth.addEventListener('dblclick', chooseDayDelLog, false); // прослушка по 2клику убивает
}

function loadSomeBlocks() {
  // nav initialization
  var elem = document.querySelector('.sidenav');
  var instance = M.Sidenav.init(elem, options);
  // user drop initialization
  var elem = document.querySelector('.dropdown-trigger');
  var instance = M.Dropdown.init(elem, options);

  //1. строка с текущей датой при загрузке календаря
  document.getElementById('todayIs').innerHTML =
    '<p>Today is ' + actualDate.toLocaleString("en", options) + '</p>';
  //2. добавляет или заменяет строчку месяц actualDate
  document.getElementById('monthIs').innerHTML = months[actualDate.getMonth()];
}
//todayIs curr, weekday names
function loadBlocks(actualDate) {
  // console.log('actualDate111', actualDate);

	//3. получаем день недели первого числа месяца
  let firstDay = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);
  let lastDay = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0);
  // console.log('firstDay', firstDay);
  // console.log('lastDay', lastDay);
  //   console.log('lastDay.getDay()', lastDay.getDay());

  //создаем див daysLoad в space
  let daysLoad = document.createElement('div');
  daysLoad.setAttribute('id', 'daysLoad');
    //создаем див weekdaysName в daysLoad
  let weekdaysName = document.createElement('div');
  weekdaysName.setAttribute('id', 'weekdaysName');
    //создаем див daysMonth в daysLoad
  let daysMonth = document.createElement('div');
  daysMonth.setAttribute('id', 'daysMonth');
	////////////
	space.appendChild(daysLoad);
	daysLoad.appendChild(weekdaysName);
	daysLoad.appendChild(daysMonth);

  //2. прогружаем имена дней недели из массива weekdays
  for (let i = 0; i < weekdays.length; i++) {
    let divWeekday = document.createElement('div');
    divWeekday.setAttribute('class', 'divWeekday');
    divWeekday.innerHTML = weekdays[i];
    weekdaysName.appendChild(divWeekday);
  }
  //3.1 добавляем пустые ячейки в начало месяца, если начало недели пн-сб
  for (let j = 0; j < firstDay.getDay() - 1; j++) { // -1 т.к. количество пустых ячеек нужно
    let divEmptyDay = document.createElement('div');
    divEmptyDay.setAttribute('class', 'divEmptyDay');
    divEmptyDay.innerHTML = "_"; //добавляем пустые ячейки
    daysMonth.appendChild(divEmptyDay);
  }
  //3.2 добавляем пустые ячейки в начало месяца, если начало недели воскресение
  if (firstDay.getDay() === 0) {
    for (let j = 0; j < 6; j++) { //date
      let divEmptyDay = document.createElement('div');
      divEmptyDay.setAttribute('class', 'divEmptyDay');
      divEmptyDay.innerHTML = "_"; //добавляем пустые ячейки
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
  // 3.3 добавление пустых ячеек в конец месяца
  // -1 т.к. количество пустых ячеек нужно для выравнивания
   for (let j = 7; j > lastDay.getDay(); j--) {
    let divEmptyDay2 = document.createElement('div');
    divEmptyDay2.setAttribute('class', 'divEmptyDay2');
    divEmptyDay2.innerHTML = "_"; //добавляем пустые ячейки
    daysMonth.appendChild(divEmptyDay2);
  }

  //proof datasave
  changedDay();


  // прослушки
  daysMonth.addEventListener('click', chooseDayForLog, false); // прослушка по клику добавляет
  daysMonth.addEventListener('dblclick', chooseDayDelLog, false); // прослушка по 2клику убивает
}
//подсветка текущего дня месяца
function showToday() {
  let todayDay = date.getDate();
  let actMonth = actualDate.getMonth();
  let actYear = actualDate.getYear();
  let chooseThisDay = [].slice.call(document.getElementsByClassName("divDay"));
  if (actMonth === date.getMonth() && actYear === date.getYear()) { // сравнение с текущим месяцем и годом
    chooseThisDay.forEach(function(item, i) {
      if (+item.innerHTML === todayDay) {
        chooseThisDay[todayDay - 1].style = "border: 1px solid rgb(3,155,229,0.9); border-radius: 20px; font-weight: bold";
      }
    });
  }
}
//смена месяца по кнопкам, +, -
function changeMonthPrev() {
  //смена месяца по клинку на левую кнопку
  document.getElementById('buttonLeft').addEventListener('click', function() {
    // console.log('here  <<<<<<');
    // console.log( typeof actualDate.getMonth(), actualDate.getMonth());
    actualDate.setMonth(actualDate.getMonth() - 1); //уменьшение месяца
    document.getElementById('monthIs').innerHTML = months[actualDate.getMonth()]; //изменение строки monthIs
    let delDiv = document.getElementById("daysLoad");
    delDiv.parentNode.removeChild(delDiv); //удаляем див daysLoad
    loadBlocks(actualDate); //передаем на перезагрузку архумент с новым месяцем именно actualDate
    let date = actualDate.getMonth() ;
    // console.log('actualDate.getMonth()' ,actualDate.getMonth());

    // let date1 = date.setMonth() ;
    // console.log('date1' ,date111);

      // console.log("actualDate3333333222", typeof actualDate, actualDate);




     chooseDayForLog(actualDate);
    chooseDayDelLog(actualDate);

    dateInLog(actualDate);
    // dateDelFromLog(actualDate);
    // showLog(actualDate);
    //////?////showToday();//подсветка текущего  дня месяца

  })
}

function changeMonthNext() {
  //смена месяца по клинку на правую кнопку
  document.getElementById('buttonRight').addEventListener('click', function() {
    // console.log('here >>>>>');
    actualDate.setMonth(actualDate.getMonth() + 1); //увеличение месяца
    document.getElementById('monthIs').innerHTML =
      '<span>' + months[actualDate.getMonth()] + '</span>'; //изменение строки monthIs
    let delDiv = document.getElementById("daysLoad");
    delDiv.parentNode.removeChild(delDiv); //удаляем див daysLoad
    loadBlocks(actualDate); //передаем на перезагрузку архумент с новым месяцем именно actualDate

    chooseDayForLog(actualDate);
    chooseDayDelLog(actualDate);

    // dateInLog(actualDate);
    // dateDelFromLog(actualDate);
    // showLog(actualDate);
    //////?////showToday();//подсветка текущего  дня месяца

  })
};



//ТОТ САМЫЙ ЛОГ
let datasave = [];
window.datasave = datasave;

// смена стиля для даты
function chooseDayForLog(e) {
  // console.log("actualDate3333331111", typeof actualDate, actualDate);
  // console.log("e.target3333331111", typeof e.target, e.target);
  // if (e.target === undefined) {
  //   console.log('JALLLLLL');
  //   return
  // }
// debugger

  if (!e.target) return

  if (e.target.className === "divDay") {
    // console.log("1");
    // debugger
    e.target.style = "background-color: rgb(60,131,249,0.6); border: 1px solid rgb(60,131,249,0.9); border-radius: 20px";
    // console.log('nere');
    dateInLog(e); //добавление в массив лога
  }
}


//убивает стиль
function chooseDayDelLog(e) {

  if (!e.target) return


    if (e.target.className === "divDay") {
    // document.oncontextmenu = function() {
    //   return false
    // }
    e.target.style = "none";
    dateDelFromLog(e); //удаление из массива лога
    showToday();
  }
}

/*
    добавление в массив лога
    @type event
*/
function dateInLog(popka) {

  const e = popka || {}
  if(!e.target) return
   // console.log('e there e.target.innerHTML', e.target.innerHTML);
   // console.log('date.getFullYear()', date.getFullYear());
   //  console.log('date.getMonth()', date.getMonth());
  let addThisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), e.target.innerHTML);
  // console.log('addThisDate55555', addThisDate);
  let check = false; // проверка на повторы
  for (let i = 0; i < datasave.length; i++) {
    if (addThisDate.toString() === datasave[i].toString()) {
      check = true;
    }
  }
  if (!check) {
    datasave.push(addThisDate);
  }

// console.log(datasave);

  showLog(datasave.sort(compareDate));
}

//for sort
function compareDate(a, b) {

// console.log(a, b);
return new Date(a) - new Date(b);
  // return new Date(a).getTime() > new Date(b).getTime();
}

//удаление из массива лога
function dateDelFromLog(e) {
  let addThisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), e.target.innerHTML); // даты "4/27/2018"
  for (let i = 0; i < datasave.length; i++) {
    if (addThisDate.toString() === datasave[i].toString()) {
      datasave.splice([i], 1);
    }
  }
  showLog(datasave);
}

//вывод лога в лог-спейс, перезаписывает массив
function showLog(e) {
  document.getElementById('showLog').innerHTML = ""; //need
  for (let i = 0; i < datasave.length; i++) {

    let datasaveDiv = document.createElement('div');
    datasaveDiv.setAttribute('class', 'datasaveDiv');
    // добавление нулей впереди одиночных number
    let dateNum = datasave[i].getDate();
    if (dateNum < 10) {
      dateNum = "0" + dateNum;
      // console.log("dateNum", dateNum);
    }
    let monthNum = datasave[i].getMonth() +1;
    if (monthNum < 10) {
      monthNum = "0" + monthNum;
      // console.log("monthNum", monthNum);
    }
    datasaveDiv.innerHTML = dateNum +
      "." + monthNum +
      "." + datasave[i].getFullYear();
    document.getElementById('showLog').appendChild(datasaveDiv);
    // console.log('datasave', datasave);
  }
}

 function changedDay() {
   // console.log('actualDateIfffff', actualDate);
   // console.log('datasaveffffff[1]', datasave[1]);
   const currentTargets = [].slice.call(document.getElementsByClassName('divDay'))
// console.log(currentTargets);
   for (let i =  0; i < 31; i++) { //length month there
     let datafilter = new Date(actualDate.getFullYear(), actualDate.getMonth(), i);
     let elem = document.getElementsByClassName('divDay');
     // console.log('elem',elem);
     // console.log(elem[i]);
     for (let j = 0; j < datasave.length; j++) {
       if (+datafilter === +datasave[j] ) {
         currentTargets.find(i => {
          if ( i.innerHTML === datasave[j].getDate().toString()) {
           console.log(i);
           i.setAttribute('class', 'divDay backStyle');
           // debugger
}
         })
         // document.getElementsByClassName('divDay').
         // this.setAttribute('class', 'backStyle');
       }
     }





     // for (let j = 0; j < datasave.length; j++) {
     //   // console.log('datasave[j]', datasave[j]);
     //   // console.log('nawooool11111');
     //   // console.log('datasave i', datasave[j], typeof +datasave[j]);
     //   console.log('datafilter',datafilter, typeof +datafilter);
     //   // debugger
     //   if (+datafilter === +datasave[j] ) {
     //     console.log('nawooool');
     //     // console.log('datafilter', datafilter);
     //     // console.log('i', i);
     //
     //
     //
     //     debugger
     //   }
     // }




   }


 }
