import {renderElement, RenderPosition} from "./utils/render.js";
import MainMenu from "./view/main-menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sort.js";
import {createLocalPointsArr} from "./mock/local-point.js";
import Trip from "./presenter/trip.js";

const EVENT_COUNT = 30;

const localPointsEvents = createLocalPointsArr(EVENT_COUNT).sort((a, b) => (a.date_from) - (b.date_from));

const siteBodyFragment = document.querySelector(`body`);

// Отрисовываем trip-main
const siteTripFragment = siteBodyFragment.querySelector(`.trip-main`);
const siteTripControls = siteTripFragment.querySelector(`.trip-controls`);
const siteTripControlsDividers = siteTripControls.querySelectorAll(`.visually-hidden`);
const mainMenuDivider = siteTripControlsDividers[0];
const filterDivider = siteTripControlsDividers[1];

renderElement(mainMenuDivider, new MainMenu().getElement(), `afterend`);
renderElement(filterDivider, new Filter().getElement(), `afterend`);

// Отрисовываем page-main
const sitePageFragment = siteBodyFragment.querySelector(`.page-main`);
const siteEventsFragment = sitePageFragment.querySelector(`.trip-events`);

renderElement(siteEventsFragment, new Sort().getElement(), RenderPosition.BEFOREEND);

new Trip(siteTripFragment, siteEventsFragment, localPointsEvents).renderTripInfoDaysEvents();
