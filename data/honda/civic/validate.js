import { modelOptions } from "/data/honda/civic/options";

import {
  addActionHandler,
  deleteActionHandler,
  componentActionHandler,
} from "./action";

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
  const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
  const optionGroupSelected = updatedVehicle.selected.options.find(
    (os) => os.groupName === optionDetail.groupName
  );
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === optionDetail.serial
  );
  if (optionDetail.checked) {
    if (
      !optionGroupSelected.choicesSelected.find(
        (choice) => choice.serial === optionSelected.serial
      )
    ) {
      if ("action" in optionSelected) {
        updatedVehicle = addActionHandler(updatedVehicle, optionDetail);
      }
      optionGroupSelected.choicesSelected.push(optionSelected);
    }
  } else {
    if ("action" in optionSelected) {
      updatedVehicle = deleteActionHandler(updatedVehicle, optionDetail);
    }
    if (optionDetail.package != null) {
      //The option unselected is a component of a previously selected package
      updatedVehicle = componentActionHandler(updatedVehicle, optionDetail);
    }
    optionGroupSelected.choicesSelected =
      optionGroupSelected.choicesSelected.filter(
        (choice) => choice.serial != optionSelected.serial
      );
  }

  return updatedVehicle;
}
