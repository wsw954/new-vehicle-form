import { trims, modelOptions } from "/data/honda/civic/options";

const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));
const trimsAvailable = new Map(trims.map((e) => [e.name, e]));

export const addSpecialAction = (vehicle, optionDetail) => {
  console.log("LIne 7 in specAction");
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      console.log("Line 12 in Handle addSpecAction for Exterior Color");
      return vehicle;
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      return vehicle;
    case "Exterior Accessories":
      return vehicle;
    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

export const deleteSpecialAction = (vehicle, optionDetail) => {
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      console.log("Line 35 in deleteSpecialAction");
      return vehicle;
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      console.log("LIne 41 in action, have to delete package components");
      return vehicle;
    case "Exterior Accessories":
      return vehicle;
    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};
