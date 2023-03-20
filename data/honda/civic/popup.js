import { modelOptions, trims } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

const addOptionPopupFunctionMap = modelOptions.reduce((acc, option) => {
  try {
    let functionName = `add${option.name.split(" ").join("")}Message`;
    const fn = eval(functionName);
    acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  } catch (e) {
    console.error(
      "Add Option Popup Function for " + option.name + " is not defined"
    );
    acc[option.name] = (vehicle, optionDetail) => vehicle;
  }
  return acc;
}, {});

const deletedOptionPopupFunctionMap = modelOptions.reduce((acc, option) => {
  try {
    let functionName = `add${option.name.split(" ").join("")}Message`;
    const fn = eval(functionName);
    acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  } catch (e) {
    console.error(
      "DELETE Option Popup Function for " + option.name + " is not defined"
    );
    acc[option.name] = (vehicle, optionDetail) => vehicle;
  }
  return acc;
}, {});

export const addOptionPopupMessageHandler = (vehicle, optionDetail) => {
  return (
    addOptionPopupFunctionMap[optionDetail.groupName]?.(
      vehicle,
      optionDetail
    ) || vehicle
  );
};

export const deleteOptionPopupMessageHandler = (vehicle, optionDetail) => {
  return (
    addOptionPopupFunctionMap[optionDetail.groupName]?.(
      vehicle,
      optionDetail
    ) || vehicle
  );
};

// export const popupMessageHandler = (vehicle, optionDetail) => {
//   const {
//     groupName,
//     serial,
//     checked,
//     package: packageID,
//     popup,
//     action,
//   } = optionDetail;
//   if (!checked) {
//     if (packageID != "") {
//       return deleteComponentMessage(vehicle, optionDetail);
//     }
//     return vehicle;
//   } else {
//     const optionFunctionMap = {
//       "Exterior Color": addExteriorColor,
//       Packages: addPackageComponents,
//       "Exterior Accessories": addExteriorAccessories,
//       "Interior Accessories": addInteriorAccessories,
//     };

//     return vehicle;
//   }
// };

// export const addOptionPopUpMessageHandler = (vehicle, optionDetail) => {
//   const optionFunctionMap = {
//     Packages: addPackagesMessage,
//   };
//   return (
//     optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
//     vehicle
//   );
// };

// export const deleteOptionPopupMessageHandler = (vehicle, optionDetail) => {
//   const optionFunctionMap = {
//     Packages: deletePackageMessage,
//   };

//   return (
//     optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
//     vehicle
//   );
// };

function addPackagesMessage(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const packageOption = optionsAvailable.get(optionDetail.groupName);
  const siblings = getExclusiveSiblings(vehicle, optionDetail);
  if (siblings.length > 0) {
    //For each sibling, check if it is in the vehicle.selected.options
    //If not selected
  }
  return vehicle;
}
function deletePackageMessage(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const packageOption = optionsAvailable.get(optionDetail.groupName);
  const siblings = getExclusiveSiblings(vehicle, optionDetail);
  if (siblings.length > 0) {
    //For each sibling, check if it is in the vehicle.selected.options
    //If not selected
  }
  return vehicle;
}

function deleteComponentMessage(vehicle, optionDetail) {
  let newpopup = vehicle.popup;
  const { choicesAvailable } = optionsAvailable.get("Packages");
  const { package: serial } = optionDetail;
  const parentPackageName = choicesAvailable.find(
    (p) => p.serial === serial
  ).name;
  newpopup = {
    show: true,
    message:
      "If you remove " +
      optionDetail.name +
      " it will remove " +
      parentPackageName,
    detail: optionDetail,
  };
  vehicle.popup = newpopup;
  return vehicle;
}
