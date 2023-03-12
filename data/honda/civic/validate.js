import { modelOptions } from "/data/honda/civic/options";

import {
  addActionHandler,
  deleteActionHandler,
  deleteComponentActionHandler,
} from "./action";

import {
  addOptionPopUpMessageHandler,
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

export const handleOptionSelected = (vehicle, optionDetail) => {
  switch (optionDetail.optionType) {
    case "Single":
      return addSingleOption(vehicle, optionDetail);
    case "Multiple":
      return testFunction(vehicle, optionDetail);
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

// function handleMultipleOption2(vehicle, optionDetail) {
//   let updatedVehicle = { ...vehicle };
//   const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
//   const optionGroupSelected = updatedVehicle.selected.options.find(
//     (os) => os.groupName === optionDetail.groupName
//   );
//   const optionSelected = optionGroup.choicesAvailable.find(
//     (c) => c.serial === optionDetail.serial
//   );

//   if (
//     optionDetail.checked &&
//     !optionGroupSelected.choicesSelected.some(
//       (choice) => choice.serial === optionSelected.serial
//     )
//   ) {
//     console.log(optionDetail);
//     updatedVehicle = addActionHandler(updatedVehicle, optionDetail);

//     optionGroupSelected.choicesSelected.push(optionSelected);
//   } else if (!optionDetail.checked) {
//     updatedVehicle = deleteActionHandler(updatedVehicle, optionDetail);

//     if (optionDetail.package != null) {
//       updatedVehicle = deleteComponentActionHandler(
//         updatedVehicle,
//         optionDetail
//       );
//     }
//     optionGroupSelected.choicesSelected =
//       optionGroupSelected.choicesSelected.filter(
//         (choice) => choice.serial !== optionSelected.serial
//       );
//   }

//   return updatedVehicle;
// }

// function handleMultipleOption(vehicle, optionDetail) {
//   let updatedVehicle = { ...vehicle };
//   const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
//   const optionGroupSelected = updatedVehicle.selected.options.find(
//     (os) => os.groupName === optionDetail.groupName
//   );
//   const optionSelected = optionGroup.choicesAvailable.find(
//     (c) => c.serial === optionDetail.serial
//   );

//   if (
//     optionDetail.checked &&
//     !optionGroupSelected.choicesSelected.some(
//       (choice) => choice.serial === optionSelected.serial
//     )
//   ) {
//     if (optionDetail.popup) {
//       return (updatedVehicle = addOptionPopupMessageHandler(
//         vehicle,
//         optionDetail
//       ));
//     }
//     optionGroupSelected.choicesSelected =
//       optionGroupSelected.choicesSelected.filter(
//         (choice) => choice.serial !== optionSelected.serial
//       );
//   } else if ("action" in optionGroupSelected) {
//     updatedVehicle = addActionHandler(vehicle, optionDetail);
//   }
//   return updatedVehicle;
// }

function testFunction(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
  const optionGroupSelected = updatedVehicle.selected.options.find(
    (os) => os.groupName === optionDetail.groupName
  );
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === optionDetail.serial
  );
  //Run different conditional statements
  // console.log(optionDetail);
  if (optionDetail.checked) {
    // console.log(optionDetail.popup);
    if (!optionDetail.popup) {
      console.log("Line 156 in validate popup is false");
      // updatedVehicle = addOptionPopUpMessageHandler(vehicle, optionDetail);
      return updatedVehicle;
    }
    if ("action" in optionSelected) {
      console.log("Line 161 in validate action in optionSelected");
      updatedVehicle = addActionHandler(vehicle, optionDetail);
    }
    optionGroupSelected.choicesSelected.push(optionSelected);
  } else {
    if (optionDetail.popup) {
      console.log("Line 167 in validate popup is false");
      updatedVehicle = deleteOptionPopupMessageHandler(vehicle, optionDetail);
      return updatedVehicle;
    }
    if ("action" in optionSelected) {
      updatedVehicle = deleteActionHandler(vehicle, optionDetail);
    }
    optionGroupSelected.choicesSelected =
      optionGroupSelected.choicesSelected.filter(
        (choice) => choice.serial !== optionSelected.serial
      );
  }
  return updatedVehicle;
}
