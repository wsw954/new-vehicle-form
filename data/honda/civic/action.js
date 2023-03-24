import { modelOptions, trims } from "/data/honda/civic/options";
import {
  exteriorColorAction,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

function defaultHandler(vehicle, optionDetail) {
  console.log("Default handler called, since no special function required");
  return vehicle;
}

const addFunctionMap = {
  addPowertrain: addPowertrain,
  addExteriorColor: addExteriorColor,
  addPackages: addPackages,
  addExteriorAccessories: addExteriorAccessories,
  addInteriorAccessories: addInteriorAccessories,
};

const deleteFunctionMap = {
  deletePackages: deletePackages,
  deleteExteriorAccessories: deleteExteriorAccessories,
  deleteInteriorAccessories: deleteInteriorAccessories,
};

const addOptionFunctionMap = modelOptions.reduce((acc, option) => {
  let functionName = `add${option.name.split(" ").join("")}`;
  const fn = addFunctionMap[functionName] || defaultHandler;
  acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  return acc;
}, {});

const deleteOptionFunctionMap = modelOptions.reduce((acc, option) => {
  let functionName = `delete${option.name.split(" ").join("")}`;
  const fn = deleteFunctionMap[functionName] || defaultHandler;
  acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  return acc;
}, {});

export const addActionHandler = (vehicle, optionDetail) => {
  return (
    addOptionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

//Main delete handler function
export const deleteActionHandler = (vehicle, optionDetail) => {
  return (
    deleteOptionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

function addPowertrain(vehicle, optionDetail) {
  return vehicle;
}

function addExteriorColor(vehicle, optionDetail) {
  let additionalInteriorColor = exteriorColorAction(vehicle, optionDetail);
  const { colors, groupName } = additionalInteriorColor;
  if (Object.keys(colors).length > 0) {
    const updatedVehicle = clearChoicesSelected(vehicle, groupName);
    return addOptionInChoicesAvailable(updatedVehicle, groupName, colors);
  } else {
    let optionGroup = vehicle.options.find(
      (option) => option.name === additionalInteriorColor.groupName
    );
    if (optionGroup) {
      optionGroup.choicesAvailable = filterChoicesAvailableByTrim(
        optionGroup,
        vehicle.selected.trim.serial
      );
    }
  }
  return vehicle;
}

function addPackages(vehicle, optionDetail) {
  const { groupName, serial, checked, popup, action } = optionDetail;
  let updatedVehicle = { ...vehicle };
  const packageComponents = getComponents(vehicle.selected.trim, serial);
  packageComponents.forEach((component) => {
    const modelOption = optionsAvailable.get(component.groupName);
    if (modelOption) {
      const choice = modelOption.choicesAvailable.find(
        (choice) => choice.serial === component.serial
      );
      if (choice) {
        let updatedChoice = {
          ...choice,
          package: serial,
          action: true,
          popup: true,
        };
        updatedVehicle = addOptionInChoicesSelected(
          vehicle,
          component.groupName,
          updatedChoice
        );
      }
    }
  });
  const siblings = getExclusiveSiblings(vehicle, optionDetail);

  return updatedVehicle;
}

function addExteriorAccessories(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  if (exteriorAccessoriesExclusives.hasOwnProperty(optionDetail.serial)) {
    exteriorAccessoriesExclusives[optionDetail.serial].forEach(
      (exclusiveOption) => {
        updatedVehicle = removeOptionInChoicesSelected(
          vehicle,
          exclusiveOption.groupName,
          exclusiveOption.serial
        );
      }
    );
  }
  if (exteriorAccessoriesInclusives.hasOwnProperty(optionDetail.serial)) {
    exteriorAccessoriesInclusives[optionDetail.serial].forEach(
      (exclusiveOption) => {
        const modelOption = optionsAvailable.get(exclusiveOption.groupName);
        const choice = modelOption.choicesAvailable.find(
          (choice) => choice.serial === exclusiveOption.serial
        );
        updatedVehicle = addOptionInChoicesSelected(
          vehicle,
          exclusiveOption.groupName,
          choice
        );
      }
    );
  }
  return updatedVehicle;
}

function addInteriorAccessories(vehicle, optionDetail) {
  console.log("Line 156 in action, Interior Accessories ADD action function");
  return vehicle;
}

function deletePackages(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  packageComponents.forEach((option) => {
    updatedVehicle = removeOptionInChoicesSelected(
      vehicle,
      option.groupName,
      option.serial
    );
  });

  return updatedVehicle;
}

function deleteExteriorAccessories(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  if (exteriorAccessoriesInclusives.hasOwnProperty(optionDetail.serial)) {
    exteriorAccessoriesInclusives[optionDetail.serial].forEach(
      (exclusiveOption) => {
        updatedVehicle = removeOptionInChoicesSelected(
          vehicle,
          exclusiveOption.groupName,
          exclusiveOption.serial
        );
      }
    );
  }
  return vehicle;
}

function deleteInteriorAccessories(vehicle, optionDetail) {
  return vehicle;
}

function filterChoicesAvailableByTrim(optionGroup, trimSerial) {
  return optionGroup.choicesAvailable.filter((option) =>
    option.trim.includes(trimSerial)
  );
}

function clearChoicesSelected(vehicle, optionGroupName) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesSelected = [];
  }
  return vehicle;
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

function removeOptionInChoicesSelected(vehicle, optionGroupName, serial) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesSelected = optionGroup.choicesSelected.filter(
      (option) => option.serial !== serial
    );
  }
  return vehicle;
}

function removeOptionInChoicesAvailable(vehicle, optionGroupName, choice) {
  const optionGroup = vehicle.options.find(
    (option) => option.name === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesAvailable = optionGroup.choicesAvailable.filter(
      (option) => option.serial !== choice.serial
    );
  }
  return vehicle;
}

function addOptionInChoicesAvailable(vehicle, groupName, choice) {
  const optionGroup = vehicle.options.find(
    (option) => option.name === groupName
  );

  const objectExists = optionGroup.choicesAvailable.some(
    (option) => option.serial === choice.serial
  );

  if (!objectExists) {
    optionGroup.choicesAvailable.push(choice);
  }
  return vehicle;
}
