import { modelOptions } from "/data/honda/civic/options";

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

//Handles options selected from Dropdown
function addSingleOption(vehicle, { groupName, serial }) {
  const updatedVehicle = { ...vehicle };
  const optionGroup = optionGrpAvailable.get(groupName);
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === serial
  );

  updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  ).choicesSelected = [optionSelected];
  return updatedVehicle;
}

function handleMultipleOption(vehicle, { groupName, serial, checked }) {
  const updatedVehicle = { ...vehicle };
  const optionGroup = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  // Check if object with serial value already exists in array
  const objectExists = optionGroup.choicesSelected.some(
    (choice) => choice.serial === serial
  );

  if (!objectExists && checked) {
    optionGroup.choicesSelected = [
      ...optionGroup.choicesSelected,
      modelOptions
        .find((e) => e.name === groupName)
        .choicesAvailable.find((c) => c.serial === serial),
    ];
  } else if (!checked) {
    optionGroup.choicesSelected = optionGroup.choicesSelected.filter(
      (choice) => choice.serial !== serial
    );
  }
  return updatedVehicle;
}
