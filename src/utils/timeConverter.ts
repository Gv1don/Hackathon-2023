export function hoursFromMilliseconds(milliseconds: number) {
  return Math.floor(milliseconds / 3600000000);
}

export function minutesFromMilliseconds(milliseconds: number) {
  return Math.floor(milliseconds / 60000000);
}
