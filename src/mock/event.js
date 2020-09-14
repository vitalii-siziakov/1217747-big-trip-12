import {getRandomArrElem} from "./utils.js";
import {getRandomArr} from "./utils.js";

const MAX_EVENT_OFFERS_LENGTH = 5;

const eventOffers = {
  "taxi": [
    {"Order Uber": 20}
  ],
  "bus": [],
  "train": [],
  "ship": [],
  "transport": [],
  "drive": [
    {"Rent a car": 200}
  ],
  "flight": [
    {"Add luggage": 50},
    {"Switch to comfort": 80},
    {"Add meal": 15},
    {"Choose seats": 5},
    {"Travel by train": 40}
  ],
  "check-in": [
    {"Add breakfast": 50}
  ],
  "sightseeing": [
    {"Book tickets": 40},
    {"Lunch in city": 30}
  ],
  "restaurant": []
};

const eventTypes = Object.keys(eventOffers);

export const getRandomEvent = () => {
  let type = getRandomArrElem(eventTypes);
  let offers = [];

  if (eventOffers[type].length >= MAX_EVENT_OFFERS_LENGTH) {
    offers = getRandomArr(eventOffers[type], MAX_EVENT_OFFERS_LENGTH);
  } else if (eventOffers[type].length) {
    offers = getRandomArr(eventOffers[type], MAX_EVENT_OFFERS_LENGTH);
  }

  const event = {
    "type": type,
    "offers": offers
  };

  return event;
};
