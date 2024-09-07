import { View } from "react-native";
import SingleMonthCard from "./SingleMonthCard";

const MonthGrid = ({ data, selectedYear, select }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {[...Array(12)].map((_, index) => (
        <SingleMonthCard
          key={index}
          index={index}
          data={data}
          selectedYear={selectedYear}
          select={select}
        />
      ))}
    </View>
  );
};

export default MonthGrid;
