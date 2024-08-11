import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import RecordLine from "./RecordLine";
import ComunicationController from "./Model/ComunicationController";
import StatLine from "./StatLine";
import Detail from "./Detail";
import { differenceInDays } from "date-fns";
import Message from "./Message";
import background1 from "./../img/vecteezy_gym-interior-with-people-doing-sport-exercises_13961888_440/background1.jpeg";
import { useBimester } from "././Model/BimesterContext";
import barChart from "./../img/bar-chart.png";
import list from "./../img/list.png";
import { DATE_BIMESTER } from "./utils/Date-Bimester";

const ListaAllenamenti = () => {
  const { bimester } = useBimester();
  const [corsiCol, setCorsiCol] = useState(new Map());
  const [Record, setRecord] = useState({ corso: "x" });
  const [detail, setDetail] = useState(false);
  const bgColors = [
    "aliceblue",
    "bisque",
    "beige",
    "honeydew",
    "lavender",
    "lemonchiffon",
    "lavenderblush",
    "lightcyan",
    "mistyrose",
    "peachpuff",
    "paleturquoise",
    "palegoldenrod",
    "mintcream",
  ];
  const [Records, setRecords] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CourseCounts, setCourseCounts] = useState([]);
  const [stats, setStats] = useState(false);
  const [dots, setDots] = useState("");
  const [weekPresence, setWeekPresence] = useState();

  useEffect(() => {
    getRecords();
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [bimester]);

  useEffect(() => {
    calculateWeekPresence();
  }, [Records]);

  const getBimesterBeginning = (m, y) => {
    switch (m) {
      case 0:
        return new Date(y, 0, 1);
      case 1:
        return new Date(y, 0, 1);
      case 2:
        return new Date(y, 2, 1);
      case 3:
        return new Date(y, 2, 1);
      case 4:
        return new Date(y, 4, 1);
      case 5:
        return new Date(y, 4, 1);
      case 6:
        return new Date(y, 6, 1);
      case 7:
        return new Date(y, 6, 1);
      case 8:
        return new Date(y, 8, 1);
      case 9:
        return new Date(y, 8, 1);
      case 10:
        return new Date(y, 10, 1);
      case 11:
        return new Date(y, 10, 1);
    }
  };

  const getRecords = async () => {
    setLoading(true);
    setRecords([]);
    setCourseCounts([]);
    const endpoint = "action/find";
    const parameters = {
      filter: { [bimester.value]: { $exists: true } },
    };
    let req = await ComunicationController.serverReq(endpoint, parameters);
    setRecords([]);
    setCourseCounts([]);
    if (req.error || req.documents.length === 0) {
      setLoading(false);
      calculateWeekPresence(req);
      return;
    }
    const bimesterData = req.documents[0][bimester.value];
    bimesterData.sort((a, b) => new Date(a.data) - new Date(b.data));
    bimesterData.forEach((el) => {
      setRecords((prevState) => [el, ...prevState]);
      courseColoring(el.corso);
    });
    setCourseCounts(courseCounting(bimesterData));
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

  const courseColoring = (c) => {
    if (!corsiCol.has(c)) {
      let associableColor = Math.floor(Math.random() * bgColors.length);
      let values = [...corsiCol.values()];
      while (values.includes(associableColor)) {
        associableColor = Math.floor(Math.random() * bgColors.length);
      }
      setCorsiCol(corsiCol.set(c, associableColor));
    }
  };

  const calculateWeekPresence = () => {
    const currentDate = new Date();
    if (
      (bimester.label === "mag/giu" && bimester.value === "2023-3") ||
      (bimester.label === "lug/ago" && bimester.value === "2023-4")
    ) {
      setWeekPresence(Records.length / 6);
    } else if (DATE_BIMESTER[currentDate.getMonth()] === bimester.label) {
      let bb = getBimesterBeginning(
        currentDate.getMonth(),
        currentDate.getFullYear()
      );
      const daysDifference = differenceInDays(currentDate, bb);
      const weeksDifference = daysDifference < 7 ? 0 : daysDifference / 7;
      setWeekPresence(
        weeksDifference > 0 ? Records.length / weeksDifference : Records.length
      );
    } else {
      setWeekPresence(Records.length / 8);
    }
  };

  function roundDec(n) {
    const r = Math.round(n * 10) / 10;
    return r % 1 === 0 ? r.toFixed(0) : r.toFixed(1);
  }

  if (loading) {
    return (
      <ImageBackground source={background1}>
        <View
          style={{
            height: "100%",
            padding: 65,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              color: "#5d2867",
              fontWeight: "900",
            }}
          >
            Loading{dots}
          </Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            backgroundColor:
              Records.length < 4
                ? "lightgray"
                : weekPresence < 2
                ? "#ffa3a3"
                : weekPresence < 3
                ? "#ffff00"
                : weekPresence < 4
                ? "#b3ffb9"
                : "gold",
            alignItems: "center",
            justifyContent: "center",
            margin: 12,
            marginBottom: 18,
            borderRadius: 20,
            elevation: 0.9,
            shadowOpacity: 100,
            shadowRadius: 0.5,
            shadowOffset: { width: 15, height: 22 },
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Presenze del bimestre: {Records.length}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Presenze settimanali:{" "}
                {Records.length > 3 ? roundDec(weekPresence) : "NC"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Message frequency={weekPresence} presence={Records.length} />
            </View>
          </View>
        </View>
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
                width: "90%",
                height: "100%",
                backgroundColor: !stats ? "lightsteelblue" : "whitesmoke",
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
                backgroundColor: stats ? "lightsteelblue" : "whitesmoke",
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
                    color={bgColors[corsiCol.get(Record.corso)]}
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
                      color={bgColors[corsiCol.get(item.corso)]}
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
    backgroundColor: "#fffafa",
    paddingHorizontal: 25,
    borderColor: "#c0c0c0",
  },
});

export default ListaAllenamenti;
