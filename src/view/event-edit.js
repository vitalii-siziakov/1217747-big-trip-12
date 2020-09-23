// Форма создания/редактирования (используется одна форма)
import {createElement, capitalizeFirstCharacter, getLastWord} from "../utils.js";
import {getDateTimeShort} from "../utils-date-time.js";
import {eventOffers} from "../mock/event.js";

const createOffersContains = (offersAvailableArr, offersArr) => {
  let offersAvailable = ``;
  for (let i = 0; i < offersAvailableArr.length; i++) {
    let offer = offersAvailableArr[i];
    let title = offer.title;
    let price = offer.price;
    let nameId = `event-offer-${(getLastWord(title).toLowerCase())}`;
    let checked = ``;
    if (offersArr.includes(offer)) {
      checked = `checked`;
    }

    let offerAvailable = (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${nameId}-1" type="checkbox" name="${nameId}" ${checked}>
            <label class="event__offer-label" for="${nameId}-1">
              <span class="event__offer-title">${title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
      </div>`
    );
    offersAvailable += offerAvailable;
  }
  return offersAvailable;
};

const createOffersBlock = (offersAvailableArr, offersArr) => {
  let block = ``;
  if (offersAvailableArr.length) {
    block = (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOffersContains(offersAvailableArr, offersArr)}
          </div>
      </section>`);
  }
  return block;
};

const createPicturesContains = (picturesArr) => {
  let pictures = ``;
  for (let i = 0; i < picturesArr.length; i++) {
    let picture = (
      `<img class="event__photo" src="${picturesArr[i].src}" alt="${picturesArr[i].description}">`
    );
    pictures = pictures + picture;
  }
  return pictures;
};

const createDescriptionContains = (description) => {
  let block = ``;
  if (description.length) {
    block = (
      `<p class="event__destination-description">${description}</p>`);
  }
  return block;
};

const createPicturesBlock = (picturesArr) => {
  let block = ``;
  if (picturesArr.length) {
    block = (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPicturesContains(picturesArr)}
        </div>
      </div>`);
  }
  return block;
};

const createDescriptionPicturesBlock = (description, picturesArr) => {
  let block = ``;
  if (description.length || picturesArr.length) {
    block = (
      `<section class="event__section  event__section--destination">

      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${createDescriptionContains(description)}
        ${createPicturesBlock(picturesArr)}
    </section>`);
  }
  return block;
};

const createEventTypeName = (type) => {
  const eventTo = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
  let eventInTo = ``;

  if (eventTo.includes(type)) {
    eventInTo = `${capitalizeFirstCharacter(type)} to`;
  } else {
    eventInTo = `${capitalizeFirstCharacter(type)} in`;
  }
  return eventInTo;
};

const createEventEditInfo = (point) => {

  const eventEditInfo = {
    "eventIcon": `img/icons/${point.type}.png`,
    "eventType": point.type,
    "eventTypeName": createEventTypeName(point.type),
    "eventDestinationName": point.destination.name,
    "eventStartDateTime": getDateTimeShort(point.date_from),
    "eventEndDateTime": getDateTimeShort(point.date_to),
    "eventBasePrice": point.base_price,
    "eventTypeOffersAvailable": eventOffers[point.type],
    "eventOffersChecked": point.offers,
    "eventPictures": point.destination.pictures,
    "eventDescription": point.destination.description,
  };
  return eventEditInfo;
};

const createEventEditTemplate = (point) => {
  const {eventIcon, eventTypeName, eventDestinationName, eventStartDateTime, eventEndDateTime, eventBasePrice, eventTypeOffersAvailable, eventOffersChecked, eventPictures, eventDescription} = createEventEditInfo(point);

  return (
    `<li class="trip-events__item">
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

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
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
        </header>
        <section class="event__details">

          ${createOffersBlock(eventTypeOffersAvailable, eventOffersChecked)}

          ${createDescriptionPicturesBlock(eventDescription, eventPictures)}

        </section>
      </form>
     </li>`
  );
};

export default class EventEdit {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
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
