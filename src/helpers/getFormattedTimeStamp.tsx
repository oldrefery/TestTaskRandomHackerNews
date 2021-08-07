export const getFormattedTimeStamp = (time: number): string => {
  const date = new Date(time);

  return date.toLocaleString();
};
