// Точка маршрута
import {capitalizeFirstCharacter} from "../utils.js";
import {getDateTime, getTime, getDifferentTime} from "../utils-date-time.js";

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

const createEventInfo = (point) => {
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


export const createEventTemplate = (point) => {
  const eventInfo = createEventInfo(point);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${eventInfo.eventIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventInfo.eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventInfo.eventStartDateTime}">${eventInfo.eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventInfo.eventEndDateTime}">${eventInfo.eventEndTime}</time>
          </p>
          <p class="event__duration">${eventInfo.eventDurationTime}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventInfo.eventBasePrice}</span>
        </p>

        ${eventInfo.eventOffers}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
   </li>`
  );
};
