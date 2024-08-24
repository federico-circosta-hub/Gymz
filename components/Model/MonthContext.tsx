import React, { createContext, useContext, useState } from "react";
import { Month } from "./Types";

const MonthContext = createContext({});

export const MonthProvider = ({ children }) => {
  const obtainCurrentMonth = () => {
    const date = new Date();
    let currentMont = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    switch (currentMont) {
      case 1:
        return { label: "gen", value: currentYear + "-01" };
      case 2:
        return { label: "feb", value: currentYear + "-02" };
      case 3:
        return { label: "mar", value: currentYear + "-03" };
      case 4:
        return { label: "apr", value: currentYear + "-04" };
      case 5:
        return { label: "mag", value: currentYear + "-05" };
      case 6:
        return { label: "giu", value: currentYear + "-06" };
      case 7:
        return { label: "lug", value: currentYear + "-07" };
      case 8:
        return { label: "ago", value: currentYear + "-08" };
      case 9:
        return { label: "set", value: currentYear + "-09" };
      case 10:
        return { label: "ott", value: currentYear + "-10" };
      case 11:
        return { label: "nov", value: currentYear + "-11" };
      case 12:
        return { label: "dic", value: currentYear + "-12" };
    }
  };
  const [month, setMonth] = useState(obtainCurrentMonth());

  const updateMonth = (newMonth: Month) => {
    setMonth(newMonth);
  };

  return (
    <MonthContext.Provider value={{ month, updateMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = () => {
  return useContext(MonthContext);
};
