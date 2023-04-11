import { modelOptions, trims } from "/data/honda/civic/options";
import {
  exteriorColorAction,
  getPackageSiblings,
  getPackageRivals,
  getExteriorAccessoriesRivals,
  exteriorAccessoriesInclusives,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

function defaultHandler(vehicle, optionDetail) {
  console.log("Default handler called, since no special function required");
  return vehicle;
}

const addFunctionMap = {
  addExteriorColor: addExteriorColor,
  addPackages: addPackages,
  addExteriorAccessories: addExteriorAccessories,
  //   addInteriorAccessories: addInteriorAccessories,
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
  updatedVehicle = addPackageSiblings(vehicle, serial);
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

function deletePackages(vehicle, optionDetail) {
  const { groupName, serial } = optionDetail;
  let updatedVehicle = deletePackageSiblings(vehicle, serial);
  const rivals = getPackageRivals(vehicle, optionDetail);
  //Check for package rivals, & mark popup false
  if (rivals.length > 0) {
    rivals.forEach((sibling) => {
      sibling.popup = false;
    });
  }
  return updatedVehicle;
}

function addExteriorAccessories(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const { groupName, serial } = optionDetail;
  const rivals = getExteriorAccessoriesRivals(vehicle, optionDetail);
  const exteriorAccOptionGroup = updatedVehicle.options.find(
    (o) => o.name === groupName
  );
  let selectedExternalAccessories = updatedVehicle.selected.options.find(
    (s) => s.groupName === groupName
  );

  if (rivals.length > 0) {
    rivals.forEach((rival) => {
      //Find any available option which is a rival and mark popup true
      exteriorAccOptionGroup.choicesAvailable.find(
        (ea) => ea.serial === rival.serial
      ).popup = true;
      //Find any selected option which is a rival and unselect it
      selectedExternalAccessories.choicesSelected.forEach((selectedExtAcc) => {
        if (rival.serial === selectedExtAcc.serial) {
          updatedVehicle = removeOptionInChoicesSelected(
            updatedVehicle,
            groupName,
            selectedExtAcc.serial
          );
        }
      });
    });
    //Finally, mark the current selected option popup false
    const choiceFound = selectedExternalAccessories.choicesSelected.find(
      (s) => s.serial === optionDetail.serial
    );

    if (choiceFound) {
      choiceFound.popup = false;
    }
  }
  return updatedVehicle;
}

function deleteExteriorAccessories(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const { groupName, serial, package: packageID } = optionDetail;

  const rivals = getExteriorAccessoriesRivals(vehicle, optionDetail);
  const exteriorAccOptionGroup = updatedVehicle.options.find(
    (o) => o.name === groupName
  );
  if (rivals.length > 0) {
    rivals.forEach((rival) => {
      exteriorAccOptionGroup.choicesAvailable.find(
        (ea) => ea.serial === rival.serial
      ).popup = false;
    });
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
  const { serial, package: packageID } = optionDetail;
  let updatedVehicle = { ...vehicle };
  if (packageID) {
    //Adjust the optionDetail to pass to deletePackages()
    optionDetail.groupName = "Packages";
    optionDetail.serial = packageID;
    updatedVehicle = deletePackages(updatedVehicle, optionDetail);
  }
  return updatedVehicle;
}

//These are secondary callback functions

function addPackageSiblings(vehicle, serial) {
  let updatedVehicle = { ...vehicle };
  const packageSiblings = getPackageSiblings(serial);
  if (packageSiblings.length > 0) {
    packageSiblings.forEach((sibling) => {
      let choice = updatedVehicle.options
        .find((option) => option.name === sibling.groupName)
        .choicesAvailable.find((c) => c.serial === sibling.serial);
      if (choice) {
        const updatedChoice = {
          ...choice,
          package: serial,
          action: true,
          popup: true,
        };

        updatedVehicle = addOptionInChoicesSelected(
          updatedVehicle,
          sibling.groupName,
          updatedChoice
        );
      }
    });
  }
  return updatedVehicle;
}

function deletePackageSiblings(vehicle, serial) {
  let updatedVehicle = { ...vehicle };
  const packageSiblings = getPackageSiblings(serial);
  packageSiblings.forEach((option) => {
    updatedVehicle = removeOptionInChoicesSelected(
      vehicle,
      option.groupName,
      option.serial
    );
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

function removePackageRivals(vehicle, groupName, rivals) {
  let updatedVehicle = { ...vehicle };
  const packageOptionGroup = updatedVehicle.options.find(
    (o) => o.name === groupName
  );
  const selectedPackages = updatedVehicle.selected.options.find(
    (s) => s.groupName === groupName
  );

  rivals.forEach((rival) => {
    packageOptionGroup.choicesAvailable.find(
      (p) => p.serial === rival.serial
    ).popup = true;

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

function clearChoicesSelected(vehicle, optionGroupName) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesSelected = [];
  }
  return vehicle;
}

function filterChoicesAvailableByTrim(optionGroup, trimSerial) {
  return optionGroup.choicesAvailable.filter((option) =>
    option.trim.includes(trimSerial)
  );
}
