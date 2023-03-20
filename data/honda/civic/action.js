import { modelOptions, trims } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  getExclusiveSiblings,
  exteriorAccessoriesExclusives,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

const addOptionFunctionMap = modelOptions.reduce((acc, option) => {
  try {
    let functionName = `add${option.name.split(" ").join("")}`;
    const fn = eval(functionName);
    acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  } catch (e) {
    console.error("Add Function for " + option.name + " is not defined");
    acc[option.name] = (vehicle, optionDetail) => vehicle;
  }
  return acc;
}, {});

const deleteOptionFunctionMap = modelOptions.reduce((acc, option) => {
  try {
    let functionName = `delete${option.name.split(" ").join("")}`;
    const fn = eval(functionName);
    acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  } catch (e) {
    console.error("Delete Function for " + option.name + " is not defined");
    acc[option.name] = (vehicle, optionDetail) => vehicle;
  }
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
  console.log("Line 52 in action, Powertrain generic add action function");
  return vehicle;
}

//The exterior color selection has some effect on the interior color choices available
//Depending on the color chosen, and the trim selected
function addExteriorColor(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  if (extraColors[updatedVehicle.selected.trim.name]) {
    const color =
      extraColors[updatedVehicle.selected.trim.name][optionDetail.serial];
    if (color) {
      updatedVehicle = clearChoicesSelected(
        vehicle,
        extraColors.optionGroupName
      );
      return addOptionInChoicesAvailable(
        updatedVehicle,
        extraColors.optionGroupName,
        color
      );
    } else {
      return removeOptionInChoicesAvailable(
        updatedVehicle,
        extraColors.optionGroupName,
        extraColors[updatedVehicle.selected.trim.name]["ec4"]
      );
    }
  } else {
    return updatedVehicle;
  }
}

function addInteriorColor(vehicle, optionDetail) {
  console.log("Line 57 in action, Interior Color generic ADD action function");
  return vehicle;
}

function addWheels(vehicle, optionDetail) {
  console.log("Line 62 in action, Wheels generic ADD action function");
  return vehicle;
}

function addPackages(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
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
        let updatedChoice = {
          ...choice,
          package: optionDetail.serial,
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

function addElectronicAccessories(vehicle, optionDetail) {
  console.log(
    "Line 161 in action, Electronic Accessories generic ADD action function"
  );
  return vehicle;
}

function deletePowertrain(vehicle, optionDetail) {
  console.log("Line 72 in action, Powertrain generic DELETE action function");
  return vehicle;
}

function deleteExteriorColor(vehicle, optionDetail) {
  console.log("Line 173 in action, generic DELETE action function");
  return vehicle;
}
function deleteInteriorColor(vehicle, optionDetail) {
  console.log("Line 80 Interior Color generic DELETE action function");
  return vehicle;
}

function deleteWheels(vehicle, optionDetail) {
  console.log("Line 85, Wheels generic DELETE action function");
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

function deleteElectronicAccessories(vehicle, optionDetail) {
  console.log(
    "Line 96 in action, Electronic Accessories generic DELETE action function"
  );
  return vehicle;
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
