import { modelOptions, trims } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

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
  console.log("line 23 in popup, ");
  const optionFunctionMap = {
    Packages: deletePackageMessage,
    Components: deleteComponentMessage,
  };
  if (optionDetail.package != "") {
    console.log(
      "Line 25 in popup, this is a component, generate popup to warn Package will be deleted"
    );
    return optionFunctionMap.Components?.(vehicle, optionDetail) || vehicle;
  }
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
    console.log(vehicle.selected.options);
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
    console.log(vehicle.selected.options);
  }
  return vehicle;
}

function deleteComponentMessage(vehicle, optionDetail) {
  const { choicesAvailable } = optionsAvailable.get("Packages");
  const { package: serial } = optionDetail;
  const parentPackageName = choicesAvailable.find(
    (p) => p.serial === serial
  ).name;
  const newPopup = {
    show: true,
    message:
      "If you remove " +
      optionDetail.name +
      " it will remove " +
      parentPackageName,
    detail: optionDetail,
  };

  return {
    ...vehicle,
    popup: newPopup,
  };
}
