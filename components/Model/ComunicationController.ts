import { Alert } from "react-native";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
export default class CommunicationController {
  static BASE_URL =
    "https://eu-central-1.aws.data.mongodb-api.com/app/data-tinelxj/endpoint/data/v1/";
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

    //console.log("Body being sent:", JSON.stringify(body, null, 2));
    let httpResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
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
