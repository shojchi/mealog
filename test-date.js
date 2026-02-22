const { startOfWeek } = require('date-fns');

const now = new Date();
const currentWeek = startOfWeek(now, { weekStartsOn: 1 });

const targetDate = currentWeek;
const monday = new Date(targetDate);
monday.setDate(targetDate.getDate() - targetDate.getDay() + (targetDate.getDay() === 0 ? -6 : 1));
monday.setHours(0, 0, 0, 0);

console.log("currentWeek.getTime():", currentWeek.getTime());
console.log("monday.getTime():", monday.getTime());
console.log("Match:", currentWeek.getTime() === monday.getTime());
