/* eslint-disable react/no-danger */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const remToPx = (rem) => {
  if (typeof window === `undefined`) {
    return rem;
  }

  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const capitalizeString = (string) => {
  if (!string?.charAt(0)) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const spliceFromStateArray = (array, item) => {
  if (!array?.[0] || !array?.includes(item)) {
    return array;
  }

  const arrayClone = JSON.parse(JSON.stringify(array));

  arrayClone.splice(array.indexOf(item), 1);

  return arrayClone;
};

export const spliceFromStateArrayByProperty = (array, key, value) => {
  if (!array?.[0]) {
    return array;
  }

  const item = array?.find((arrayItem) => arrayItem?.[key] === value);

  if (!item) {
    return array;
  }

  return spliceFromStateArray(array, item);
};

export const spliceFromStateArrayByIndex = (array, index) => {
  if (!array?.[0] || !array?.[index]) {
    return array;
  }

  const arrayClone = JSON.parse(JSON.stringify(array));

  arrayClone.splice(index, 1);

  return arrayClone;
};

export const getRandomIntByRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const sortArrayByNumberProperty = (array, property) => {
  if (!array?.[0]?.[property]) {
    return array;
  }

  return array.sort((a, b) => {
    const itemA = a?.[property] || 9999999999;
    const itemB = b?.[property] || 9999999999;

    if (itemA < itemB) {
      return -1;
    }

    if (itemA > itemB) {
      return 1;
    }

    return 0;
  });
};

export const splitCamelCase = (word) =>
  word.replace(/([A-Z])/g, ` $1`).replace(/^./, (str) => str.toUpperCase());

export const arrayHasDuplicateValues = (array) =>
  array.length !== new Set(array).size;
