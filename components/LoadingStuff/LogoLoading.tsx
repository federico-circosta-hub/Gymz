import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { primary } from "../utils/Colors";

const LogoLoading = ({ imgSize }) => {
  return (
    <View
      style={{
        height: "100%",
        padding: 65,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Image
        source={require("../../assets/GYMZ_logo_splash.png")}
        style={[{ width: imgSize, height: imgSize }]}
      />
      <ActivityIndicator size="large" color={primary} />
    </View>
  );
};

export default LogoLoading;
