// Функция: возвращает случайное число в интервале (включительно)
export const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция: возвращает случайный элемент массива
export const getRandomArrElem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция: возвращает массив строк длиной не более переданного с уникальными значениями
export const getRandomArr = function (arr, maxLenght = arr.length) {
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
