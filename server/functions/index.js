const addMinutesToTime = (timeString, minutesToAdd) => {
  let date = new Date(`1970-01-01 ${timeString}`);

  // Add the minutes
  date.setMinutes(date.getMinutes() + minutesToAdd);

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

module.exports = {
  addMinutesToTime,
};
