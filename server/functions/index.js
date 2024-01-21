const addMinutesToTime = (timeString, minutesToAdd) => {
  let date = new Date(`1970-01-01 ${timeString}`);

  // Add the minutes
  date.setMinutes(date.getMinutes() + minutesToAdd);

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const findCategory = (createTime, appointmentTime) => {
  const timeDifference = Math.abs(
    new Date(`1970-01-01 ${createTime}`) -
      new Date(`1970-01-01 ${appointmentTime}`)
  );

  if(createTime !== appointmentTime) {
    return 'reserved'
  }

  return 'walk-in'
};

const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return hours * 60 + minutes;
}

module.exports = {
  addMinutesToTime,
  findCategory,
  convertTimeToMinutes
};
