import React from "react";
import { View, Text } from "react-native";

export default function StatLine(props) {
  const bar = () => {
    return Math.floor((props.dati.num * 100) / props.total);
  };

  return (
    <View
      style={{
        marginVertical: 16,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 2,
        borderBottomWidth: 0.5,
        borderColor: "lightgray",
      }}
    >
      <View
        style={{
          width: 100,
          marginLeft: 10,
          paddingVertical: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>{props.dati.corso}</Text>
      </View>
      <View>
        <Text style={{ textAlign: "center", marginRight: 10, fontSize: 16 }}>
          {props.dati.num}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 100,
            height: 20,
            borderWidth: 0.1,
            borderColor: "black",
            borderRadius: 10,
            backgroundColor: "#fff",
            flexDirection: "row",
          }}
        >
          <View>
            <View
              style={{
                width: bar(),
                height: 20,
                backgroundColor: "#e9967a",
                borderRadius: 10,
              }}
            ></View>
          </View>
          <Text
            style={{ fontSize: 16, margin: 0, position: "absolute", right: 40 }}
          >
            {bar()}%
          </Text>
        </View>
      </View>
    </View>
  );
}
