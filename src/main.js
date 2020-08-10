import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyFragment = document.querySelector(`body`);

// Отрисовываем trip-main
const siteTripFragment = siteBodyFragment.querySelector(`.trip-main`);

render(siteTripFragment, createTripInfoTemplate(), `afterbegin`);

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
render(siteEventsFragment, createEventEditTemplate(), `beforeend`);
render(siteEventsFragment, createDayTemplate(), `beforeend`);

const eventsList = siteEventsFragment.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsList, createEventTemplate(), `beforeend`);
}
