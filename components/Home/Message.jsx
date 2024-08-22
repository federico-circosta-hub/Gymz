import React from "react";
import { View, Text, Image } from "react-native";
import warning from "../../img/warning.png";
import verified from "../../img/checked.png";
import death from "../../img/death.png";
import comic from "../../img/comic.png";
import run from "../../img/running-man.png";
import ControlledTooltip from "../utils/Components/ControlledTooltip";

export default function Message(props) {
  if (props.presence < 4) {
    return (
      <ControlledTooltip
        containerStyle={{ width: 150, height: 60 }}
        backgroundColor={"lightgray"}
        popover={<Text>{"Che aspetti?\nCorri in palestra!"}</Text>}
      >
        <View
          style={{
            backgroundColor: "lightgray",
            width: 70,
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
          }}
        >
          <View>
            <Image source={run} style={{ width: 35, height: 35 }} />
          </View>
        </View>
      </ControlledTooltip>
    );
  } else if (props.frequency >= 4 && props.presence > 3) {
    return (
      <ControlledTooltip
        containerStyle={{ width: 200, height: 60 }}
        backgroundColor={"gold"}
        popover={<Text>{"Pazzesco,\nmedia settimanale super!"}</Text>}
      >
        <View
          style={{
            backgroundColor: "gold",
            width: 70,
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <View>
              <Image source={comic} style={{ width: 35, height: 35 }} />
            </View>
          </View>
        </View>
      </ControlledTooltip>
    );
  } else if (
    3 <= props.frequency &&
    props.frequency < 4 &&
    props.presence > 3
  ) {
    return (
      <ControlledTooltip
        containerStyle={{ width: 200, height: 60 }}
        backgroundColor={"#b3ffb9"}
        popover={<Text>{"Complimenti,\nbuona media settimanale!"}</Text>}
      >
        <View
          style={{
            backgroundColor: "#b3ffb9",
            width: 70,
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <View>
              <Image source={verified} style={{ width: 35, height: 35 }} />
            </View>
          </View>
        </View>
      </ControlledTooltip>
    );
  } else if (
    2 <= props.frequency &&
    props.frequency < 3 &&
    props.presence > 3
  ) {
    return (
      <ControlledTooltip
        backgroundColor={"#ffff00"}
        popover={<Text>Devi fare più di così!</Text>}
      >
        <View
          style={{
            backgroundColor: "#ffff00",
            width: 70,
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <View>
              <Image source={warning} style={{ width: 35, height: 35 }} />
            </View>
          </View>
        </View>
      </ControlledTooltip>
    );
  } else {
    return (
      <ControlledTooltip
        containerStyle={{ width: 225, height: 60 }}
        backgroundColor={"#ffa3a3"}
        popover={<Text>{"Attenzione,\nmedia settimanale insufficiente!"}</Text>}
      >
        <View
          style={{
            backgroundColor: "#ffa3a3",
            width: 70,
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <View>
              <Image source={death} style={{ width: 35, height: 35 }} />
            </View>
          </View>
        </View>
      </ControlledTooltip>
    );
  }
}
