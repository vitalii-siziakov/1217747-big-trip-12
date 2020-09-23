// День
import {createElement} from "../utils.js";
import {getDate, getMonDay, getDifferentDays} from "../utils-date-time.js";

const createUniqDatesArr = (pointsArr) => {
  let uniqDates = [];

  for (let i = 0; i < pointsArr.length; i++) {
    let evt = pointsArr[i];
    let date = getDate(evt.date_from);
    if (!uniqDates.includes(date)) {
      uniqDates.push(date);
    }
  }
  return uniqDates.sort();
};

export const createDaysCountArr = (pointsArr) => {
  let uniqDatesArr = createUniqDatesArr(pointsArr);
  let daysCountArr = [1];
  let dayCount = 1;
  if (uniqDatesArr.length > 1) {
    for (let i = 0; i < uniqDatesArr.length - 1; i++) {
      let duration = getDifferentDays(uniqDatesArr[i], uniqDatesArr[i + 1]);
      dayCount += duration;
      daysCountArr.push(dayCount);
    }
  }
  return daysCountArr;
};

const createDayArr = (day, point) => {
  let dayArr = [];

  for (let i = 0; i < point.length; i++) {
    let evt = point[i];
    let date = getDate(evt.date_from);
    if (date === day) {
      dayArr.push(evt);
    }
  }
  return dayArr.sort((a, b) => (a.date_from) - (b.date_from));
};

export const createDaysArr = (pointsArr) => {
  let days = createUniqDatesArr(pointsArr);
  let daysArr = [];

  for (let i = 0; i < days.length; i++) {
    daysArr.push(createDayArr(days[i], pointsArr));
  }
  return daysArr;
};

const createDayTemplate = (datetime, count = 1) => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${getDate(datetime)}">${getMonDay(datetime)}</time>
        </div>

      <ul class="trip-events__list"></ul>
      </li>
     </ul>`
  );
};

export default class Day {
  constructor(datetime, count = 1) {
    this._datetime = datetime;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._datetime, this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
