import React, { createContext, useContext, useState } from "react";

const BimesterContext = createContext();

export const BimesterProvider = ({ children }) => {
  const obtainCurrentBimester = () => {
    const date = new Date();
    let currentMont = date.getMonth() + 1;
    let currentYear = date.getFullYear();
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
  const [bimester, setBimester] = useState(obtainCurrentBimester());

  const updateBimester = (newBimester) => {
    setBimester(newBimester);
  };

  return (
    <BimesterContext.Provider value={{ bimester, updateBimester }}>
      {children}
    </BimesterContext.Provider>
  );
};

export const useBimester = () => {
  return useContext(BimesterContext);
};
