// Форма создания/редактирования (используется одна форма)
import Abstract from "./abstract.js";
import {createEventTypesBlock, createEventEditInfo, createOffersBlock, createDescriptionPicturesBlock} from "../utils/event-edit.js";

const TRANSFER_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const ACTIVITY_TYPES = [`check-in`, `sightseeing`, `restaurant`];

const createEventEditTemplate = (point) => {
  const {eventId, eventIcon, eventTypeName, eventDestinationName, eventStartDateTime, eventEndDateTime, eventBasePrice, eventIsFavorite, eventTypeOffersAvailable, eventOffersChecked, eventPictures, eventDescription} = createEventEditInfo(point);
  const isFavorite = (eventIsFavorite) ? `checked = checked` : ``;

  return (
    `<li class="trip-events__item" data-id="${eventId}">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${eventIcon}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                  ${createEventTypesBlock(TRANSFER_TYPES)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                  ${createEventTypesBlock(ACTIVITY_TYPES)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventTypeName}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDateTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDateTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventBasePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
            </label>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
        </header>
        <section class="event__details">

          ${createOffersBlock(eventTypeOffersAvailable, eventOffersChecked)}

          ${createDescriptionPicturesBlock(eventDescription, eventPictures)}

        </section>
      </form>
     </li>`
  );
};

export default class EventEdit extends Abstract {
  constructor(point) {
    super();
    this._point = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickFavoriteHandler = this._formClickFavoriteHandler.bind(this);
    this._formChangeTypeHandler = this._formChangeTypeHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  // Метод для установки обработчика для Submit
  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formClickFavoriteHandler() {
    this._callback.formClickFavorite();
  }

  // Метод для установки обработчика клика для Favorite
  setformClickFavoriteHandler(callback) {
    this._callback.formClickFavorite = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._formClickFavoriteHandler);
  }

  _formChangeTypeHandler() {
    this._callback.formChangeType();
  }

  // Метод для установки обработчика клика для Type
  setFormChangeTypeHandler(callback) {
    this._callback.formChangeType = callback;
    this.getElement().addEventListener(`click`, this._formChangeTypeHandler);
  }

  removeElement() {
    this.getElement().remove();
  }
}
