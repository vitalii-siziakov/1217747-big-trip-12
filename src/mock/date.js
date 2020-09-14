import {getRandomNumberInRange} from "./utils.js";
import {roundDown} from "./utils.js";

const MAX_HOURS_ADD = 24;
const MAX_MINUTES_ADD = 60;

export const createNextDate = (startDate = new Date()) => {
  let newDate = new Date(startDate);

  newDate.setHours(newDate.getHours() + getRandomNumberInRange(0, MAX_HOURS_ADD));
  newDate.setMinutes(newDate.getMinutes() + getRandomNumberInRange(0, MAX_MINUTES_ADD));
  newDate.setMinutes(roundDown(newDate.getMinutes(), 5));

  return newDate;
};

