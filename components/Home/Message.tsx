import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import warning from "../../img/warning.png";
import verified from "../../img/checked.png";
import death from "../../img/death.png";
import comic from "../../img/comic.png";
import run from "../../img/running-man.png";
import ControlledTooltip from "../utils/Components/ControlledTooltip";

const Message = (props) => {
  const sizeAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    let toValue = 75;
    Animated.timing(sizeAnim, {
      toValue,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [sizeAnim]);

  if (props.presence < 4) {
    return (
      <ControlledTooltip
        containerStyle={{ width: 150, height: 60 }}
        backgroundColor={"lightgray"}
        popover={<Text>{"Che aspetti?\nCorri in palestra!"}</Text>}
      >
        <Animated.View
          style={{
            backgroundColor: "lightgray",
            width: sizeAnim,
            height: sizeAnim,
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
        </Animated.View>
      </ControlledTooltip>
    );
  } else if (props.frequency >= 4 && props.presence > 3) {
    return (
      <ControlledTooltip
        containerStyle={{ width: 200, height: 60 }}
        backgroundColor={"gold"}
        popover={<Text>{"Pazzesco,\nmedia settimanale super!"}</Text>}
      >
        <Animated.View
          style={{
            backgroundColor: "gold",
            width: sizeAnim,
            height: sizeAnim,
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
        </Animated.View>
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
        <Animated.View
          style={{
            backgroundColor: "#b3ffb9",
            width: sizeAnim,
            height: sizeAnim,
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
        </Animated.View>
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
        <Animated.View
          style={{
            backgroundColor: "#ffff00",
            width: sizeAnim,
            height: sizeAnim,
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
        </Animated.View>
      </ControlledTooltip>
    );
  } else {
    return (
      <ControlledTooltip
        containerStyle={{ width: 225, height: 60 }}
        backgroundColor={"#ffa3a3"}
        popover={<Text>{"Attenzione,\nmedia settimanale insufficiente!"}</Text>}
      >
        <Animated.View
          style={{
            backgroundColor: "#ffa3a3",
            width: sizeAnim,
            height: sizeAnim,
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
        </Animated.View>
      </ControlledTooltip>
    );
  }
};

export default Message;
