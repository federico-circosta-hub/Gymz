import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import RecordLine from "./RecordLine";
import ComunicationController from "../Model/ComunicationController";
import StatLine from "./StatLine";
import Detail from "./Detail";
import { differenceInDays } from "date-fns";
import { useMonth } from "../Model/MonthContext";
import { primary } from "../utils/Colors";
import HomeStats from "./HomeStats";
import { Course, Month, Record } from "../Model/Types";
import LogoLoading from "../LoadingStuff/LogoLoading";
import { calculateWeekPresence } from "../utils/calculations";

type CourseCount = {
  corso: string;
  num: number;
};

const ListaAllenamenti = () => {
  const { month } = useMonth() as { month: Month };
  const [courses, setCourses] = useState<Course[]>([]);
  const [Record, setRecord] = useState<Record>();
  const [detail, setDetail] = useState<boolean>(false);
  const [Records, setRecords] = useState<Record[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [CourseCounts, setCourseCounts] = useState<CourseCount[]>([]);
  const [stats, setStats] = useState<boolean>(false);
  const [weekPresence, setWeekPresence] = useState<number>();

  useEffect(() => {
    getRecords();
  }, [month]);

  useEffect(() => {
    setWeekPresence(calculateWeekPresence(Records, month));
  }, [Records]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async (): Promise<void> => {
    const endpoint = "action/find";
    let req = await ComunicationController.serverReq(endpoint, "courses", {});
    setCourses(req.documents[0].courses);
  };

  const getRecords = async (): Promise<void> => {
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
      setWeekPresence(calculateWeekPresence(Records, month));
      return;
    }
    const workoutData = req.documents[0][month.value];
    workoutData.sort(
      (a: Record, b: Record) =>
        new Date(a.data).getTime() - new Date(b.data).getTime()
    );
    workoutData.forEach((el: Record) => {
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

  function courseCounting(arr: Record[]): CourseCount[] {
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

  if (loading) {
    return <LogoLoading imgSize={175} />;
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
              <Image
                source={require("../../assets/list.png")}
                style={{ width: 20, height: 20 }}
              />
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
              <Image
                source={require("../../assets/bar-chart.png")}
                style={{ width: 20, height: 20 }}
              />
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
                      courses.find((e) => e.course === Record?.corso)?.color
                    }
                    handlePress={() => setDetail(false)}
                  />
                </View>
              </Modal>
              <FlatList
                data={Records}
                renderItem={({ item }) => {
                  return (
                    <RecordLine
                      color={
                        courses.find((e) => e.course === item.corso)?.color
                      }
                      dati={item}
                      //onDelete={() => deleteLocalRecord(item)}
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
    paddingHorizontal: 25,
    borderColor: "#c0c0c0",
  },
});

export default ListaAllenamenti;
