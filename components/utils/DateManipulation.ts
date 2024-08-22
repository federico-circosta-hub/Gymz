export const DATE_BIMESTER = [
  "gen/feb",
  "gen/feb",
  "mar/apr",
  "mar/apr",
  "mag/giu",
  "mag/giu",
  "lug/ago",
  "lug/ago",
  "set/ott",
  "set/ott",
  "nov/dic",
  "nov/dic",
];

export const endpointResolver = (currentMont: number, currentYear: number) => {
  switch (currentMont) {
    case 5:
      return { label: "mag/giu", value: currentYear + "-3" };
    case 7:
      return { label: "lug/ago", value: currentYear + "-4" };
    case 9:
      return { label: "set/ott", value: currentYear + "-5" };
    case 11:
      return { label: "nov/dic", value: currentYear + "-6" };
    case 1:
      return { label: "gen/feb", value: currentYear + "-1" };
    case 3:
      return { label: "mar/apr", value: currentYear + "-2" };
    case 6:
      return { label: "mag/giu", value: currentYear + "-3" };
    case 8:
      return { label: "lug/ago", value: currentYear + "-4" };
    case 10:
      return { label: "set/ott", value: currentYear + "-5" };
    case 12:
      return { label: "nov/dic", value: currentYear + "-6" };
    case 2:
      return { label: "gen/feb", value: currentYear + "-1" };
    case 4:
      return { label: "mar/apr", value: currentYear + "-2" };
  }
};

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
