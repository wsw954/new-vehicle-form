import { modelOptions, trims } from "/data/honda/civic/options";
import {
  groupDataHandler,
  getPackageRivals,
  getExteriorAccessoriesRivals,
  getExteriorAccParentChild,
} from "/data/honda/civic/actionData";

const optionsAvailable = new Map(modelOptions.map((e) => [e.name, e]));

function defaultHandler(vehicle, optionDetail) {
  console.log(
    "Default Popup handler called, since no special function required"
  );
  return vehicle;
}

const addFunctionMap = {
  // addPowertrain: addPowertrainMessage,
  addPackagesMessage: addPackagesMessage,
  addExteriorAccessoriesMessage: addExteriorAccessoriesMessage,
  addInteriorAccessoriesMessage: addInteriorAccessoriesMessage,
};

const deleteFunctionMap = {
  deletePowertrainMessage: deletePowertrainMessage,
  // deletePackagesMessage: deletePackagesMessage,
  deleteExteriorAccessoriesMessage: deleteExteriorAccessoriesMessage,
  deleteInteriorAccessoriesMessage: deleteInteriorAccessoriesMessage,
};

const addOptionPopupFunctionMap = modelOptions.reduce((acc, option) => {
  let functionName = `add${option.name.split(" ").join("")}Message`;
  const fn = addFunctionMap[functionName] || defaultHandler;
  acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  return acc;
}, {});

const deleteOptionPopupFunctionMap = modelOptions.reduce((acc, option) => {
  let functionName = `delete${option.name.split(" ").join("")}Message`;
  const fn = deleteFunctionMap[functionName] || defaultHandler;
  acc[option.name] = (vehicle, optionDetail) => fn(vehicle, optionDetail);
  return acc;
}, {});

export const addOptionPopupMessageHandler = (vehicle, optionDetail) => {
  return (
    addOptionPopupFunctionMap[optionDetail.groupName]?.(
      vehicle,
      optionDetail
    ) || vehicle
  );
};

export const deleteOptionPopupMessageHandler = (vehicle, optionDetail) => {
  return (
    deleteOptionPopupFunctionMap[optionDetail.groupName]?.(
      vehicle,
      optionDetail
    ) || vehicle
  );
};

function addPowertrainMessage(vehicle, optionDetail) {
  console.log(
    "Line 60 in popup, ADD Powertrain generic popup Message function"
  );
  return vehicle;
}

function addPackagesMessage(vehicle, optionDetail) {
  const { groupName } = optionDetail;
  let updatedVehicle = { ...vehicle };

  const rivals = getPackageRivals(vehicle, optionDetail);
  if (rivals.length > 0) {
    const selectedPackages = updatedVehicle.selected.options.find(
      (o) => o.groupName === groupName
    );
    rivals.forEach((rival) => {
      selectedPackages.choicesSelected.forEach((p) => {
        if (p.serial === rival.serial) {
          updatedVehicle.popup = {
            show: true,
            message: "This will remove " + p.name,
            detail: optionDetail,
          };
        }
      });
    });
  }
  return updatedVehicle;
}

function addExteriorAccessoriesMessage(vehicle, optionDetail) {
  const { groupName, serial } = optionDetail;
  let updatedVehicle = { ...vehicle };
  const rivals = getExteriorAccessoriesRivals(updatedVehicle, optionDetail);
  const parentChild = getExteriorAccParentChild(
    updatedVehicle.selected.trim.name,
    optionDetail
  );
  if (rivals.length > 0) {
    updatedVehicle = handleRivalsMessage(updatedVehicle, optionDetail, rivals);
  }
  if (parentChild.parent === serial) {
    updatedVehicle = handleParentMessage(
      updatedVehicle,
      optionDetail,
      parentChild
    );
  }
  if (parentChild.child.includes(serial)) {
    updatedVehicle = handleChildMessage(
      updatedVehicle,
      optionDetail,
      parentChild
    );
  }
  return updatedVehicle;
}

function addInteriorAccessoriesMessage(vehicle, optionDetail) {
  console.log(
    "Line 92 in popup, ADD Interior Accessories generic popup Message function"
  );
  return vehicle;
}

function deletePowertrainMessage(vehicle, optionDetail) {
  console.log(
    "Line 106 in popup, DELETE Powertrain generic popup Message function"
  );
  return vehicle;
}

function deletePackagesMessage(vehicle, optionDetail) {
  console.log(
    "Line 134 in popup, DELETE Packages generic popup Message function"
  );
  return vehicle;
}

function deleteExteriorAccessoriesMessage(vehicle, optionDetail) {
  const { action, groupName, package: packageID, serial } = optionDetail;
  let updatedVehicle = { ...vehicle };
  if (packageID != "") {
    let parentPackage = optionsAvailable
      .get("Packages")
      .choicesAvailable.find((choice) => choice.serial === packageID);
    updatedVehicle.popup = {
      show: true,
      message: "This will remove the Package- " + parentPackage.name,
      detail: optionDetail,
    };
  }

  return updatedVehicle;
}

function deleteInteriorAccessoriesMessage(vehicle, optionDetail) {
  const { action, groupName, package: packageID, serial } = optionDetail;
  let updatedVehicle = { ...vehicle };
  if (packageID != "") {
    let parentPackage = optionsAvailable
      .get("Packages")
      .choicesAvailable.find((choice) => choice.serial === packageID);
    updatedVehicle.popup = {
      show: true,
      message: "This will remove the Package- " + parentPackage.name,
      detail: optionDetail,
    };
  }

  return updatedVehicle;
}

function deleteComponentMessage(vehicle, optionDetail) {
  let newpopup = vehicle.popup;
  const { choicesAvailable } = optionsAvailable.get("Packages");
  const { package: serial } = optionDetail;
  const parentPackageName = choicesAvailable.find(
    (p) => p.serial === serial
  ).name;
  newpopup = {
    show: true,
    message:
      "If you remove " +
      optionDetail.name +
      " it will remove " +
      parentPackageName,
    detail: optionDetail,
  };
  vehicle.popup = newpopup;
  return vehicle;
}

function handleRivalsMessage(updatedVehicle, optionDetail, rivals) {
  const selectedPackages = updatedVehicle.selected.options.find(
    (o) => o.groupName === optionDetail.groupName
  );

  rivals.forEach((rival) => {
    selectedPackages.choicesSelected.forEach((p) => {
      if (p.serial === rival.serial) {
        updatedVehicle.popup = {
          show: true,
          message: "This will remove " + p.name,
          detail: optionDetail,
        };
      }
    });
  });

  return updatedVehicle;
}

function handleParentMessage(updatedVehicle, optionDetail, parentChild) {
  console.log("Line 215 in popup, a Parent was selected");

  return updatedVehicle;
}

function handleChildMessage(updatedVehicle, optionDetail, parentChild) {
  const { name, serial, groupName } = optionDetail;
  // Check if the child option serial exists in parentChildRelation
  if (parentChild.child.includes(serial)) {
    const currentOptionsAvailable = updatedVehicle.options.find(
      (o) => o.name === groupName
    ).choicesAvailable;
    // Find the parent option in the group
    const parentOption = currentOptionsAvailable.find(
      (o) => o.serial === parentChild.parent
    );
    updatedVehicle.popup = {
      show: true,
      message: "To add " + name + " you must also add " + parentOption.name,
      detail: optionDetail,
    };
  }
  return updatedVehicle;
}
