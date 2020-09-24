import {getMonDay} from "./utils-date-time.js";

const createCityTripArr = (pointsArr) => {
  let citiesArr = [];

  for (let i = 0; i < pointsArr.length; i++) {
    let evt = pointsArr[i];
    let city = evt.destination.name;
    if (i === 0) {
      citiesArr.push(city);
    } else {
      if (pointsArr[i - 1].destination.name !== city) {
        citiesArr.push(city);
      }
    }
  }
  return citiesArr;
};

const createCitiesInfoTitle = (pointsArr) => {
  let citiesArr = createCityTripArr(pointsArr);
  let result = ``;
  if (citiesArr.length <= 3) {
    result = citiesArr.join(` &mdash; `);
  } else {
    result = `${citiesArr[0]} &mdash;... &mdash; ${citiesArr[citiesArr.length - 1]}`;
  }
  return result;
};

const getStartEndTripDates = (pointsArr) => {
  if (pointsArr.length > 1) {
    return `${getMonDay(pointsArr[0].date_from)}&nbsp;&mdash;&nbsp;${getMonDay(pointsArr[pointsArr.length - 1].date_to)}`;
  } else {
    return `${getMonDay(pointsArr[0].date_from)}&nbsp;&mdash;&nbsp;${getMonDay(pointsArr[0].date_to)}`;
  }
};

const countTripPointCost = (point) => {
  let base = point.base_price;
  let offers = 0;

  if (point.offers.length > 0) {
    for (let i = 0; i < point.offers.length; i++) {
      offers += point.offers[i].price;
    }
  }
  return base + offers;
};

const countTripPointsCost = (pointsArr) => {
  let tripPointsCost = 0;

  for (let i = 0; i < pointsArr.length; i++) {
    tripPointsCost = tripPointsCost + countTripPointCost(pointsArr[i]);
  }

  return tripPointsCost;
};

export const createTripInfo = (pointsArr) => {
  const tripInfo = {
    "tripTitle": createCitiesInfoTitle(pointsArr),
    "tripDates": getStartEndTripDates(pointsArr),
    "tripCost": countTripPointsCost(pointsArr)
  };
  return tripInfo;
};
