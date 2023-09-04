export const calculatePercentage = (value, total) => {
  if (total === 0) {
    return 50;
  }
  return (value / total) * 100;
};
