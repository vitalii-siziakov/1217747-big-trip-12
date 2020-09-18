import {render} from "./utils.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDayTemplate, createDaysArr, createDaysCountArr} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";
import {createLocalPointsArr} from "./mock/local-point.js";

const EVENT_COUNT = 30;

const renderDayEvents = (dayArr, count = 1) => {
  render(siteEventsFragment, createDayTemplate(dayArr[0].date_from, count), `beforeend`);

  for (let i = 0; i < dayArr.length; i++) {
    let tripDay = siteEventsFragment.querySelector(`.trip-days:last-child`);
    let tripDayItem = tripDay.querySelector(`.trip-days__item`);
    let eventsList = tripDayItem.querySelector(`.trip-events__list`);
    render(eventsList, createEventTemplate(dayArr[i]), `beforeend`);
  }
};

const renderDaysEvents = (daysArr, countArr) => {
  for (let i = 0; i < daysArr.length; i++) {
    renderDayEvents(daysArr[i], countArr[i]);
  }
};

const localPointsArr = createLocalPointsArr(EVENT_COUNT).sort((a, b) => (a.date_from) - (b.date_from));
const localPointEventEdit = localPointsArr[0];
const localPointsEvents = localPointsArr.slice(1);
const daysPointsArr = createDaysArr(localPointsEvents);
const daysCountArr = createDaysCountArr(localPointsEvents);

const siteBodyFragment = document.querySelector(`body`);

// Отрисовываем trip-main
const siteTripFragment = siteBodyFragment.querySelector(`.trip-main`);

render(siteTripFragment, createTripInfoTemplate(localPointsEvents), `afterbegin`);

const siteTripControls = siteTripFragment.querySelector(`.trip-controls`);
const siteTripControlsDividers = siteTripControls.querySelectorAll(`.visually-hidden`);
const mainMenuDivider = siteTripControlsDividers[0];
const filterDivider = siteTripControlsDividers[1];

render(mainMenuDivider, createMainMenuTemplate(), `afterend`);
render(filterDivider, createFilterTemplate(), `afterend`);

// Отрисовываем page-main
const sitePageFragment = siteBodyFragment.querySelector(`.page-main`);
const siteEventsFragment = sitePageFragment.querySelector(`.trip-events`);

render(siteEventsFragment, createSortTemplate(), `beforeend`);
render(siteEventsFragment, createEventEditTemplate(localPointEventEdit), `beforeend`);

renderDaysEvents(daysPointsArr, daysCountArr);
