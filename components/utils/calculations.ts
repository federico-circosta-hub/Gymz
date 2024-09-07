import { differenceInDays } from "date-fns";
import { Month, Record } from "../Model/Types";

export const calculateWeekPresence = (
  Records: Record[],
  month: Month
): number => {
  const currentDate = new Date();
  let weekPresence: number;
  if (!Records) return -1;
  if (month.value === "2023-05" || month.label === "ago") {
    weekPresence = Records.length / 2;
  } else if (currentDate.toISOString().toString() === month.value) {
    const monthBeginnigDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const daysDifference = differenceInDays(currentDate, monthBeginnigDate);
    const weeksDifference = daysDifference < 7 ? 0 : daysDifference / 7;
    weekPresence =
      weeksDifference > 0 ? Records.length / weeksDifference : Records.length;
  } else {
    weekPresence = Records.length / 4;
  }
  return Number(weekPresence.toFixed(1));
};
