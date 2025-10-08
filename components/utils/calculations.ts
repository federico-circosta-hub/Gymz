import { differenceInDays } from "date-fns";
import { Record, Month } from "../Model/Types";

export const calculateWeekPresence = (
  records: Record[],
  month: Month
): number => {
  if (!records || records.length === 0) return -1;

  const today = new Date();
  const currentMonthValue = today.toISOString().slice(0, 7); // "YYYY-MM"
  const recordsCount = records.length;
  let weekPresence = 0;

  if (month.value === "2023-05" || month.label === "ago") {
    weekPresence = recordsCount / 2;
  } else if (month.value === currentMonthValue) {
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const daysPassed = Math.max(1, differenceInDays(today, monthStart)); // almeno 1 giorno
    const weeksPassed = Math.ceil(daysPassed / 7);
    weekPresence = recordsCount / weeksPassed;
  } else {
    weekPresence = recordsCount / 4;
  }

  return Number(weekPresence.toFixed(1));
};
