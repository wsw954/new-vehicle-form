import { modelOptions, trims } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

export const popupMessageHandler = (vehicle, optionDetail) => {
  const { groupName, serial, checked, popup, action } = optionDetail;
  if (!checked) {
    if (optionDetail.package != "") {
      return deleteComponentMessage(vehicle, optionDetail);
    }
    return vehicle;
  } else {
    console.log("Checkbox was Selected");
    return vehicle;
  }
};

export const addOptionPopUpMessageHandler = (vehicle, optionDetail) => {
  const optionFunctionMap = {
    Packages: addPackageMessage,
  };
  return (
    optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

export const deleteOptionPopupMessageHandler = (vehicle, optionDetail) => {
  const optionFunctionMap = {
    Packages: deletePackageMessage,
  };

  return (
    optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

function addPackageMessage(vehicle, optionDetail) {
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
