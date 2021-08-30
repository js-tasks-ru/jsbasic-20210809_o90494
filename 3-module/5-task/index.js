function getMinMax(str) {
  let arrFiltered = (str.split(' ')).map(parseFloat).filter(item => !isNaN(item));
  let result = {};
  result.min = Math.min(...arrFiltered);
  result.max = Math.max(...arrFiltered);
  return result;
}
