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
