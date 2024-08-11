import React from "react";
import { View, Text, Pressable } from "react-native";

export default function RecordLine(props) {
  return (
    <View>
      <Pressable
        onLongPress={() => props.onDelete()}
        onPress={() => props.onDetail()}
      >
        <View
          style={{
            marginHorizontal: "1%",
            height: 80,
            backgroundColor: props.color,
            borderRadius: 5,
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
                  marginTop: "5%",
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
                  marginTop: "10%",
                }}
              >
                {props.dati.data}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              marginLeft: 17,
            }}
          >
            {props.dati.istruttore}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
