import CommunicationController from "../ComunicationController";

export const fetchDateKeys = async (collection: string) => {
  const endpoint = "action/aggregate";
  const parameters = {
    pipeline: [
      {
        $project: {
          keys: { $objectToArray: "$$ROOT" },
        },
      },
      {
        $unwind: "$keys",
      },
      {
        $match: {
          "keys.k": { $regex: "^[0-9]{4}-[0-9]{2}$" },
        },
      },
      {
        $project: {
          year: { $toInt: { $substr: ["$keys.k", 0, 4] } },
        },
      },
      {
        $group: {
          _id: null,
          uniqueKeys: { $addToSet: "$year" },
        },
      },
    ],
  };

  try {
    const response = await CommunicationController.serverReq(
      endpoint,
      collection,
      parameters
    );
    return response;
  } catch (err) {
    console.error("Errore durante la richiesta aggregate", err);
    return { error: true };
  }
};
export const fetchRecordByYear = async (collection: string, year: string) => {
  const endpoint = "action/aggregate";
  const parameters = {
    pipeline: [
      {
        $addFields: {
          keysAndValues: {
            $objectToArray: "$$ROOT",
          },
        },
      },
      {
        $match: {
          "keysAndValues.k": {
            $regex: year,
          },
        },
      },
      {
        $project: {
          keysAndValues: 0,
          _id: 0,
        },
      },
    ],
  };
  try {
    const response = await CommunicationController.serverReq(
      endpoint,
      collection,
      parameters
    );
    return response;
  } catch (err) {
    console.error("Errore durante la richiesta aggregate", err);
    return { error: true };
  }
};
