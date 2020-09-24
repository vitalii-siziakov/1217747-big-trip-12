// Информация о маршруте (доп.задание); Стоимость поездки (доп.задание)
import Abstract from "./abstract.js";
import {createTripInfo} from "../utils/trip-info.js";

const createTripInfoTemplate = (pointsArr) => {
  const {tripTitle, tripDates, tripCost} = createTripInfo(pointsArr);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripTitle}</h1>

        <p class="trip-info__dates">${tripDates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
      </p>
     </section>`
  );
};

export default class TripInfo extends Abstract {
  constructor(pointsArr) {
    super();
    this._pointsArr = pointsArr;
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsArr);
  }
}
