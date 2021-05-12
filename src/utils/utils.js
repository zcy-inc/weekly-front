export const isNumeric = (value) => {
  if (typeof value === 'object') {
    return false;
  } else {
    return !Number.isNaN(Number(value));
  }
};
