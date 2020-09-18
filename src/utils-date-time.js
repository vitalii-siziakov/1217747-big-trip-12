// Функция: возвращает строку дата и время в формате YYYY-MM-DdateTime00:00
export const getDateTime = (datetime) => {
  let dateTime = new Date(datetime);
  return (dateTime.toISOString()).slice(0, -8);
};

// Функция: возвращает строку дата и время в формате DD/MM/YY 00:00
export const getDateTimeShort = (datetime) => {
  let day = (datetime.toISOString()).slice(8, -14);
  let month = (datetime.toISOString()).slice(5, -17);
  let year = (datetime.toISOString()).slice(2, -20);

  return `${day}/${month}/${year} ${getTime(datetime)}`;
};

// Функция: возвращает строку дата в формате YYYY-MM-DD
export const getDate = (datetime) => {
  let dateTime = new Date(datetime);
  return (dateTime.toISOString()).slice(0, -14);
};

// Функция: возвращает строку месяц и день в формате: MON DD
export const getMonDay = (datetime) => {
  let dateTime = new Date(datetime);
  let day = (dateTime.toISOString()).slice(8, -14);

  let options = {
    month: `long`
  };
  let result = dateTime.toLocaleString(`en`, options);
  return `${(result.slice(0, 3)).toLocaleUpperCase()} ${day}`;
};

// Функция: возвращает строку время в формате: 00:00
export const getTime = (datetime) => {
  let dateTime = new Date(datetime);
  return (dateTime.toISOString()).slice(11, -8);
};

// Функция: добавляет 0 к дням/часам/минутам/секундам < 10
const addZeroToDateTime = (date) => {
  let result = date;
  if (date < 10) {
    result = `0${date}`;
  }
  return result;
};

// Функция: возвращает строку время (разница между одним и вторым) в формате: 00D 00H 00M
export const getDifferentTime = (startDate, endDate) => {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let delta = Math.abs(end - start) / 1000;
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  let result = ``;

  if (hours <= 0) {
    result = `${addZeroToDateTime(minutes)}M`;
  } else if (minutes <= 0) {
    result = `${addZeroToDateTime(hours)}H`;
  } else if (days <= 0) {
    result = `${addZeroToDateTime(hours)}H ${addZeroToDateTime(minutes)}M`;
  } else {
    result = `${addZeroToDateTime(days)}D ${addZeroToDateTime(hours)}H ${addZeroToDateTime(minutes)}M`;
  }
  return result;
};

// Функция: возвращает строку разница между двумя днями в формате (дней): 00
export const getDifferentDays = (startDate, endDate) => {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let delta = Math.abs(end - start) / 1000;
  let days = Math.floor(delta / 86400);
  return days;
};
