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

const deleteOptionPopupFunctionMap = modelOptions.reduce((acc, option) => {
  try {
    let functionName = `delete${option.name.split(" ").join("")}Message`;
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
    deleteOptionPopupFunctionMap[optionDetail.groupName]?.(
      vehicle,
      optionDetail
    ) || vehicle
  );
};

function addPowertrainMessage(vehicle, optionDetail) {
  console.log(
    "Line 60 in popup, ADD Powertrain generic popup Message function"
  );
  return vehicle;
}

function addExteriorColorMessage(vehicle, optionDetail) {
  console.log(
    "Line 67 in popup, ADD Exterior Color generic popup Message function"
  );
  return vehicle;
}

function addInteriorColorMessage(vehicle, optionDetail) {
  console.log(
    "Line 74 in popup, ADD Interior Color generic popup Message function"
  );
  return vehicle;
}

function addWheelsMessage(vehicle, optionDetail) {
  console.log("Line 80 in popup, ADD Wheels generic popup Message function");
  return vehicle;
}

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
// function deletePackageMessage(vehicle, optionDetail) {
//   let updatedVehicle = { ...vehicle };
//   const packageOption = optionsAvailable.get(optionDetail.groupName);
//   const siblings = getExclusiveSiblings(vehicle, optionDetail);
//   if (siblings.length > 0) {
//     //For each sibling, check if it is in the vehicle.selected.options
//     //If not selected
//   }
//   return vehicle;
// }

function addExteriorAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 85 in popup, ADD Exterior Accessories generic popup Message function"
  );
  return vehicle;
}
function addInteriorAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 92 in popup, ADD Interior Accessories generic popup Message function"
  );
  return vehicle;
}

function addElectronicAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 99 in popup, ADD Electronic Accessories generic popup Message function"
  );
  return vehicle;
}

function deletePowertrainMessage(vehicle, optionDetail) {
  console.log(
    "Line 106 in popup, DELETE Powertrain generic popup Message function"
  );
  return vehicle;
}

function deleteExteriorColorMessage(vehicle, optionDetail) {
  console.log(
    "Line 113 in popup, DELETE Exterior Color generic popup Message function"
  );
  return vehicle;
}

function deleteInteriorColorMessage(vehicle, optionDetail) {
  console.log(
    "Line 120 in popup, DELETE Interior Color generic popup Message function"
  );
  return vehicle;
}

function deleteWheelsMessage(vehicle, optionDetail) {
  console.log(
    "Line 127 in popup, DELETE Interior Color generic popup Message function"
  );
  return vehicle;
}

function deletePackagesMessage(vehicle, optionDetail) {
  console.log(
    "Line 134 in popup, DELETE Packages generic popup Message function"
  );
  return vehicle;
}

function deleteExteriorAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 141 in popup, DELETE Exterior Accessories generic popup Message function"
  );
  return vehicle;
}

function deleteInteriorAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 148 in popup, DELETE Interior Accessories generic popup Message function"
  );
  return vehicle;
}

function deleteElectronicAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 155 in popup, DELETE Electronic Accessories generic popup Message function"
  );
  return vehicle;
}

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
