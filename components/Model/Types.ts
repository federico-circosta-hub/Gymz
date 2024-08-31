export type Course = {
  date: string;
  course: string;
  slim: number;
  power: number;
  color: string;
};

export type Record = {
  corso: string;
  data: string;
  istruttore: string;
  power: number;
  slim: number;
};

export type Month = {
  label: string;
  value: string;
};

export type MonthContextType = {
  month: Month;
  updateMonth: (item: Month) => void;
};
