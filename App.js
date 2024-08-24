import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ListaAllenamenti from "./components/Home/ListaAllenamenti";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AggiungiWorkout from "./components/AggiungiWorkout";
import { View, Text, Modal, Pressable } from "react-native";
import { MonthProvider, useMonth } from "./components/Model/MonthContext";
import SelectMonth from "./components/SelectMonth";
import { Chip } from "@rneui/themed";
import { primary } from "./components/utils/Colors";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  return (
    <MonthProvider>
      <AppContent />
    </MonthProvider>
  );
};

const AppContent = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { month } = useMonth();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={setIcons}>
        <Tab.Screen
          options={{
            headerTitle: () => (
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 24, fontWeight: 700, color: primary }}
                  >
                    Workout del mese
                  </Text>
                </View>
                <View>
                  <Chip color={primary} onPress={() => setShowCalendar(true)}>
                    <Icon name="calendar" color="white" size={22} />{" "}
                    {`${month.label[0].toUpperCase()}${month.label
                      .substring(1, 3)
                      .toLowerCase()} ${month.value.split("-")[0]} `}
                  </Chip>
                </View>
                {showCalendar && (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}
                    style={{ width: "50%", height: "50%" }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "whitesmoke",
                        flex: 6,
                      }}
                    >
                      <SelectMonth select={() => setShowCalendar(false)} />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "whitesmoke",
                        flex: 1,
                      }}
                    >
                      <Pressable onPress={() => setShowCalendar(false)}>
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 48,
                          }}
                        >
                          <Icon name="close-outline" size={32} />
                        </View>
                      </Pressable>
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
                <Text style={{ fontSize: 24, fontWeight: 700, color: primary }}>
                  Aggiungi workout
                </Text>
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

const Tab = createBottomTabNavigator();

const setIcons = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === "Home") {
      iconName = "home";
    } else if (route.name === "Aggiungi Workout") {
      iconName = "barbell";
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: primary,
  tabBarInactiveTintColor: "gray",
});

export default App;
