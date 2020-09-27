// Точка маршрута
import Abstract from "./abstract.js";
import {createEventInfo} from "../utils/event.js";

export const createEventTemplate = (point) => {
  const {eventId, eventIcon, eventTitle, eventStartDateTime, eventStartTime, eventEndDateTime, eventEndTime, eventDurationTime, eventBasePrice, eventOffers} = createEventInfo(point);

  return (
    `<li class="trip-events__item" data-id="${eventId}">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${eventIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventStartDateTime}">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventEndDateTime}">${eventEndTime}</time>
          </p>
          <p class="event__duration">${eventDurationTime}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventBasePrice}</span>
        </p>

        ${eventOffers}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
   </li>`
  );
};

export default class Event extends Abstract {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  removeElement() {
    this._element.getElement().remove();
  }
}
