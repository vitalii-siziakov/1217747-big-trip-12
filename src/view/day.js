// День
import Abstract from "./abstract.js";
import {getDate, getMonDay} from "../utils/utils-date-time.js";

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

export default class Day extends Abstract {
  constructor(datetime, count = 1) {
    super();
    this._datetime = datetime;
    this._count = count;
  }

  getTemplate() {
    return createDayTemplate(this._datetime, this._count);
  }
}
