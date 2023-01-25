import { modelOptions } from "/data/honda/civic/options";

import {
  addSpecialAction,
  deleteSpecialAction,
} from "/data/honda/civic/action";

//Use a Map to store the option groups and choices available, so that you can look up these values more efficiently
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

export const trimSelected = (serialSelected) => {
  //Returns an object for options available & a blank options selected array
  var optionsData = modelOptions.reduce(
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

//Handles a option selected from Dropdown
function addSingleOption(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
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
    updatedVehicle = addSpecialAction(updatedVehicle, optionDetail);
  }
  if (optionUnselected && "action" in optionUnselected) {
    updatedVehicle = deleteSpecialAction(vehicle, optionDetail);
  }
  updatedVehicle.selected.options.find(
    (os) => os.groupName === optionDetail.groupName
  ).choicesSelected = [optionSelected];
  return updatedVehicle;
}

//Handles options selected from checkboxes
function handleMultipleOption(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  //Get the entire group for the option available
  const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
  //Get the current entire group for options selected
  const optionGroupSelected = updatedVehicle.selected.options.find(
    (os) => os.groupName === optionDetail.groupName
  );
  //Get the single selected option
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === optionDetail.serial
  );

  if (optionDetail.checked) {
    //Check if any special action required for a checked option
    if ("action" in optionSelected) {
      updatedVehicle = addSpecialAction(updatedVehicle, optionDetail);
    }
    //Adds the single checked option
    optionGroupSelected.choicesSelected.push(optionSelected);
  } else {
    //Check if any special action for unchecked option
    if ("action" in optionSelected) {
      updatedVehicle = deleteSpecialAction(updatedVehicle, optionDetail);
    }
    //Removes the unchecked option
    optionGroupSelected.choicesSelected =
      optionGroupSelected.choicesSelected.filter(
        (choice) => choice.serial !== optionSelected.serial
      );
  }
  return updatedVehicle;
}
