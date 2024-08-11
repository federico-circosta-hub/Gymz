import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ListaAllenamenti from "./components/ListaAllenamenti";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AggiungiWorkout from "./components/AggiungiWorkout";
import { Image, View, Text, Modal } from "react-native";
import workout from "./img/work-out.png";
import kettlebell from "./img/kettlebell.png";
import { BimesterProvider } from "./components/Model/BimesterContext";
import SelectBim from "./components/SelectBim";
import { Chip, lightColors } from "@rneui/themed";
import { useBimester } from "./components/Model/BimesterContext";

const App = () => {
  return (
    <BimesterProvider>
      <AppContent />
    </BimesterProvider>
  );
};

const AppContent = () => {
  const [showBim, setShowBim] = useState(false);
  const { bimester } = useBimester();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={setIcons}>
        <Tab.Screen
          options={{
            headerTitle: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: 700 }}>
                  Allenamenti
                </Text>
                <Image source={workout} style={{ width: 58, height: 58 }} />
                <Chip
                  title={`${bimester.label} ${bimester.value.split("-")[0]}`}
                  iconPosition="right"
                  icon={{
                    name: "calendar",
                    type: "font-awesome",
                    size: 20,
                    color: lightColors.primary,
                  }}
                  onPress={() => setShowBim(true)}
                  type="outline"
                  containerStyle={{ marginLeft: 8 }}
                />
                {/* <Pressable onPress={() => setShowBim(true)}>
                    <Image
                      source={calendar}
                      style={{ width: 45, height: 45, marginLeft: 40 }}
                    />
                  </Pressable> */}
                {showBim && (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}
                    style={{ width: "50%", height: "50%" }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      <SelectBim select={() => setShowBim(false)} />
                    </View>
                  </Modal>
                )}
              </View>
            ),
          }}
          name="Home"
          component={ListaAllenamenti}
        />
        <Tab.Screen
          options={{
            headerTitle: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: 700 }}>
                  Aggiungi workout
                </Text>
                <Image source={kettlebell} style={{ width: 58, height: 58 }} />
              </View>
            ),
          }}
          name="Aggiungi Workout"
          component={AggiungiWorkout}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

/* const { bimester, updateBimester } = useBimester(); */

const Tab = createBottomTabNavigator();

const setIcons = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === "Home") {
      iconName = focused ? "reader" : "reader-outline";
    } else if (route.name === "Aggiungi Workout") {
      iconName = focused ? "barbell" : "barbell-outline";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "#ff5c69",
  tabBarInactiveTintColor: "gray",
});

export default App;
