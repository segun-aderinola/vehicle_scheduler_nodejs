const convertTo24HourFormat = (time) => {
  const [rawTime, amPm] = time.split(" ");
  let [hours, minutes] = rawTime.split(":").map(Number);

  if (amPm === "PM" && hours !== 12) {
    hours += 12;
  } else if (amPm === "AM" && hours === 12) {
    hours = 0;
  }

  // Pad single-digit hours/minutes with leading zeros
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const verifyDate = (date1, date2) => {
  const splitDate1 = date1.split(",");
  const splitDate2 = date2.split(",");

  const startDate = new Date(splitDate1[0]);
  const endDate = new Date(splitDate2[0]);

//   const splitTime = splitDate1[1].split("");

  // Convert time1 to 24-hour format
  const convertedTime1 = convertTo24HourFormat(splitDate1[1]);

  // Convert time2 to 24-hour format
  const convertedTime2 = convertTo24HourFormat(splitDate2[1]);

  if ((endDate < startDate) || (convertedTime1 > convertedTime2)) {
    throw new Error("End Date can not be less than start date");
  }


  return true;
};

module.exports = {
  verifyDate,
};
