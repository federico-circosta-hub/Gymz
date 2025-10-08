import { Alert } from "react-native";

export default class CommunicationController {
  static BASE_URL = process.env.EXPO_PUBLIC_API_URL + "/";
  static async serverReq(
    endpoint: string,
    collection: string,
    parameters: object
  ) {
    const url = this.BASE_URL + endpoint;
    const body = {
      collection: collection,
      database: "gymz",
      dataSource: "MongoCluster",
      ...parameters,
    };
    let httpResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });
    const status = httpResponse.status;
    //console.log("httpResponse", httpResponse);
    if (status !== 200) return { error: true };

    try {
      let deserializedObject = await httpResponse.json();
      return deserializedObject;
    } catch (err) {
      //console.log(status + " An error occurred");
      Alert.alert("Errore di rete\nRiprovare più tardi");
    }
  }
}
