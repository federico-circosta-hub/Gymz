import React from "react";
import { View, Text } from "react-native";
import { primary } from "../utils/Colors";
import { LinearProgress } from "@rneui/themed";

export default function StatLine(props) {
  const bar = (): number => {
    return Math.round((props.dati.num * 100) / props.total) / 100;
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
        <LinearProgress
          style={{
            width: 150,
            marginVertical: 10,
            height: 20,
            borderRadius: 10,
            position: "relative",
          }}
          color={primary}
          value={bar()}
        />
        <Text
          style={{
            margin: "auto",
            fontSize: 16,
            position: "absolute",
            right: 62,
            top: 8,
            color: "white",
          }}
        >
          {`${Math.floor(bar() * 100)}%`}
        </Text>
      </View>
    </View>
  );
}
