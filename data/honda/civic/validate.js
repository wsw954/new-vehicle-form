import { modelOptions } from "/data/honda/civic/options";

//Use a Map to store the option groups and choices available, so that you can look up these values more efficiently
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

//Retrieve options available, as well as default options selected
export const trimSelected = (trim, serialSelected) => {
  //Retrieve all options available, per trim selected
  var optionsAvailable = modelOptions.map((option) => {
    return {
      ...option,
      choicesAvailable: option.choicesAvailable.filter((choice) =>
        choice.trim.includes(serialSelected)
      ),
    };
  });
  //Create default selected object, w/ blank choicesSelected
  var optionsSelected = modelOptions.map((option) => {
    return { groupName: option.name, choicesSelected: [] };
  });

  var optionsData = {
    available: optionsAvailable,
    selected: optionsSelected,
  };

  return optionsData;
};

//Main function to handle an option selection/deselection
export const handleOptionSelected = (
  vehicle,
  optionType,
  selected,
  unselected
) => {
  const optionGroup = optionGrpAvailable.get(selected.groupName);
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === selected.serial
  );

  if (optionType.optionType === "Single") {
    if ("action" in optionSelected) {
      // Adjust vehicle for the special action required for this option selection
      return specialAddActionHandler(
        vehicle,
        selected.groupName,
        selected.serial
      );
    } else {
      return addSingleOption(vehicle, optionGroup.name, optionSelected.serial);
    }
  } else if (optionType.optionType === "Multiple" && unselected.name === "") {
    console.log("Line 54 in validate");
    console.log(unselected);
    return addMultipleOption(vehicle, optionGroup.name, optionSelected.serial);
  } else if (optionType.optionType === "Multiple" && unselected.name != "") {
    console.log("Line 56 in validate");
    return deleteOptionSelected(
      vehicle,
      optionGroup.name,
      optionSelected.serial
    );
  }
};

//Handles option of type Single
function addSingleOption(vehicle, groupName, serial) {
  const updatedVehicle = { ...vehicle };
  const optionGroup = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  optionGroup.choicesSelected = [
    optionGrpAvailable
      .get(groupName)
      .choicesAvailable.find((c) => c.serial === serial),
  ];

  return updatedVehicle;
}

//Handles option of type Multiple
function addMultipleOption(vehicle, groupName, serial) {
  const updatedVehicle = { ...vehicle };
  const optionGroup = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  // Check if object with serial value already exists in array
  const objectExists = optionGroup.choicesSelected.some(
    (choice) => choice.serial === serial
  );
  if (!objectExists) {
    optionGroup.choicesSelected = [
      ...optionGroup.choicesSelected,
      modelOptions
        .find((e) => e.name === groupName)
        .choicesAvailable.find((c) => c.serial === serial),
    ];
  }

  return updatedVehicle;
}

function deleteOptionSelected(vehicle, groupName, serial) {
  console.log("Line 102 in validate");
  const updatedVehicle = { ...vehicle };
  const optionGroup = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );
  // Check if object with serial value already exists in array
  const objectExists = optionGroup.choicesSelected.some(
    (choice) => choice.serial === serial
  );
  if (objectExists) {
    optionGroup.choicesSelected = optionGroup.choicesSelected.filter(
      (choice) => choice.serial !== serial
    );
  }

  return updatedVehicle;
}

//Helper Function
function deleteSingleOption(groupName, serial) {
  const optionsGroup = optionGrpAvailable.get(groupName);

  return [optionsGroup.choicesAvailable.find((c) => c.serial === serial)];
}

//Handle all options w/ special actions
function specialAddActionHandler(vehicle, groupName, serial) {
  switch (groupName) {
    case "Powertrain":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Exterior Color":
      return exteriorColorAction(vehicle, groupName, serial);
      break;
    case "Interior Color":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Wheels":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Packages":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Exterior Accessories":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Interior Accessories":
      return addSingleOption(vehicle, groupName, serial);
      break;
  }
}

//Handle all options w/ special actions
function specialDeleteActionHandler(vehicle, groupType, groupName, serial) {
  //Yet to fill in appropriate code here
  return vehicle;
}

//Helper function to handle any special actions when Exterior Color selected
function exteriorColorAction(vehicle, groupName, serial) {
  //Outer switch to handle specified trim
  switch (vehicle.selected.trim) {
    case "Sedan Sport":
      //For Sedan Sport, the only Interior Color available is Black Cloth
      //Change the Interior Colors available to be only  Black Cloth
      vehicle.options.find(
        (a) => a.name === "Interior Color"
      ).choicesAvailable = modelOptions
        .find((e) => e.name === "Interior Color")
        .choicesAvailable.slice(0, 1);
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Sedan EX":
      //Only ec10 results in two available options for Interior Color
      if (serial === "ec10") {
        //Change the Interior Colors available to be BOTH Gray Cloth & Black Cloth
        vehicle.options.find(
          (a) => a.name === "Interior Color"
        ).choicesAvailable = modelOptions
          .find((e) => e.name === "Interior Color")
          .choicesAvailable.slice(0, 2);
        return addSingleOption(vehicle, groupName, serial);
      } else {
        //Changes the Interior Colors available to be only  Black Cloth
        vehicle.options.find(
          (a) => a.name === "Interior Color"
        ).choicesAvailable = modelOptions
          .find((e) => e.name === "Interior Color")
          .choicesAvailable.slice(0, 1);
        return addSingleOption(vehicle, groupName, serial);
      }
      break;
    case "Sedan Touring":
      return addSingleOption(vehicle, groupName, serial);

      break;
    case "Hatchback Sport":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Hatcback EX-L":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Hatchback Sport Touring":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Si":
      return addSingleOption(vehicle, groupName, serial);
      break;
    case "Type R":
      return addSingleOption(vehicle, groupName, serial);
      break;
  }
}
