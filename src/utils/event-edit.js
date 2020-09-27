import {getLastWord, capitalizeFirstCharacter} from "./common.js";
import {getDateTimeShort} from "./utils-date-time.js";
import {eventOffers} from "../mock/event.js";

const createEventTypeBlock = (type) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstCharacter(type)}</label>
    </div>`
  );
};

export const createEventTypesBlock = (typesArr) => {
  let block = ``;
  for (let i = 0; i < typesArr.length; i++) {
    block += createEventTypeBlock(typesArr[i]);
  }
  return block;
};

export const createOffersContains = (offersAvailableArr, offersArr = []) => {
  let offersAvailable = ``;
  for (let i = 0; i < offersAvailableArr.length; i++) {
    let offer = offersAvailableArr[i];
    let title = offer.title;
    let price = offer.price;
    let nameId = `event-offer-${(getLastWord(title).toLowerCase())}`;
    let checked = ``;

    for (let b = 0; b < offersArr.length; b++) {
      let offerArrElement = offersArr[b];
      if (offerArrElement.title === title && offerArrElement.price === price) {
        checked = `checked`;
      }
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

export const createOffersBlock = (offersAvailableArr, offersArr) => {
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

export const createDescriptionPicturesBlock = (description, picturesArr) => {
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

export const createEventEditInfo = (point) => {

  const eventEditInfo = {
    "eventId": point.id,
    "eventIcon": `img/icons/${point.type}.png`,
    "eventType": point.type,
    "eventTypeName": createEventTypeName(point.type),
    "eventDestinationName": point.destination.name,
    "eventStartDateTime": getDateTimeShort(point.date_from),
    "eventEndDateTime": getDateTimeShort(point.date_to),
    "eventBasePrice": point.base_price,
    "eventIsFavorite": point.is_favorite,
    "eventTypeOffersAvailable": eventOffers[point.type],
    "eventOffersChecked": point.offers,
    "eventPictures": point.destination.pictures,
    "eventDescription": point.destination.description
  };
  return eventEditInfo;
};
