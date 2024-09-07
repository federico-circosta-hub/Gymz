type monthForSelect = {
  label: string;
  value: string;
};

export const MonthArray = (
  startYear: number,
  startMonth: number
): monthForSelect[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const result = [];
  for (let year = startYear; year <= currentYear; year++) {
    let start = year === startYear ? startMonth : 1;
    let end = year === currentYear ? currentMonth : 12;
    for (let month = start; month <= end; month++) {
      const monthStr = month.toString().padStart(2, "0");
      const label = new Date(year, month - 1)
        .toLocaleString("default", { month: "short" })
        .toLowerCase();
      result.push({
        label: label,
        value: `${year}-${monthStr}`,
      });
    }
  }
  return result.reverse();
};
