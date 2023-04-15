import { modelOptions, trims } from "/data/honda/civic/options";
const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

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

export const getPackageRivals = (vehicle, optionDetail) => {
  const trimName = vehicle.selected.trim.name;
  const rivals = packageRivalArray[trimName];
  const { serial, groupName } = optionDetail;

  if (!rivals.includes(serial)) {
    return [];
  }

  const filteredRivals = rivals.filter((item) => item !== serial);
  const packagesAvailable = vehicle.options.find(
    (option) => option.name === groupName
  ).choicesAvailable;

  const rivalOptions = filteredRivals.flatMap((rivalSerial) =>
    packagesAvailable.filter(
      (packageOption) => packageOption.serial === rivalSerial
    )
  );

  return rivalOptions;
};

export const packageRivalArray = {
  "Sedan Sport": ["pk1", "pk3", "pk8"],
  "Sedan EX": ["pk1", "pk3", "pk8"],
  "Sedan Touring": ["pk1", "pk3", "pk8"],
  "Hatchback Sport": ["pk2", "pk4", "pk9"],
  "Hatchback EX-L": ["pk2", "pk4", "pk9"],
  "Hatchback Sport Touring": ["pk2", "pk4", "pk9"],
  Si: ["pk1", "pk6", "pk8"],
  "Type R": [],
};

export const getPackageSiblings = (packageSerial) => {
  let siblings = [];
  switch (packageSerial) {
    case "pk1":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });
      break;
    case "pk2":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk3":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });

      break;
    case "pk4":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "All Season Floor Mats",
        serial: "ia1",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk5":
      siblings.push({
        groupName: "Powertrain",
        name: "1.5L Turbo 4-Cyl 180hp Engine w/CVT", //Experimental component to test Dropdown data-package functionality
        serial: "pw2",
      });

      siblings.push({
        groupName: "Exterior Accessories",
        name: "Decklid Spoiler-HPD",
        serial: "ea4",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Rear",
        serial: "ea27",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Side",
        serial: "ea28",
      });
      break;
    case "pk6":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Emblem-HPD",
        serial: "ea11",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Rear",
        serial: "ea27",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Side",
        serial: "ea28",
      });
      break;
    case "pk7":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Emblem-HPD",
        serial: "ea11",
      });

      siblings.push({
        groupName: "Exterior Accessories",
        name: "Tailgate Spoiler-HPD",
        serial: "ea25",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Underbody Spoiler-HPD Front",
        serial: "ea26",
      });
      break;
    case "pk8":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Trunk Tray",
        serial: "ia15",
      });
      break;
    case "pk9":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Splash Guard Set",
        serial: "ea24",
      });
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Wheel Locks-Chrome",
        serial: "ea31",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      break;
    case "pk10":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Car Cover",
        serial: "ea3",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Cargo Tray",
        serial: "ia4",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Contoured High-Wall Carpet Floor Mats",
        serial: "ia6",
      });

      break;
    case "pk11":
      siblings.push({
        groupName: "Interior Accessories",
        name: "Door Sill Trim Illuminated",
        serial: "ia8",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Shift Knob",
        serial: "ia13",
      });
      siblings.push({
        groupName: "Interior Accessories",
        name: "Steering Wheel-Alcantara",
        serial: "ia14",
      });
      break;
    case "pk12":
      siblings.push({
        groupName: "Exterior Accessories",
        name: "Wing Spoiler-Carbon Fiber",
        serial: "ea34",
      });
      siblings.push({
        groupName: "Wheels",
        name: "19-Inch Matte Black Alloy Wheels",
        serial: "w6",
      });
      break;
    case "pk13":
      //The Honda website apparently has an error here, no available options are selected as siblings
      //The stated siblings are:
      //Door Handle Film
      //Rear Bumper Applique
      //Door Edge Film
      //None of the above are actually available to Type R as individual accessories
      break;
    default:
      //Return empty array;
      break;
  }

  return siblings;
};

export const getExteriorAccessoriesRivals = (vehicle, optionDetail) => {
  const trimName = vehicle.selected.trim.name;
  const rivals = exteriorAccessoriesRivals[trimName];
  const { serial, groupName } = optionDetail;

  // Find the array containing the 'serial' string
  const foundArray = rivals.find((array) => array.includes(serial));
  if (!foundArray) {
    return [];
  }

  const filteredRivals = foundArray.filter((item) => item !== serial);
  const externalAccAvailable = vehicle.options.find(
    (option) => option.name === groupName
  ).choicesAvailable;

  const rivalOptions = filteredRivals.flatMap((rivalSerial) =>
    externalAccAvailable.filter(
      (externalAccOption) => externalAccOption.serial === rivalSerial
    )
  );

  return rivalOptions;
};

export const exteriorAccessoriesRivals = {
  "Sedan Sport": [["ea5", "ea6"]],
  "Sedan EX": [["ea5", "ea6"]],
  "Sedan Touring": [["ea5", "ea6"]],
  "Hatchback Sport": [["ea5", "ea6"]],
  "Hatchback EX-L": [
    ["ea5", "ea6"],
    ["ea15", "ea21"],
  ],
  "Hatchback Sport Touring": [
    ["ea5", "ea6"],
    ["ea15", "ea21"],
  ],
  Si: [["ea24", "ea28"]],
  "Type R": [],
};

export const getExteriorAccParentChild = (trimName, optionDetail) => {
  const children = exteriorAccessoriesParentChild[trimName];
  const { serial, groupName } = optionDetail;
  const parentChild = exteriorAccessoriesParentChild[trimName];
  return parentChild;
};

export const exteriorAccessoriesParentChild = {
  "Sedan Sport": { parent: "", child: [] },
  "Sedan EX": { parent: "", child: [] },
  "Sedan Touring": { parent: "", child: [] },
  "Hatchback Sport": {
    parent: "ea21",
    child: ["ea1", "ea14", "ea18", "ea19", "ea20", "ea22", "ea23"],
  },
  "Hatchback EX-L": {
    parent: "ea21",
    child: ["ea1", "ea14", "ea18", "ea19", "ea20", "ea22", "ea23"],
  },
  "Hatchback Sport Touring": {
    parent: "ea21",
    child: ["ea1", "ea14", "ea18", "ea19", "ea20", "ea22", "ea23"],
  },
  Si: { parent: "", child: [] },
  "Type R": {
    parent: "ea21",
    child: ["ea1", "ea14", "ea18", "ea19", "ea20", "ea22", "ea23"],
  },
};
