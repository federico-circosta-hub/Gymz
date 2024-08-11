import React from "react";
import { View, Text, FlatList } from "react-native";
import { useBimester } from "./Model/BimesterContext";

const Bimesters = [
  { label: "mag/giu", value: "2023-3" },
  { label: "lug/ago", value: "2023-4" },
  { label: "set/ott", value: "2023-5" },
  { label: "nov/dic", value: "2023-6" },
  { label: "gen/feb", value: "2024-1" },
  { label: "mar/apr", value: "2024-2" },
  { label: "mag/giu", value: "2024-3" },
  { label: "lug/ago", value: "2024-4" },
  { label: "set/ott", value: "2024-5" },
  { label: "nov/dic", value: "2024-6" },
  { label: "gen/feb", value: "2025-1" },
  { label: "mar/apr", value: "2025-2" },
];

const SelectBim = (props) => {
  const { bimester, updateBimester } = useBimester();

  return (
    <FlatList
      style={{ width: "100%" }}
      data={Bimesters}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              width: "93%",
              backgroundColor: bimester === item ? "#ffe4c4" : "#fff8dc",
              padding: 25,
              margin: 10,
              borderRadius: 25,
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: 600 }}
              onPress={() => {
                props.select(false);
                updateBimester(item);
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

export default SelectBim;
