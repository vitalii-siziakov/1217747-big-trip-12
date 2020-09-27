import {renderElement, RenderPosition} from "../utils/render.js";
import Day from "../view/day.js";
import {createDaysArr, createDaysCountArr} from "../utils/day.js";
import Event from "../view/event.js";
import EventEdit from "../view/event-edit.js";
import TripInfo from "../view/trip-info.js";
import {getRandomPicturesArr, randomDescription} from "../mock/destination.js";


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

  _renderEvent(eventsList, point) {
    let event = new Event(point);
    let eventEdit = new EventEdit(JSON.parse(JSON.stringify(point)));

    const replacePointToForm = () => {
      const closeOtherEventEditElements = () => {
        let tripEvents = document.querySelector(`.trip-events`);
        let eventsEditSaveBtn = tripEvents.querySelectorAll(`.event__save-btn`);
        for (let i = 0; i < eventsEditSaveBtn.length; i++) {
          eventsEditSaveBtn[i].click();
        }
      };
      closeOtherEventEditElements();
      eventsList.replaceChild(eventEdit.getElement(), event.getElement());
    };

    event.setEditClickHandler(() => {
      replacePointToForm();
    });

    // Функции: технические операции
    const changePointFeatureValue = (pointObject, featureName, newValue) => {
      pointObject[featureName] = newValue;
    };

    const replaceOldEventEditElement = (eventListElement, eventElement, eventEditElement, pointObject) => {
      const newEventEditElement = new EventEdit(pointObject);
      renderElement(eventEditElement.getElement(), newEventEditElement.getElement(), RenderPosition.BEFOREBEGIN);
      eventEditElement.removeElement();
      addEventEditListeners(eventListElement, eventElement, newEventEditElement, pointObject);
    };

    // Функции: обработчики событий
    const listenerFormToPointReplace = (eventListElement, eventElement, eventEditElement) => {
      eventEditElement.getElement().querySelector(`form`).addEventListener(`submit`, function () {
        eventListElement.replaceChild(eventElement.getElement(), eventEditElement.getElement());
      });
    };

    const listenerTypeValue = (eventListElement, eventElement, eventEditElement, pointObject) => {
      let typeRadioInput = eventEditElement.getElement().querySelector(`.event__type-list`).querySelectorAll(`input`);

      for (let i = 0; i < typeRadioInput.length; i++) {
        typeRadioInput[i].addEventListener(`click`, function (evt) {
          changePointFeatureValue(pointObject, `type`, evt.target.value);
          changePointFeatureValue(pointObject, `offers`, []);
          replaceOldEventEditElement(eventListElement, eventElement, eventEditElement, pointObject);
        });
      }
    };

    const listenerDestinationValue = (eventListElement, eventElement, eventEditElement, pointObject) => {
      let destinationInput = eventEditElement.getElement().querySelector(`.event__input--destination`);

      destinationInput.addEventListener(`change`, function (evt) {
        pointObject.destination.name = evt.target.value;
        destinationInput.value = pointObject.destination.name;
        pointObject.destination.description = randomDescription();
        pointObject.destination.pictures = getRandomPicturesArr(pointObject.destination.name);
        replaceOldEventEditElement(eventListElement, eventElement, eventEditElement, pointObject);
      });
    };

    const listenerFavoriteValue = (eventListElement, eventElement, eventEditElement, pointObject) => {
      eventEditElement.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, function () {
        if (eventEditElement.getElement().querySelector(`.event__favorite-checkbox`).checked) {
          changePointFeatureValue(pointObject, `is_favorite`, true);
        } else {
          changePointFeatureValue(pointObject, `is_favorite`, false);
        }
        replaceOldEventEditElement(eventListElement, eventElement, eventEditElement, pointObject);
      });
    };

    const addEventEditListeners = (eventListElement, eventElement, eventEditElement, pointObject) => {
      listenerFormToPointReplace(eventListElement, eventElement, eventEditElement);
      listenerTypeValue(eventListElement, eventElement, eventEditElement, pointObject);
      listenerDestinationValue(eventListElement, eventElement, eventEditElement, pointObject);
      listenerFavoriteValue(eventListElement, eventElement, eventEditElement, pointObject);
    };

    addEventEditListeners(eventsList, event, eventEdit, point);

    renderElement(eventsList, event.getElement(), RenderPosition.BEFOREEND);
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
