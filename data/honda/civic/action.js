import { modelOptions } from "/data/honda/civic/options";
import {
  extraColors,
  getComponents,
  packageExclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

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

export const deleteActionHandler = (vehicle, optionDetail) => {
  const optionFunctionMap = {
    "Exterior Color": deleteExteriorColor,
    Packages: deletePackageComponents,
    "Exterior Accessories": deleteExteriorAccessories,
    "Interior Accessories": deleteInteriorAccessories,
  };
  return (
    optionFunctionMap[optionDetail.groupName]?.(vehicle, optionDetail) ||
    vehicle
  );
};

export const componentActionHandler = (vehicle, optionDetail) => {
  let updatedVehicle = removeOptionInChoicesSelected(
    vehicle,
    "Packages",
    optionDetail.package
  );
  let modifiedOptionDetail = { ...optionDetail, serial: optionDetail.package };
  updatedVehicle = deletePackageComponents(vehicle, modifiedOptionDetail);

  return updatedVehicle;
};

//The exterior color selection has some effect on the interior color choices available
//Depending on the color chosen, and the trim selected
function addExteriorColor(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };

  if (extraColors[updatedVehicle.selected.trim]) {
    const color =
      extraColors[updatedVehicle.selected.trim][optionDetail.serial];
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
        extraColors[updatedVehicle.selected.trim]["ec4"]
      );
    }
  } else {
    return updatedVehicle;
  }
}

function addPackageComponents(vehicle, optionDetail) {
  //First remove all mutually exclusive packages
  let updatedVehicle = packagesExclusions(
    vehicle,
    optionDetail,
    packageExclusives
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

function addExteriorAccessories(vehicle, optionDetail) {
  return vehicle;
}
function addInteriorAccessories(vehicle, optionDetail) {
  return vehicle;
}

function deleteExteriorColor(vehicle, optionDetail) {
  return vehicle;
}

function deletePackageComponents(vehicle, optionDetail) {
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  packageComponents.forEach((option) => {
    vehicle = removeOptionInChoicesSelected(
      vehicle,
      option.groupName,
      option.serial
    );
  });

  return vehicle;
}

function deleteExteriorAccessories(vehicle, optionDetail) {
  return vehicle;
}

function deleteInteriorAccessories(vehicle, optionDetail) {
  return vehicle;
}

function packagesExclusions(vehicle, optionDetail, exclusivity) {
  let updatedVehicle = { ...vehicle };
  const exclusives = exclusivity[optionDetail.serial] || [];

  if (exclusives) {
    exclusives.forEach((sibling) => {
      updatedVehicle = deletePackageComponents(updatedVehicle, {
        ...optionDetail,
        serial: sibling,
      });
      updatedVehicle = removeOptionInChoicesSelected(
        vehicle,
        "Packages",
        sibling
      );
    });
  }

  return updatedVehicle;
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
