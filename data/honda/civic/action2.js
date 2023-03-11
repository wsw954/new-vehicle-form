import { modelOptions, trims } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

export const confirmHandler = (vehicle, optionDetail) => {
  const optionFunctionMap = {
    Packages: packageHandler,
  };
  return (
    optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

export const packageHandler = (vehicle, optionDetail) => {
  let updatedVehicle = { ...vehicle };
  const siblings = getExclusiveSiblings(vehicle, optionDetail);
  let optionGroup = vehicle.selected.options.find(
    (o) => o.groupName === optionDetail.groupName
  );
  let selectedChoices = optionGroup.choicesSelected;
  if (siblings.length === 0 || optionGroup.choicesSelected.length === 0) {
    updatedVehicle = addPackage(vehicle, optionDetail);
  } else {
    const matchingChoice = selectedChoices.find((choice) =>
      siblings.some((sibling) => choice.serial === sibling)
    );
    if (matchingChoice) {
      updatedVehicle = popupHandler(vehicle, optionDetail, matchingChoice);
    }
  }
  return updatedVehicle;
};

function addPackage(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const packageOption = optionsAvailable.get(optionDetail.groupName);
  const choice = packageOption.choicesAvailable.find(
    (choice) => choice.serial === optionDetail.serial
  );
  updatedVehicle = addOptionInChoicesSelected(
    vehicle,
    optionDetail.groupName,
    choice
  );
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  packageComponents.forEach((component) => {
    const modelOption = optionsAvailable.get(component.groupName);
    if (modelOption) {
      const choice = modelOption.choicesAvailable.find(
        (choice) => choice.serial === component.serial
      );
      if (choice) {
        let updatedChoice = { ...choice, package: optionDetail.serial };
        updatedVehicle = addOptionInChoicesSelected(
          vehicle,
          component.groupName,
          updatedChoice
        );
      }
    }
  });
  return updatedVehicle;
}

function addOptionInChoicesSelected(vehicle, optionGroupName, choice) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  const existingChoice = optionGroup.choicesSelected.find(
    (c) => c.serial === choice.serial
  );
  if (existingChoice) {
    optionGroup.choicesSelected.splice(
      optionGroup.choicesSelected.indexOf(existingChoice),
      1,
      choice
    );
  } else {
    optionGroup.choicesSelected.push(choice);
  }

  return vehicle;
}

function popupHandler(vehicle, optionDetail, popupDetail) {
  const message =
    "Selecting-" + optionDetail.name + "  Removes- " + popupDetail.name;

  const updatedPopup = { ...vehicle.popup, show: true, message: message };
  const updatedVehicle = { ...vehicle, popup: updatedPopup };
  console.log(updatedVehicle);
  return updatedVehicle;
}

//Main handler function
export const addActionHandler = (vehicle, optionDetail) => {
  const optionFunctionMap = {
    "Exterior Color": addExteriorColor,
    Packages: addPackageComponents,
    "Exterior Accessories": addExteriorAccessories,
    "Interior Accessories": addInteriorAccessories,
  };
  return (
    optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};
