import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ComunicationController from "./Model/ComunicationController";
import { Chip, lightColors } from "@rneui/themed";
import { format } from "date-fns";
import { endpointResolver } from "./utils/DateManipulation";

const AggiungiWorkout = () => {
  const [formData, setFormData] = useState({
    selectedDate: new Date(),
    courseName: "",
    instructor: "",
    slimQty: "",
    powerQty: "",
  });
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [slimQty, setSlimQty] = useState("");
  const [powerQty, setPowerQty] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const clearFormData = () => {
    setFormData({
      selectedDate: new Date(),
      courseName: "",
      instructor: "",
      slimQty: "",
      powerQty: "",
    });
  };

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setFormData({ ...formData, selectedDate: date });
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const handleInputChange = (value, key) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ [key]: "" });
  };

  const handleFormSubmit = async () => {
    let validationErrors = {};
    if (!formData.courseName.trim())
      validationErrors.courseName = "Inserire nome del corso";
    if (!formData.instructor.trim())
      validationErrors.instructor = "Inserire nome dell'istruttore";
    if (!(formData.slimQty > 0 && formData.slimQty < 10))
      validationErrors.slimQty = "Inserire quantità di slim";
    if (!(formData.powerQty > 0 && formData.powerQty < 10))
      validationErrors.powerQty = "Inserire quantità di power";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dateToIsoString = formData.selectedDate.toISOString().substring(0, 10);
    month = parseInt(dateToIsoString.substring(5, 7));
    year = parseInt(dateToIsoString.substring(0, 4));
    const bodyData = {
      data: dateToIsoString,
      corso: formData.courseName.trim(),
      istruttore: formData.instructor.trim(),
      power: formData.powerQty,
      slim: formData.slimQty,
    };
    const endpoint = "action/updateOne";
    const currentBimester = endpointResolver(month, year);
    let o = {
      filter: { [currentBimester.value]: { $exists: true } },
      update: {
        $push: {
          [currentBimester.value]: bodyData,
        },
      },
    };

    const res = await ComunicationController.serverReq(endpoint, o);
    if (res?.modifiedCount === 0) {
      const body = { document: { [currentBimester.value]: [bodyData] } };
      const newEndpoint = "action/insertOne";
      await ComunicationController.serverReq(newEndpoint, body);
    }
    clearFormData();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={styles.label}>Data:</Text>
        <Chip
          title={format(selectedDate, "EEE dd MMM yyyy")}
          iconPosition="left"
          icon={{
            name: "calendar",
            type: "font-awesome",
            size: 20,
            color: lightColors.primary,
          }}
          onPress={showDatePicker}
          type="outline"
          containerStyle={{ marginLeft: 8 }}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Nome del corso:</Text>
      <TextInput
        style={errors.course ? styles.error : styles.input}
        value={courseName}
        onChangeText={(t) => handleInputChange(t, "course")}
        placeholder="Inserisci il nome del corso"
      />

      <Text style={styles.label}>Istruttore:</Text>
      <TextInput
        style={errors.instructor ? styles.error : styles.input}
        value={instructor}
        onChangeText={(t) => handleInputChange(t, "instructor")}
        placeholder="Inserisci il nome dell'istruttore"
      />

      <Text style={styles.label}>Quantità di Slim:</Text>
      <TextInput
        style={errors.slim ? styles.error : styles.input}
        value={slimQty}
        onChangeText={(n) => handleInputChange(n, "slimQty")}
        placeholder="Inserisci la quantità di Slim"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Quantità di Power:</Text>
      <TextInput
        style={errors.power ? styles.error : styles.input}
        value={powerQty}
        onChangeText={(n) => handleInputChange(n, "powerQty")}
        placeholder="Inserisci la quantità di Power"
        keyboardType="numeric"
      />

      <Button title="Invia" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AggiungiWorkout;
