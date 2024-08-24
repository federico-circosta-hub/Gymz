import { View, Text, StyleSheet } from "react-native";
import Message from "./Message";
import { primary } from "../utils/Colors";

function roundDec(n: number): string {
  const r = Math.round(n * 10) / 10;
  return r % 1 === 0 ? r.toFixed(0) : r.toFixed(1);
}

const HomeStats = ({ Records, weekPresence }) => {
  return (
    <View
      style={[styles.card, styles.elevation]}
      /*  style={{
        display: "flex",
        flexDirection: "row",
        height: 100,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 12,
        marginBottom: 18,
        borderRadius: 20,

        shadowColor: primary,
        elevation: 30,
        //borderColor: primary,
      }} */
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Message frequency={weekPresence} presence={Records.length} />
      </View>
      <View
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
            }}
          >
            Totale workout:{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: primary,
            }}
          >
            {Records.length}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Media settimanale:{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: primary,
            }}
          >
            {Records.length > 3 ? roundDec(weekPresence) : "NC"}
          </Text>
        </View>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    //borderRadius: 8,
    height: 100,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
    marginBottom: 18,
    borderRadius: 20,
  },
  elevation: {
    shadowColor: primary,
    elevation: 12,
  },
});

export default HomeStats;
