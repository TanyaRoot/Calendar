const date = new Date();
let options = {
					weekday: 'long',
					year: 'numeric',
					month: 'numeric',
					day: 'numeric'
					};
let weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sut', 'sun'];
let days = ["31", "28", "31", "30", "31", "30",
						"31", "31", "30", "31", "30", "31"];
let months = ["Jan", "Feb", "March", "April", "May", "June",
							"July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export {
  date,
  options,
  weekdays,
  days,
  months
};
