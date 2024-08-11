import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ComunicationController from "./Model/ComunicationController";
import { Chip, lightColors } from "@rneui/themed";
import { format } from "date-fns";

const AggiungiWorkout = () => {
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [slimQty, setSlimQty] = useState("");
  const [powerQty, setPowerQty] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const endpointResolver = (currentMont, currentYear) => {
    switch (currentMont) {
      case 5:
        return { label: "mag/giu", value: currentYear + "-3" };
      case 7:
        return { label: "lug/ago", value: currentYear + "-4" };
      case 9:
        return { label: "set/ott", value: currentYear + "-5" };
      case 11:
        return { label: "nov/dic", value: currentYear + "-6" };
      case 1:
        return { label: "gen/feb", value: currentYear + "-1" };
      case 3:
        return { label: "mar/apr", value: currentYear + "-2" };
      case 6:
        return { label: "mag/giu", value: currentYear + "-3" };
      case 8:
        return { label: "lug/ago", value: currentYear + "-4" };
      case 10:
        return { label: "set/ott", value: currentYear + "-5" };
      case 12:
        return { label: "nov/dic", value: currentYear + "-6" };
      case 2:
        return { label: "gen/feb", value: currentYear + "-1" };
      case 4:
        return { label: "mar/apr", value: currentYear + "-2" };
    }
  };

  const handleFormSubmit = async () => {
    let validationErrors = {};
    if (!courseName.trim()) validationErrors.course = "Inserire nome del corso";
    if (!instructor.trim())
      validationErrors.instructor = "Inserire nome dell'istruttore";
    if (!(slimQty > 0 && slimQty < 10))
      validationErrors.slim = "Inserire quantità di slim";
    if (!(powerQty > 0 && powerQty < 10))
      validationErrors.power = "Inserire quantità di power";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dat = selectedDate.toISOString().substring(0, 10);
    month = parseInt(dat.substring(5, 7));
    year = parseInt(dat.substring(0, 4));
    const formData = {
      data: dat,
      corso: courseName.trim(),
      istruttore: instructor.trim(),
      power: powerQty,
      slim: slimQty,
    };
    const endpoint = "action/updateOne";
    const currentBimester = endpointResolver(month, year);
    let o = {
      filter: { [currentBimester.value]: { $exists: true } },
      update: {
        $push: {
          [currentBimester.value]: formData,
        },
      },
    };

    const res = await ComunicationController.serverReq(endpoint, o);
    if (res?.modifiedCount === 0) {
      const body = { document: { [currentBimester.value]: [formData] } };
      const newEndpoint = "action/insertOne";
      await ComunicationController.serverReq(newEndpoint, body);
    }
    setCourseName("");
    setInstructor("");
    setSlimQty("");
    setPowerQty("");
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
        onChangeText={(t) => {
          setCourseName(t);
          setErrors((prev) => ({ ...prev, course: "" }));
        }}
        placeholder="Inserisci il nome del corso"
      />

      <Text style={styles.label}>Istruttore:</Text>
      <TextInput
        style={errors.instructor ? styles.error : styles.input}
        value={instructor}
        onChangeText={(t) => {
          setInstructor(t);
          setErrors((prev) => ({ ...prev, instructor: "" }));
        }}
        placeholder="Inserisci il nome dell'istruttore"
      />

      <Text style={styles.label}>Quantità di Slim:</Text>
      <TextInput
        style={errors.slim ? styles.error : styles.input}
        value={slimQty}
        onChangeText={(t) => {
          setSlimQty(t);
          setErrors((prev) => ({ ...prev, slim: "" }));
        }}
        placeholder="Inserisci la quantità di Slim"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Quantità di Power:</Text>
      <TextInput
        style={errors.power ? styles.error : styles.input}
        value={powerQty}
        onChangeText={(t) => {
          setPowerQty(t);
          setErrors((prev) => ({ ...prev, power: "" }));
        }}
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
