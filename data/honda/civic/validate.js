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

const findOption = (choicesAvailable, serial) =>
  choicesAvailable.find((c) => c.serial === serial);

const updateChoicesSelected = (
  optionGroupSelected,
  optionSelected,
  checked
) => {
  if (checked) {
    if (
      !optionGroupSelected.choicesSelected.some(
        (choice) => choice.serial === optionSelected.serial
      )
    ) {
      optionGroupSelected.choicesSelected = [
        ...optionGroupSelected.choicesSelected,
        optionSelected,
      ];
    }
  } else {
    optionGroupSelected.choicesSelected =
      optionGroupSelected.choicesSelected.filter(
        (choice) => choice.serial !== optionSelected.serial
      );
  }
};

export const handleOptionSelected = (vehicle, optionDetail) => {
  const { optionType, groupName, serial, checked, unselected, popup, action } =
    optionDetail;
  let updatedVehicle = { ...vehicle };
  const optionGroup = optionGrpAvailable.get(groupName);
  const optionGroupSelected = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  const optionSelected = findOption(optionGroup.choicesAvailable, serial);
  const optionUnselected =
    unselected.name != null
      ? findOption(optionGroup.choicesAvailable, unselected.serial)
      : null;
  if (popup) {
    return checked
      ? addOptionPopupMessageHandler(vehicle, optionDetail)
      : deleteOptionPopupMessageHandler(vehicle, optionDetail);
  }

  if (action)
    updatedVehicle = checked
      ? addActionHandler(updatedVehicle, optionDetail)
      : deleteActionHandler(updatedVehicle, optionDetail);
  if (optionType === "Single")
    optionGroupSelected.choicesSelected = [optionSelected];
  else updateChoicesSelected(optionGroupSelected, optionSelected, checked);
  return updatedVehicle;
};

export const handlePopupConfirm = (vehicle, optionDetail) => {
  const { optionType, groupName, serial, checked, action } = optionDetail;
  let updatedVehicle = { ...vehicle };
  if (optionType === "Multiple") {
    const optionGroup = optionGrpAvailable.get(groupName);
    const optionGroupSelected = updatedVehicle.selected.options.find(
      (os) => os.groupName === groupName
    );
    const optionSelected = findOption(optionGroup.choicesAvailable, serial);
    if (action)
      updatedVehicle = checked
        ? addActionHandler(vehicle, optionDetail)
        : deleteActionHandler(vehicle, optionDetail);
    updateChoicesSelected(optionGroupSelected, optionSelected, checked);
  }

  return updatedVehicle;
};
