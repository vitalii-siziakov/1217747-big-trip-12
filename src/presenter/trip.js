import {renderElement, RenderPosition} from "../utils/render.js";
import Day from "../view/day.js";
import {createDaysArr, createDaysCountArr} from "../utils/day.js";
import Event from "../view/event.js";
import EventEdit from "../view/event-edit.js";
import TripInfo from "../view/trip-info.js";

export default class Trip {
  constructor(siteTripFragment, siteEventsFragment, localPointsEvents) {
    this._siteTripFragment = siteTripFragment;
    this._siteEventsFragment = siteEventsFragment;
    this._localPointsEvents = localPointsEvents;
    this._daysPointsArr = createDaysArr(this._localPointsEvents);
    this._daysCountArr = createDaysCountArr(this._localPointsEvents);
  }

  _renderTripInfo(siteTripFragment, localPointsEvents) {
    renderElement(siteTripFragment, new TripInfo(localPointsEvents).getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderEvent(eventList, point) {
    const event = new Event(point);
    const eventEdit = new EventEdit(point);

    const replacePointToForm = () => {
      eventList.replaceChild(eventEdit.getElement(), event.getElement());
    };

    const replaceFormToPoint = () => {
      eventList.replaceChild(event.getElement(), eventEdit.getElement());
    };

    event.setEditClickHandler(() => {
      replacePointToForm();
    });

    eventEdit.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    renderElement(eventList, event.getElement(), RenderPosition.BEFOREEND);
  }

  _renderDayEvents(dayArr, count = 1) {
    renderElement(this._siteEventsFragment, new Day(dayArr[0].date_from, count).getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < dayArr.length; i++) {
      let tripDay = this._siteEventsFragment.querySelector(`.trip-days:last-child`);
      let tripDayItem = tripDay.querySelector(`.trip-days__item`);
      let eventsList = tripDayItem.querySelector(`.trip-events__list`);
      this._renderEvent(eventsList, dayArr[i]);
    }
  }

  _renderDaysEvents(daysArr, countArr) {
    for (let i = 0; i < daysArr.length; i++) {
      this._renderDayEvents(daysArr[i], countArr[i]);
    }
  }

  renderTripInfoDaysEvents() {
    this._renderTripInfo(this._siteTripFragment, this._localPointsEvents);
    this._renderDaysEvents(this._daysPointsArr, this._daysCountArr);
  }
}
