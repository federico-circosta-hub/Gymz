import React from "react";
import { View, Text, Image } from "react-native";
import warning from "./../img/warning.png";
import verified from "./../img/checked.png";
import death from "./../img/death.png";
import comic from "./../img/comic.png";
import run from "./../img/running-man.png";

export default function Message(props) {
  if (props.presence < 4) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <View>
          <Image source={run} style={{ width: 35, height: 35 }} />
        </View>
        <View>
          <Text>Che aspetti? Corri in palestra!</Text>
        </View>
      </View>
    );
  } else if (props.frequency >= 4 && props.presence > 3) {
    return (
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
        <View>
          <Text>Complimenti, ottima media settimanale!</Text>
        </View>
      </View>
    );
  } else if (
    3 <= props.frequency &&
    props.frequency < 4 &&
    props.presence > 3
  ) {
    return (
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
        <View>
          <Text>Complimenti, buona media settimanale!</Text>
        </View>
      </View>
    );
  } else if (
    2 <= props.frequency &&
    props.frequency < 3 &&
    props.presence > 3
  ) {
    return (
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
        <View>
          <Text>Devi fare più di così!</Text>
        </View>
      </View>
    );
  } else {
    return (
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
        <View>
          <Text>Attenzione, media settimanale insufficiente!</Text>
        </View>
      </View>
    );
  }
}
