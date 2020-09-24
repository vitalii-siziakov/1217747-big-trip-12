
import {capitalizeFirstCharacter} from "./common.js";
import {getDateTime, getTime, getDifferentTime} from "./utils-date-time.js";

const createEventTitle = (type, place) => {
  const eventTo = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
  let eventInTo = ``;

  if (eventTo.includes(type)) {
    eventInTo = `${capitalizeFirstCharacter(type)} to ${place}`;
  } else {
    eventInTo = `${capitalizeFirstCharacter(type)} in ${place}`;
  }
  return eventInTo;
};

const createEventOffer = (title, price) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
     </li>`);
};

const createEventOffers = (offersArr) => {
  let result = ``;
  if (offersArr.length) {
    result = `<h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">`;
    for (let i = 0; i < offersArr.length; i++) {
      let offerTitle = offersArr[i].title;
      let offerPrice = offersArr[i].price;
      result += createEventOffer(offerTitle, offerPrice);
    }
    result += `</ul>`;
  }

  return result;
};

export const createEventInfo = (point) => {
  let eventStartDateTime = getDateTime(point.date_from);
  let eventEndDateTime = getDateTime(point.date_to);

  const eventInfo = {
    "eventIcon": `img/icons/${point.type}.png`,
    "eventTitle": createEventTitle(point.type, point.destination.name),
    "eventStartDateTime": eventStartDateTime,
    "eventStartTime": getTime(eventStartDateTime),
    "eventEndDateTime": eventEndDateTime,
    "eventEndTime": getTime(eventEndDateTime),
    "eventDurationTime": getDifferentTime(eventStartDateTime, eventEndDateTime),
    "eventBasePrice": point.base_price,
    "eventOffers": createEventOffers(point.offers),
  };
  return eventInfo;
};

