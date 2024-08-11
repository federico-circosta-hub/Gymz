import { View, Pressable, Text } from "react-native";

const Detail = (props) => {
  return (
    <Pressable onPress={() => props.handlePress()}>
      <View
        style={{
          width: "90%",
          height: "50%",
          backgroundColor: props.color,
          justifyContent: "center",
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "800",
            fontSize: 28,
            paddingBottom: 35,
          }}
        >
          {props.dati.corso}
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ paddingLeft: "25%", fontWeight: "500", fontSize: 20 }}>
            Slim {props.dati.slim}
          </Text>
          <Text>  </Text>
          <Text
            style={{ paddingRight: "25%", fontWeight: "500", fontSize: 20 }}
          >
            Power {props.dati.power}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Detail;
