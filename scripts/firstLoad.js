import {  date, options,  weekdays,  months,  days,  year,  thisDay} from "./constante";

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
   //space.appendChild(monthYear);

   let btnRight = document.createElement('div');
   btnRight.setAttribute('id','btnRight');
   btnRight.innerHTML= ">>>>";

   //log right
   let logSpace = document.createElement('h1');
   logSpace.setAttribute('id', 'logSpace');
   logSpace.innerHTML = "log";

   let logTimetable = document.createElement('div');
   logTimetable.setAttribute('id', 'logTimetable');
   
   menu.appendChild(menuName);
   space.appendChild(divHead);
   divHead.appendChild(name);
   divHead.appendChild(divHeadBox);
   //block space
   divHeadBox.appendChild(btnLeft);
   divHeadBox.appendChild(monthYear);
   divHeadBox.appendChild(btnRight);
   log.appendChild(logSpace);
   log.appendChild(logTimetable);

 }

 export {firstLoad, divload}
