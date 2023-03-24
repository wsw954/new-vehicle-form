import { modelOptions, trims } from "/data/honda/civic/options";
const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

//This object stores the extra Interior Colors available, dependent on the trim selected & specific Exterior Colors chosen
export const extraColors = {
  optionGroupName: "Interior Color",
  "Sedan EX": {
    ec4: { name: "Gray Cloth", price: 0, trim: [], serial: "ic2" },
    ec10: { name: "Gray Cloth", price: 0, trim: [], serial: "ic2" },
  },
  "Sedan Touring": {
    ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
  },
  "Hatchback EX-L": {
    ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
  },
  "Hatchback Sport Touring": {
    ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
  },
};

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

export const getExclusiveSiblings = (vehicle, optionDetail) => {
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
  "Hatchback Sport": ["pk1", "pk3", "pk8"],
  "Hatchback EX-L": ["pk1", "pk3", "pk8"],
  "Hatchback Sport Touring": ["pk1", "pk3", "pk8"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};

export const getComponents = (vehicleTrim, packageSerial) => {
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

export const exteriorAccessoriesExclusives = {
  ea5: [{ groupName: "Exterior Accessories", serial: "ea6" }],
  ea6: [{ groupName: "Exterior Accessories", serial: "ea5" }],
};

export const exteriorAccessoriesInclusives = {
  ea1: [{ groupName: "Exterior Accessories", serial: "ea21" }],
  ea21: [{ groupName: "Exterior Accessories", serial: "ea1" }],
};
