export function convertToAccurateDay(inputdate = new Date()) {
  const date = new Date(inputdate);
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  return dateString;
}
