import {getRandomArrElem, getRandomArr} from "../utils.js";

const MAX_EVENT_OFFERS_LENGTH = 5;

export const eventOffers = {
  "taxi": [
    {
      "title": `Order Uber`,
      "price": 20
    }
  ],
  "bus": [],
  "train": [],
  "ship": [],
  "transport": [],
  "drive": [
    {
      "title": `Rent a car`,
      "price": 200
    }
  ],
  "flight": [
    {
      "title": `Add luggage`,
      "price": 50
    },
    {
      "title": `Switch to comfort`,
      "price": 80
    },
    {
      "title": `Add meal`,
      "price": 15
    },
    {
      "title": `Choose seats`,
      "price": 5
    },
    {
      "title": `Travel by train`,
      "price": 40
    }
  ],
  "check-in": [
    {
      "title": `Add breakfast`,
      "price": 50
    }
  ],
  "sightseeing": [
    {
      "title": `Book tickets`,
      "price": 40
    },
    {
      "title": `Lunch in city`,
      "price": 30
    }
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
    offers = getRandomArr(eventOffers[type]);
  }

  const evt = {
    "type": type,
    "offers": offers
  };

  return evt;
};
