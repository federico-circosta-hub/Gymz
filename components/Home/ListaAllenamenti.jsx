import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import RecordLine from "./RecordLine";
import ComunicationController from "../Model/ComunicationController";
import StatLine from "./StatLine";
import Detail from "./Detail";
import { differenceInDays } from "date-fns";
import { useMonth } from "../Model/MonthContext";
import barChart from "../../img/bar-chart.png";
import list from "../../img/list.png";
import { primary } from "../utils/Colors";
import HomeStats from "./HomeStats";

const ListaAllenamenti = () => {
  const { month } = useMonth();
  //const splash_logo = Image.resolveAssetSource(GYMZ_logo_splash).uri;
  const [courses, setCourses] = useState([]);
  const [Record, setRecord] = useState({ corso: "x" });
  const [detail, setDetail] = useState(false);
  const [Records, setRecords] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CourseCounts, setCourseCounts] = useState([]);
  const [stats, setStats] = useState(false);
  const [weekPresence, setWeekPresence] = useState();

  useEffect(() => {
    getRecords();
  }, [month]);

  useEffect(() => {
    calculateWeekPresence();
  }, [Records]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const endpoint = "action/find";
    let req = await ComunicationController.serverReq(endpoint, "courses", {});
    setCourses(req.documents[0].courses);
  };

  const getRecords = async () => {
    setLoading(true);
    setRecords([]);
    setCourseCounts([]);
    const endpoint = "action/find";
    const parameters = {
      filter: { [month.value]: { $exists: true } },
    };
    let req = await ComunicationController.serverReq(
      endpoint,
      "workoutMonths",
      parameters
    );
    setRecords([]);
    setCourseCounts([]);
    if (req.error || req.documents.length === 0) {
      setLoading(false);
      calculateWeekPresence(req);
      return;
    }
    const workoutData = req.documents[0][month.value];
    workoutData.sort((a, b) => new Date(a.data) - new Date(b.data));
    workoutData.forEach((el) => {
      setRecords((prevState) => [el, ...prevState]);
    });
    setCourseCounts(courseCounting(workoutData));
    setFetching(false);
    setLoading(false);
  };

  function clearAll() {
    setRecords([]);
    setCourseCounts([]);
  }

  function courseCounting(arr) {
    const resultArray = [];
    const nameCountMap = new Map();
    for (const item of arr) {
      const corso = item.corso;
      nameCountMap.set(corso, (nameCountMap.get(corso) || 0) + 1);
    }
    nameCountMap.forEach((count, corso) => {
      resultArray.push({ corso: corso, num: count });
    });
    return resultArray;
  }

  const calculateWeekPresence = () => {
    const currentDate = new Date();
    if (month.value === "2023-05" || month.label === "ago") {
      setWeekPresence(Records.length / 2);
    } else if (currentDate.toISOString().toString() === month.value) {
      const monthBeginnigDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const daysDifference = differenceInDays(currentDate, monthBeginnigDate);
      const weeksDifference = daysDifference < 7 ? 0 : daysDifference / 7;
      setWeekPresence(
        weeksDifference > 0 ? Records.length / weeksDifference : Records.length
      );
    } else {
      setWeekPresence(Records.length / 4);
    }
  };

  if (loading) {
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
          style={[{ width: 175, height: 175 }]}
        />
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HomeStats Records={Records} weekPresence={weekPresence} />
        <View
          style={{
            flex: 0.75,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={() => {
              setStats(false);
            }}
          >
            <View
              style={{
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                width: "95%",
                height: "100%",
                backgroundColor: !stats ? primary : "whitesmoke",
                margin: 5,
                alignItems: "center",
                justifyContent: "center",
                elevation: !stats ? 7.5 : 0,
              }}
            >
              <Image source={list} style={{ width: 20, height: 20 }} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setStats(true);
            }}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View
              style={{
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
                width: "90%",
                height: "100%",
                backgroundColor: stats ? primary : "whitesmoke",
                margin: 5,
                alignItems: "center",
                justifyContent: "center",
                elevation: stats ? 7.5 : 0,
              }}
            >
              <Image source={barChart} style={{ width: 20, height: 20 }} />
            </View>
          </Pressable>
        </View>

        <View style={styles.container2}>
          {Records.length > 0 && stats ? (
            <>
              <FlatList
                style={styles.statsStyle}
                data={CourseCounts.sort((a, b) => b.num - a.num)}
                renderItem={({ item }) => {
                  return <StatLine dati={item} total={Records.length} />;
                }}
                snapToAlignment="start"
              />
            </>
          ) : Records.length > 0 && !stats ? (
            <>
              <Modal
                animationType="fade"
                transparent={true}
                visible={detail}
                onRequestClose={() => {
                  setDetail(false);
                }}
              >
                <View
                  on
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Detail
                    dati={Record}
                    color={
                      courses.find((e) => e.course === Record.corso)?.color
                    }
                    handlePress={() => setDetail(false)}
                  />
                </View>
              </Modal>
              <FlatList
                style={styles.listStyle}
                data={Records}
                renderItem={({ item }) => {
                  return (
                    <RecordLine
                      color={
                        courses.find((e) => e.course === item.corso)?.color
                      }
                      dati={item}
                      onDelete={() => deleteLocalRecord(item)}
                      onDetail={() => (setDetail(true), setRecord(item))}
                    />
                  );
                }}
                snapToAlignment="start"
                decelerationRate={"fast"}
                onRefresh={() => {
                  setFetching(true), clearAll(), getRecords();
                }}
                refreshing={fetching}
              />
            </>
          ) : (
            <Text style={{ textAlign: "center", marginTop: "2%" }}>
              Nessuna presenza
            </Text>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  container1: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container2: {
    backgroundColor: "#fff",
    flex: 6,
  },
  statsStyle: {
    //backgroundColor: "#fffafa",
    paddingHorizontal: 25,
    borderColor: "#c0c0c0",
  },
});

export default ListaAllenamenti;
