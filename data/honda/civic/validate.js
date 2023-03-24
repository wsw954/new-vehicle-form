import { modelOptions } from "/data/honda/civic/options";

import {
  addActionHandler,
  deleteActionHandler,
  deleteComponentActionHandler,
} from "./action";

import {
  addOptionPopupMessageHandler,
  deleteOptionPopupMessageHandler,
} from "./popup";

//Use a Map to store the option groups and choices available, so that you can look up these values more efficiently
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

export const trimSelected = (serialSelected) => {
  //Returns an object for options available & a blank options selected array
  const optionsData = modelOptions.reduce(
    (acc, option) => {
      acc.available.push({
        ...option,
        choicesAvailable: option.choicesAvailable.filter((choice) =>
          choice.trim.includes(serialSelected)
        ),
      });
      acc.selected.push({ groupName: option.name, choicesSelected: [] });
      return acc;
    },
    { available: [], selected: [] }
  );
  return optionsData;
};

export const handleOptionSelected = (vehicle, optionDetail) => {
  switch (optionDetail.optionType) {
    case "Single":
      return addSingleOption(vehicle, optionDetail);
    case "Multiple":
      return handleMultipleOption(vehicle, optionDetail);
    default:
      return vehicle;
  }
};

function addSingleOption(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const { groupName, serial, checked, popup, action, unselected } =
    optionDetail;
  const choicesAvailable = optionGrpAvailable.get(
    optionDetail.groupName
  ).choicesAvailable;
  let optionSelected = choicesAvailable.find(
    (c) => c.serial === optionDetail.serial
  );
  let optionUnselected = null;
  if (optionDetail.unselected.name != null) {
    optionUnselected = choicesAvailable.find(
      (c) => c.serial === optionDetail.unselected.serial
    );
  }
  if ("action" in optionSelected) {
    updatedVehicle = addActionHandler(updatedVehicle, optionDetail);
  }
  if (optionUnselected && "action" in optionUnselected) {
    updatedVehicle = deleteActionHandler(vehicle, optionDetail);
  }
  updatedVehicle.selected.options.find(
    (os) => os.groupName === optionDetail.groupName
  ).choicesSelected = [optionSelected];
  return updatedVehicle;
}

function handleMultipleOption(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const { groupName, serial, checked, popup, action } = optionDetail;
  // Find the option group and selected option for this option detail.
  const optionGroup = optionGrpAvailable.get(groupName);
  const optionGroupSelected = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  // Find the option in the available choices for this option group.
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === serial
  );

  // Handle the option depending on whether it is being checked or unchecked.
  if (checked) {
    if (popup) {
      return addOptionPopupMessageHandler(vehicle, optionDetail);
    }
    // If the option is not a popup and has an action, perform the action.
    if (action) {
      updatedVehicle = addActionHandler(vehicle, optionDetail);
    }
    // Add the selected option to the selected choices if it doesn't already exist.
    if (!optionGroupSelected.choicesSelected.includes(optionSelected)) {
      optionGroupSelected.choicesSelected.push(optionSelected);
    }
  } else {
    if (popup) {
      return deleteOptionPopupMessageHandler(vehicle, optionDetail);
    }
    // If the option has an action, perform the action and update the vehicle.
    if ("action" in optionSelected) {
      updatedVehicle = deleteActionHandler(vehicle, optionDetail);
    }
    // Remove the selected option from the selected choices.
    optionGroupSelected.choicesSelected =
      optionGroupSelected.choicesSelected.filter(
        (choice) => choice.serial !== optionSelected.serial
      );
  }
  return updatedVehicle;
}

export const handlePopupConfirm = (vehicle, optionDetail) => {
  let updatedVehicle = { ...vehicle };
  const {
    groupName,
    serial,
    checked,
    package: packageID,
    action,
  } = optionDetail;
  switch (optionDetail.optionType) {
    case "Single":
      return updatedVehicle;
    case "Multiple":
      if (checked) {
        console.log("Add the Option, clicked on");
      } else {
        if (packageID != "") {
          updatedVehicle = deleteComponentActionHandler(vehicle, optionDetail);
        }
        console.log("Remove the Option clicked on");
      }

      return updatedVehicle;
    default:
      return updatedVehicle;
  }
};
