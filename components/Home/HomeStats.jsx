import { View, Text } from "react-native";
import Message from "./Message";
import { primary } from "../utils/Colors";

function roundDec(n) {
  const r = Math.round(n * 10) / 10;
  return r % 1 === 0 ? r.toFixed(0) : r.toFixed(1);
}

const HomeStats = ({ Records, weekPresence }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: 100,
        /*         backgroundColor:
          Records.length < 4
            ? "lightgray"
            : weekPresence < 2
            ? "#ffa3a3"
            : weekPresence < 3
            ? "#ffff00"
            : weekPresence < 4
            ? "#b3ffb9"
            : "gold", */
        alignItems: "center",
        justifyContent: "space-between",
        margin: 12,
        marginBottom: 18,
        borderRadius: 20,
        backgroundColor: "whitesmoke",
        //borderWidth: 2,
        //borderColor: primary,
      }}
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
            Ingressi mese:{" "}
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
    </View>
  );
};

export default HomeStats;
