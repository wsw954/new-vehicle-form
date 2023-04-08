import { modelOptions, trims } from "/data/honda/civic/options";
import {
  exteriorColorAction,
  getPackageSiblings,
  getPackageRivals,
  getPackageRivals2,
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
  console.log("Line 54 in action, deleteActionHandle");
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
      //Resets to default the Interior Colors available
      optionGroup.choicesAvailable = filterChoicesAvailableByTrim(
        optionGroup,
        vehicle.selected.trim.serial
      );
    }
  }
  return vehicle;
}

function addPackages(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const { groupName, serial } = optionDetail;
  updatedVehicle = addPackageComponents(vehicle, serial);
  const rivals = getPackageRivals(vehicle, optionDetail);
  if (rivals.length > 0) {
    updatedVehicle = removePackageRivals(
      updatedVehicle,
      optionDetail.groupName,
      rivals
    );
  }

  let selectedPackages = updatedVehicle.selected.options.find(
    (o) => o.groupName === groupName
  );
  const index = selectedPackages.choicesSelected.findIndex(
    (choice) => choice.serial === serial
  );
  if (index !== -1) {
    selectedPackages.choicesSelected[index].popup = false;
  }

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
  const { groupName, serial } = optionDetail;

  let updatedVehicle = deletePackageComponents(vehicle, serial);
  const siblings = getPackageExclusiveSiblings(vehicle, optionDetail);

  if (siblings.length > 0) {
    let packageOptionGroup = updatedVehicle.options.find(
      (o) => o.name === groupName
    );

    siblings.forEach((rival) => {
      let siblingPackageAvailable = packageOptionGroup.choicesAvailable.find(
        (p) => p.serial === rival
      );
      siblingPackageAvailable.popup = false;
    });
  }
  return updatedVehicle;
}

function deleteExteriorAccessories(vehicle, optionDetail) {
  const { serial, package: packageID } = optionDetail;
  let updatedVehicle = { ...vehicle };
  if (exteriorAccessoriesInclusives.hasOwnProperty(serial)) {
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
  if (packageID) {
    //Adjust the optionDetail to pass to deletePackages()
    optionDetail.groupName = "Packages";
    optionDetail.serial = packageID;
    updatedVehicle = deletePackages(updatedVehicle, optionDetail);
  }
  return updatedVehicle;
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

function addPackageComponents(vehicle, serial) {
  let updatedVehicle = { ...vehicle };
  const packageSiblings = getPackageSiblings(serial);
  if (packageSiblings.length > 0) {
    packageSiblings.forEach((rival) => {
      let choice = updatedVehicle.options
        .find((option) => option.name === rival.groupName)
        .choicesAvailable.find((c) => c.serial === rival.serial);
      if (choice) {
        const updatedChoice = {
          ...choice,
          package: serial,
          action: true,
          popup: true,
        };

        updatedVehicle = addOptionInChoicesSelected(
          updatedVehicle,
          rival.groupName,
          updatedChoice
        );
      }
    });
  }
  return updatedVehicle;
}

function removePackageRivals(vehicle, groupName, rivals) {
  let updatedVehicle = { ...vehicle };
  const packageOption = updatedVehicle.options.find(
    (o) => o.name === groupName
  );
  rivals.forEach((rival) => {
    const rivalOption = packageOption.choicesAvailable.find(
      (p) => p.serial === rival.serial
    );
    rivalOption.popup = true;

    // Check if any rivals are selected
    const selectedPackages = updatedVehicle.selected.options.find(
      (s) => s.groupName === groupName
    );
    selectedPackages.choicesSelected.forEach((selectedPackage) => {
      if (rival.serial === selectedPackage.serial) {
        const rivalSiblings = getPackageSiblings(selectedPackage.serial);
        rivalSiblings.forEach((sibling) => {
          updatedVehicle = removeOptionInChoicesSelected(
            updatedVehicle,
            sibling.groupName,
            sibling.serial
          );
        });
        updatedVehicle = removeOptionInChoicesSelected(
          updatedVehicle,
          groupName,
          selectedPackage.serial
        );
      }
    });
  });
  return updatedVehicle;
}

function deletePackageComponents(vehicle, serial) {
  let updatedVehicle = { ...vehicle };
  const packageComponents = getComponents(serial);
  packageComponents.forEach((option) => {
    updatedVehicle = removeOptionInChoicesSelected(
      vehicle,
      option.groupName,
      option.serial
    );
  });

  return updatedVehicle;
}
