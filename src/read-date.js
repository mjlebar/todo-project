function readDate(input) {
  const parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
} //took this almost exactly from https://stackoverflow.com/questions/2488313/javascripts-getdate-returns-wrong-date. Honestly can't say I understand how the .match method is being used here but I respect it

export { readDate };
