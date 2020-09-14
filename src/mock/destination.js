import {getRandomNumberInRange} from "./utils.js";
import {getRandomArrElem} from "./utils.js";
import {getRandomArr} from "./utils.js";

const MAX_DESCRIPTION_LENGTH = 5;
const MAX_PICTURES_LENGTH = 5;

const getRandomDescription = (descriptions, maxLenght) => {
  let descriptionArr = getRandomArr(descriptions, maxLenght);

  return descriptionArr.join(` `);
};

const getRandomPictureObj = (name) => {
  let picture = {
    "src": `http://picsum.photos/248/152?r=${Math.random()}`,
    "description": `${name} photo`
  };

  return picture;
};

const getRandomPicturesArr = (name, maxLenght) => {
  let picturesArr = [];
  let picturesArrLength = getRandomNumberInRange(1, maxLenght);

  for (let i = 0; i < picturesArrLength; i++) {
    let pictureObj = getRandomPictureObj(name);
    picturesArr.push(pictureObj);
  }
  return picturesArr;
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const names = [
  `Amsterdam`, `Chamonix`, `Geneva`,
];

export const getRandomDestination = () => {
  const name = getRandomArrElem(names);

  const destination = {
    "description": getRandomDescription(descriptions, MAX_DESCRIPTION_LENGTH),
    "name": name,
    "pictures": getRandomPicturesArr(name, MAX_PICTURES_LENGTH)
  };

  return destination;
};
