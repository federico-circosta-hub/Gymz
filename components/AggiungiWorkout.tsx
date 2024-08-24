import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ComunicationController from "./Model/ComunicationController";
import { Chip, Button } from "@rneui/themed";
import { format } from "date-fns";
import { Picker } from "@react-native-picker/picker";
import { primary } from "./utils/Colors";
import { Course } from "./Model/Types";
import Icon from "react-native-vector-icons/Ionicons";

const AggiungiWorkout = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [courses, setCourses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const endpoint = "action/find";
    let req = await ComunicationController.serverReq(endpoint, "courses", {});
    setCourses(req.documents[0].courses);
  };

  const clearFormData = () => {
    setSelectedDate(new Date());
    setSelectedCourse(undefined);
  };

  const handleDateChange = (event, date: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const handleFormSubmit = async () => {
    setIsSaving(true);
    let dateToIsoString = selectedDate.toISOString().substring(0, 10);

    const bodyData = {
      data: dateToIsoString,
      corso: selectedCourse.course,
      power: selectedCourse.power,
      slim: selectedCourse.slim,
    };
    const endpoint = "action/updateOne";
    const currentKey = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    let o = {
      filter: { [currentKey]: { $exists: true } },
      update: {
        $push: {
          [currentKey]: bodyData,
        },
      },
    };

    const res = await ComunicationController.serverReq(
      endpoint,
      "workoutMonths",
      o
    );
    if (res?.modifiedCount === 0) {
      const body = { document: { [currentKey]: [bodyData] } };
      const newEndpoint = "action/insertOne";
      await ComunicationController.serverReq(
        newEndpoint,
        "workoutMonths",
        body
      );
    }
    clearFormData();
    setIsSaving(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Image
          source={require("../assets/GYMZ_app_logo_image_only.png")}
          style={[{ width: 250, height: 200 }]}
        />
        <View
          style={[
            {
              width: 300,
              height: 210,
              backgroundColor: "white",
              borderRadius: 30,
              paddingVertical: 30,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 50,
            },
            styles.elevation,
          ]}
        >
          <Chip size="lg" color={primary} onPress={showDatePicker}>
            <Icon name="calendar" color="white" size={22} />{" "}
            {format(selectedDate, "EEEE dd MMMM yyyy")}
          </Chip>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <View
              style={[
                {
                  backgroundColor: selectedCourse?.color,
                },
                styles.circle,
              ]}
            />
            <Picker
              selectedValue={selectedCourse}
              style={{
                height: 50,
                width: 220,
              }}
              mode={"dialog"}
              onValueChange={(itemValue) => setSelectedCourse(itemValue)}
            >
              <Picker.Item key={1} label="Seleziona un corso" value="" />
              {courses.map((e) => (
                <Picker.Item key={e.course} label={e.course} value={e} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <Button
        onPress={handleFormSubmit}
        disabled={!selectedCourse || !selectedDate || isSaving}
        title={
          isSaving ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            "Salva"
          )
        }
        icon={{
          name: "save",

          size: 18,
          color: "white",
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: "700", fontSize: 18 }}
        buttonStyle={{
          backgroundColor: primary,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 150,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  circle: { width: 15, height: 15, borderRadius: 15 },
  error: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  elevation: {
    shadowColor: primary,
    elevation: 6,
  },
});

export default AggiungiWorkout;
