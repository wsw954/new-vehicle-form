import { modelOptions, trims } from "/data/honda/civic/options";
const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

export const exteriorColorAction = (vehicle, optionDetail) => {
  const trim = vehicle.selected.trim.name;
  const exteriorColorChosen = optionDetail.name;
  const interiorColorsAvailable = optionsAvailable.get("Interior Color");
  // Define exterior color array and interior color name based on trim level
  let exteriorColorArray, interiorColorName;
  switch (trim) {
    case "Sedan EX":
      exteriorColorArray = ["Meteorite Gray Metallic", "Platinum Pearl White"];
      interiorColorName = "Gray Cloth";
      break;
    case "Sedan Touring":
    case "Hatchback EX-L":
    case "Hatchback Sport Touring":
      exteriorColorArray = ["Meteorite Gray Metallic", "Platinum Pearl White"];
      interiorColorName = "Gray Leather";
      break;
    default:
      exteriorColorArray = [];
  }
  let additionalInteriorColor = {
    groupName: "Interior Color",
    colors: exteriorColorArray.includes(exteriorColorChosen)
      ? interiorColorsAvailable.choicesAvailable.find(
          (element) => element.name === interiorColorName
        )
      : {},
    chosen: {},
  };
  let intColorChosen = vehicle.selected.options.find(
    (option) => option.groupName === "Interior Color"
  ).choicesSelected;
  if (intColorChosen?.length === 1) {
    additionalInteriorColor.chosen = intColorChosen[0];
  }
  return additionalInteriorColor;
};

export const groupDataHandler = (vehicle, optionDetail) => {
  const { groupName } = optionDetail;
  switch (groupName) {
    case "Powertrain":
      return vehicle;

    case "Exterior Color":
      return exteriorColorAction(vehicle, optionDetail);
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Exterior Accessories":
      const { action, popup } = optionDetail;
      if (popup) {
      }

      return vehicle;
    case "Interior Accessories":
      return vehicle;
    case "Electronic Accessories":
      return vehicle;
    default:
    // code block
  }
};

export const getPackageExclusiveSiblings = (vehicle, optionDetail) => {
  const exclusiveArray = packageExclusiveArray[vehicle.selected.trim.name];
  const siblings = [];
  if (exclusiveArray.includes(optionDetail.serial)) {
    siblings = exclusiveArray.filter((item) => item !== optionDetail.serial);
  }
  return siblings;
};

export const packageExclusiveArray = {
  "Sedan Sport": ["pk1", "pk3", "pk8"],
  "Sedan EX": ["pk1", "pk3", "pk8"],
  "Sedan Touring": ["pk1", "pk3", "pk8"],
  "Hatchback Sport": ["pk2", "pk4", "pk9"],
  "Hatchback EX-L": ["pk2", "pk4", "pk9"],
  "Hatchback Sport Touring": ["pk2", "pk4", "pk9"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};

export const getComponents = (packageSerial) => {
  let components = [];
  switch (packageSerial) {
    case "pk1":
      components.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });
      break;
    case "pk2":
      components.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk3":
      components.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });

      break;
    case "pk4":
      components.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk5":
      components.push({
        groupName: "Powertrain",
        name: "1.5L Turbo 4-Cyl 180hp Engine w/CVT", //Experimental component to test Dropdown data-package functionality
        serial: "pw2",
      });

      components.push({
        groupName: "Exterior Accessories",
        name: "Decklid Spoiler-HPD",
        serial: "ea4",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Rear",
        serial: "ea27",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Side",
        serial: "ea28",
      });
      break;
    case "pk6":
      components.push({
        groupName: "Exterior Accessories",
        name: "Emblem-HPD",
        serial: "ea11",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Rear",
        serial: "ea27",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Side",
        serial: "ea28",
      });
      break;
    case "pk7":
      components.push({
        groupName: "Exterior Accessories",
        name: "Emblem-HPD",
        serial: "ea11",
      });

      components.push({
        groupName: "Exterior Accessories",
        name: "Tailgate Spoiler-HPD",
        serial: "ea25",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      break;
    case "pk8":
      components.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });
      break;
    case "pk9":
      components.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      components.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk10":
      components.push({
        groupName: "Exterior Accessories",
        name: "Car Cover",
        serial: "ea3",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Contoured High-Wall Carpet Floor Mats",
        serial: "ia6",
      });

      break;
    case "pk11":
      components.push({
        groupName: "Interior Accessories",
        name: "Door Sill Trim Illuminated",
        serial: "ia8",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Shift Knob",
        serial: "ia13",
      });
      components.push({
        groupName: "Interior Accessories",
        name: "Steering Wheel-Alcantara",
        serial: "ia14",
      });
      break;
    case "pk12":
      components.push({
        groupName: "Exterior Accessories",
        name: "Wing Spoiler-Carbon Fiber",
        serial: "ea34",
      });
      components.push({
        groupName: "Wheels",
        name: "19-Inch Matte Black Alloy Wheels",
        serial: "w6",
      });
      break;
    case "pk13":
      //The Honda website apparently has an error here, no available options are selected as components
      //The stated components are:
      //Door Handle Film
      //Rear Bumper Applique
      //Door Edge Film
      //None of the above are actually available to Type R as individual accessories
      break;
    default:
      //Return empty array;
      break;
  }

  return components;
};

export const getExteriorAccessories = (vehicle, optionDetail) => {
  const exclusiveArray =
    exteriorAccessoriesExclusiveArray[vehicle.selected.trim.name];
  const siblings = [];
  if (exclusiveArray.includes(optionDetail.serial)) {
    siblings = exclusiveArray.filter((item) => item !== optionDetail.serial);
  }
  return siblings;
};

export const exteriorAccessoriesExclusiveArray = {
  "Sedan Sport": ["ea5", "ea6"],
  "Sedan EX": ["ea5", "ea6"],
  "Sedan Touring": ["ea5", "ea6"],
  "Hatchback Sport": ["ea5", "ea6"],
  "Hatchback EX-L": ["ea20", "ea21"],
  "Hatchback Sport Touring": ["pk2", "pk4", "pk9"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};

export const exteriorAccessoriesInclusiveArray = {
  "Sedan Sport": ["ea5", "ea6"],
  "Sedan EX": ["ea5", "ea6"],
  "Sedan Touring": ["ea5", "ea6"],
  "Hatchback Sport": ["ea5", "ea6"],
  "Hatchback EX-L": ["e14", "ea19", "ea20", "ea21"],
  "Hatchback Sport Touring": ["pk2", "pk4", "pk9"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};

export const exteriorAccessoriesPrecessorArray = {
  "Sedan Sport": ["ea5", "ea6"],
  "Sedan EX": ["ea5", "ea6"],
  "Sedan Touring": ["ea5", "ea6"],
  "Hatchback Sport": ["ea5", "ea6"],
  "Hatchback EX-L": ["e14", "ea19", "ea20", "ea21"],
  "Hatchback Sport Touring": ["pk2", "pk4", "pk9"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};
