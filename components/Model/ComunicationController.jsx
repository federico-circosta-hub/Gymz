import { Alert } from "react-native";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
export default class CommunicationController {
  static BASE_URL =
    "https://eu-central-1.aws.data.mongodb-api.com/app/data-tinelxj/endpoint/data/v1/";
  static async serverReq(endpoint, collection, parameters) {
    const url = this.BASE_URL + endpoint;
    let httpResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },

      body: JSON.stringify({
        collection: collection,
        database: "gymz",
        dataSource: "MongoCluster",
        ...parameters,
      }),
    });
    const status = httpResponse.status;
    console.log("parameters", parameters);
    if (status !== 200) return { error: true };

    try {
      let deserializedObject = await httpResponse.json();
      return deserializedObject;
    } catch (err) {
      console.log(status + " An error occurred");
      Alert.alert("Errore di rete\nRiprovare più tardi");
    }
  }
}
