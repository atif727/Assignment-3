const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const subtractTimes = (
  startTime: string,
  endTime: string,
): number => {
  const startDate = parseTime(startTime);
  const endDate = parseTime(endTime);

  // Calculate the difference in milliseconds
  let difference = endDate.getTime() - startDate.getTime();

  // If the difference is negative, it means endTime is on the next day
  if (difference < 0) {
    difference += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
  }

  // Convert the difference from milliseconds to hours (including fractional hours)
  const hours = difference / (1000 * 60 * 60);

  return hours;
};

export default subtractTimes;
