// Функция: рендерит элементы на страницу
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Функция: возвращает случайное число в интервале (включительно)
export const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция: возвращает случайный элемент массива
export const getRandomArrElem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция: возвращает массив строк длиной не более переданного с уникальными значениями
export const getRandomArr = (arr, maxLenght = arr.length) => {
  let newArr = [];
  let newArrLength = getRandomNumberInRange(1, maxLenght);

  for (let i = 0; i < newArrLength; i++) {
    let newArrItem = arr[getRandomNumberInRange(0, arr.length - 1)];
    if (newArr.includes(newArrItem)) {
      i--;
    } else {
      newArr.push(newArrItem);
    }
  }
  return newArr;
};

// Функция: округление в меньшую сторону c заданием точности
export const roundDown = (number, precision) => {
  return Math.floor(number / precision) * precision;
};

// Функция: округление в большую сторону c заданием точности
export const roundUp = (number, precision) => {
  return Math.ceil(number / precision) * precision;
};

// Функция: делает первую букву слова/предложения заглавной
export const capitalizeFirstCharacter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

// Функция: возвращает последнее слово в предложении
export const getLastWord = (sentence) => {
  let splitResult = sentence.split(` `);
  let lastWord = splitResult [splitResult.length - 1];
  return lastWord;
};
