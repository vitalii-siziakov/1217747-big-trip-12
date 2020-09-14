import {getRandomNumberInRange} from "./utils.js";
import {roundUp} from "./utils.js";
import {createNextDate} from "./date.js";
import {getRandomDestination} from "./destination.js";
import {getRandomEvent} from "./event.js";

const MIN_BASE_PRICE = 20;
const MAX_BASE_PRICE = 5000;

const createLocalPoint = (startDate = new Date()) => {

  let dateFrom = createNextDate(startDate);
  let dateTo = createNextDate(dateFrom);
  let event = getRandomEvent();
  let basePrice = getRandomNumberInRange(MIN_BASE_PRICE, MAX_BASE_PRICE);

  const localPoint = {
    "base_price": roundUp(basePrice, 10),
    "date_from": dateFrom,
    "date_to": dateTo,
    "destination": getRandomDestination(),
    "is_favorite": Boolean(getRandomNumberInRange(0, 1)),
    "offers": event.offers,
    "type": event.type
  };
  return localPoint;
};

export const createLocalPointsArr = (count) => {
  let localPointArr = [];

  for (let i = 0; i < count; i++) {
    if (localPointArr.length) {
      const startDate = localPointArr[localPointArr.length - 1].date_to;
      localPointArr.push(createLocalPoint(startDate));
    } else {
      localPointArr.push(createLocalPoint());
    }
  }
  return localPointArr;
};

