import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useMonth } from "../Model/MonthContext";
import { primary, secondary } from "../utils/Colors";
import { MonthArray } from "../utils/DateManipulation";
import { MonthContextType } from "../Model/Types";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import MonthGrid from "./MonthGrid";
import LogoLoading from "../LoadingStuff/LogoLoading";
import { fetchDateKeys, fetchRecordByYear } from "../Model/MongoDB/pipelines";

const SelectMonth = ({ select }) => {
  const { month, updateMonth } = useMonth() as MonthContextType;
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [recordsByYear, setRecordsByYear] = useState([]);

  const getDateKeys = async () => {
    try {
      const response = await fetchDateKeys("workoutMonths");
      if (!response.error) {
        const keys: string[] = response.documents[0].uniqueKeys;
        setYears(keys);
      } else {
        Alert.alert("Errore durante il recupero delle date disponibili");
      }
    } catch (err) {
      console.error("Errore nella richiesta: ", err);
    }
  };

  const getRecordByYear = async () => {
    try {
      const response = await fetchRecordByYear(
        "workoutMonths",
        selectedYear.toString()
      );
      if (!response.error) {
        setRecordsByYear(response.documents);
      } else {
        Alert.alert(
          "Errore durante il recupero dei record del " + selectedYear
        );
      }
    } catch (err) {
      console.error("Errore nella richiesta: ", err);
    }
  };

  useEffect(() => {
    getDateKeys();
  }, []);

  useEffect(() => {
    getRecordByYear();
  }, [selectedYear]);

  const handleYearChange = (direction: number) => {
    setSelectedYear((prevYear) => prevYear + direction);
  };

  if (years.length === 0) return <LogoLoading imgSize={125} />;

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          padding: 10,
          alignSelf: "center",
        }}
      >
        <Pressable
          onPress={() => handleYearChange(-1)}
          disabled={selectedYear === years[0]}
        >
          <Icon
            name="chevron-back-outline"
            size={35}
            color={selectedYear === years[0] ? "lightgrey" : primary}
          />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {selectedYear}
          </Text>
        </View>
        <Pressable
          onPress={() => handleYearChange(1)}
          disabled={selectedYear === years[years.length - 1]}
        >
          <Icon
            name="chevron-forward-outline"
            size={35}
            color={
              selectedYear === years[years.length - 1] ? "lightgrey" : primary
            }
          />
        </Pressable>
      </View>

      <MonthGrid
        data={recordsByYear}
        selectedYear={selectedYear}
        select={select}
      />

      {/*       <FlatList
        style={{ width: "100%", marginTop: 20 }}
        data={MonthArray(2023, 5)}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "93%",
                backgroundColor:
                  month.value === item.value ? primary : secondary,
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
      /> */}
    </View>
  );
};

export default SelectMonth;
