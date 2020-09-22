import {renderElement} from "./utils.js";
import TripInfo from "./view/trip-info.js";
import MainMenu from "./view/main-menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sort.js";
import EventEdit from "./view/event-edit.js";
import Day from "./view/day.js";
import {createDaysArr, createDaysCountArr} from "./view/day.js";
import Event from "./view/event.js";
import {createLocalPointsArr} from "./mock/local-point.js";

const EVENT_COUNT = 30;

const renderEvent = (eventList, point) => {
  const event = new Event(point);
  const eventEdit = new EventEdit(point);

  const replacePointToForm = () => {
    eventList.replaceChild(eventEdit.getElement(), event.getElement());
  };

  const replaceFormToPoint = () => {
    eventList.replaceChild(event.getElement(), eventEdit.getElement());
  };

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
  });

  eventEdit.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  renderElement(eventList, event.getElement(), `beforeend`);
};

const renderDayEvents = (dayArr, count = 1) => {
  renderElement(siteEventsFragment, new Day(dayArr[0].date_from, count).getElement(), `beforeend`);

  for (let i = 0; i < dayArr.length; i++) {
    let tripDay = siteEventsFragment.querySelector(`.trip-days:last-child`);
    let tripDayItem = tripDay.querySelector(`.trip-days__item`);
    let eventsList = tripDayItem.querySelector(`.trip-events__list`);
    renderEvent(eventsList, dayArr[i]);
  }
};

const renderDaysEvents = (daysArr, countArr) => {
  for (let i = 0; i < daysArr.length; i++) {
    renderDayEvents(daysArr[i], countArr[i]);
  }
};

const localPointsEvents = createLocalPointsArr(EVENT_COUNT).sort((a, b) => (a.date_from) - (b.date_from));
const daysPointsArr = createDaysArr(localPointsEvents);
const daysCountArr = createDaysCountArr(localPointsEvents);

const siteBodyFragment = document.querySelector(`body`);

// Отрисовываем trip-main
const siteTripFragment = siteBodyFragment.querySelector(`.trip-main`);

renderElement(siteTripFragment, new TripInfo(localPointsEvents).getElement(), `afterbegin`);

const siteTripControls = siteTripFragment.querySelector(`.trip-controls`);
const siteTripControlsDividers = siteTripControls.querySelectorAll(`.visually-hidden`);
const mainMenuDivider = siteTripControlsDividers[0];
const filterDivider = siteTripControlsDividers[1];

renderElement(mainMenuDivider, new MainMenu().getElement(), `afterend`);
renderElement(filterDivider, new Filter().getElement(), `afterend`);

// Отрисовываем page-main
const sitePageFragment = siteBodyFragment.querySelector(`.page-main`);
const siteEventsFragment = sitePageFragment.querySelector(`.trip-events`);

renderElement(siteEventsFragment, new Sort().getElement(), `beforeend`);

renderDaysEvents(daysPointsArr, daysCountArr);
