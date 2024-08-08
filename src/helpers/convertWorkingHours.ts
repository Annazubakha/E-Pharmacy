export const convertWorkingHours = (time: string): number => {
  const [hours] = time.split(":");
  return Number(hours);
};
