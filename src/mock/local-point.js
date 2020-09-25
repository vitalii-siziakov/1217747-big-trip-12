import {getRandomNumberInRange, roundUp} from "../utils/common.js";
import {createNextDate} from "./date.js";
import {getRandomDestination} from "./destination.js";
import {getRandomEvent} from "./event.js";

const MIN_BASE_PRICE = 20;
const MAX_BASE_PRICE = 1500;
const ID_MIN_NUMBER = 0;
const ID_MAX_NUMBER = 10000;

const createIdArr = (count) => {
  let idArr = [];

  for (let i = 0; i < count; i++) {
    let id = getRandomNumberInRange(ID_MIN_NUMBER, ID_MAX_NUMBER);
    if (idArr.includes(id)) {
      i--;
    } else {
      idArr.push(id);
    }
  }
  return idArr;
};

const createLocalPoint = (startDate = new Date(), id = 0) => {

  let dateFrom = createNextDate(startDate);
  let dateTo = createNextDate(dateFrom);
  let evt = getRandomEvent();
  let basePrice = getRandomNumberInRange(MIN_BASE_PRICE, MAX_BASE_PRICE);

  const localPoint = {
    "base_price": roundUp(basePrice, 10),
    "date_from": dateFrom,
    "date_to": dateTo,
    "destination": getRandomDestination(),
    "id": id,
    "is_favorite": Boolean(getRandomNumberInRange(0, 1)),
    "offers": evt.offers,
    "type": evt.type
  };
  return localPoint;
};

export const createLocalPointsArr = (count) => {
  let idArr = createIdArr(count);
  let localPointArr = [];

  for (let i = 0; i < count; i++) {
    if (localPointArr.length) {
      const startDate = localPointArr[localPointArr.length - 1].date_to;
      localPointArr.push(createLocalPoint(startDate, idArr[i]));
    } else {
      localPointArr.push(createLocalPoint(new Date(), idArr[i]));
    }
  }
  return localPointArr;
};
