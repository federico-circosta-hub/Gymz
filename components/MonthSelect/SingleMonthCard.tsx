import { Skeleton } from "@rneui/themed";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { calculateWeekPresence } from "../utils/calculations";
import { primary } from "../utils/Colors";
import { useMonth } from "../Model/MonthContext";

const SingleMonthCard = ({ index, data, selectedYear, select }) => {
  const { updateMonth } = useMonth() as {
    updateMonth: (newMonth: { label: string; value: string }) => void;
  };
  const calculateRecordStats = () => {
    const dataObject = data.reduce((acc, obj) => {
      const k = Object.keys(obj)[0];
      acc[k] = obj[k];
      return acc;
    }, {});
    const monthStr = index.toString().padStart(2, "0");
    const label = new Date(selectedYear, index)
      .toLocaleString("default", { month: "short" })
      .toLowerCase();
    const key = `${selectedYear}-${(index + 1).toString().padStart(2, "0")}`;
    return calculateWeekPresence(dataObject[key], {
      label,
      value: `${selectedYear}-${monthStr}`,
    });
  };

  if ((!index && index !== 0) || data.length === 0)
    return (
      <Skeleton
        style={{ margin: 5, width: "30%", height: "30%", aspectRatio: 0.9 }}
        //LinearGradientComponent={LinearGradient}
        animation="wave"
      />
    );
  return (
    <View
      style={[
        {
          width: "30%",
          height: "30%",
          aspectRatio: 0.9,
          margin: 5,
          backgroundColor:
            new Date().getMonth() === index &&
            new Date().getFullYear() === selectedYear
              ? primary
              : calculateRecordStats() < 0
              ? "#D3D3D3"
              : calculateRecordStats() < 2
              ? "#ffa3a3"
              : calculateRecordStats() < 3
              ? "#ffff00"
              : calculateRecordStats() < 4
              ? "#b3ffb9"
              : "gold",
          borderRadius: 10,
          padding: 10,
        },
        styles.elevation,
      ]}
    >
      <Pressable
        style={{ gap: 15, alignItems: "center" }}
        onPress={() => {
          const monthStr = (index + 1).toString().padStart(2, "0");
          const label = format(new Date(selectedYear, index), "MMM", {
            locale: it,
          }).toLowerCase();
          const value = `${selectedYear}-${monthStr}`;
          updateMonth({ label, value });
          select(false);
        }}
        disabled={new Date(selectedYear, index, 1) > new Date()}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
            color:
              new Date().getMonth() === index &&
              new Date().getFullYear() === selectedYear
                ? "white"
                : "black",
          }}
        >
          {format(new Date(1970, index, 1), "MMMM", { locale: it })}
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {calculateRecordStats() < 0 ? (
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: 600,
              }}
            >
              N/A
            </Text>
          ) : (
            <Image
              source={
                new Date().getMonth() === index &&
                new Date().getFullYear() === selectedYear
                  ? require("../../assets/wip.png")
                  : calculateRecordStats() < 0
                  ? ""
                  : calculateRecordStats() < 2
                  ? require("../../assets/death.png")
                  : calculateRecordStats() < 3
                  ? require("../../assets/warning.png")
                  : calculateRecordStats() < 4
                  ? require("../../assets/checked.png")
                  : require("../../assets/comic.png")
              }
              style={{ width: 30, height: 30 }}
            />
          )}
        </View>
        {calculateRecordStats() > 0 && (
          <Text
            style={{
              fontSize: 8,
              color:
                new Date().getMonth() === index &&
                new Date().getFullYear() === selectedYear
                  ? "white"
                  : "black",
            }}
          >
            Media settimanale: {calculateRecordStats()}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  elevation: {
    shadowColor: primary,
    elevation: 6,
  },
});

export default SingleMonthCard;
