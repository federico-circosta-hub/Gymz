import { format } from "date-fns";
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function RecordLine(props) {
  return (
    <View>
      <Pressable onPress={() => props.onDetail()}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: "1%",
            height: 65,
            borderRadius: 5,
            borderLeftWidth: 6,
            borderColor: props.color,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 20,
                  textAlign: "left",
                  marginLeft: 17,
                }}
              >
                {props.dati.corso}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  marginRight: 17,
                }}
              >
                {format(new Date(props.dati.data), "EEEE d")}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
