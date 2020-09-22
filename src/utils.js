// Функция: рендерит позицию элемента на странице
export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`
};

// Функция: рендерит элементы на страницу
export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Функция: создает элементы на страницы
// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
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
