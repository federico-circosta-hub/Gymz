import { View, Text, FlatList } from "react-native";
import { useMonth } from "./Model/MonthContext";
import { primary, secondary } from "./utils/Colors";
import { MonthArray } from "./utils/DateManipulation";
import { MonthContextType } from "./Model/Types";

const SelectMonth = (props) => {
  const { month, updateMonth } = useMonth() as MonthContextType;

  return (
    <FlatList
      style={{ width: "100%", marginTop: 20 }}
      data={MonthArray(2023, 5)}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              width: "93%",
              backgroundColor: month.value === item.value ? primary : secondary,
              padding: 25,
              margin: 10,
              borderRadius: 25,
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: 600, color: "white" }}
              onPress={() => {
                props.select(false);
                updateMonth(item);
              }}
            >
              {`${item.label} ${item.value.split("-")[0]}`}
            </Text>
          </View>
        );
      }}
      keyExtractor={(item) => item.value}
    />
  );
};

export default SelectMonth;
