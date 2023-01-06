import { modelOptions } from "/data/honda/civic/options";

//Use a Map to store the option groups and choices available, so that you can look up these values more efficiently
const optionGroups = new Map(modelOptions.map((e) => [e.name, e]));

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

export const handleOptionSelected = (vehicle, selected, deselected) => {
  //Retrieve the option group data
  const optionGroup = optionGroups.get(selected.groupName);
  // // Retrieve the actual option selected
  const optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === selected.serial
  );

  if ("action" in optionSelected) {
    // Adjust vehicle for the special action required for this option selection
    return specialAddActionHandler(
      vehicle,
      optionGroup.type,
      selected.groupName,
      selected.serial
    );
  } else {
    return addOptionSelected(
      vehicle,
      optionGroup.type,
      selected.groupName,
      selected.serial
    );
  }

  // if (deselected.name != "") {
  //   // Adjust vehicle for the special action required for this option selection
  //   return specialDeleteActionHandler(
  //     vehicle,
  //     optionGroup.type,
  //     groupName,
  //     serial
  //   );
  // } else {
  //   return deleteOptionSelected(vehicle, optionGroup.type, groupName, serial);
  // }
};

function addOptionSelected(vehicle, optionType, groupName, serial) {
  const updatedVehicle = { ...vehicle };
  const optionGroup = updatedVehicle.selected.options.find(
    (os) => os.groupName === groupName
  );

  switch (optionType) {
    case "Single":
      optionGroup.choicesSelected = addSingleOption(groupName, serial);
      break;
    case "Multiple":
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
      break;
  }

  return updatedVehicle;
}

function deleteOptionSelected(vehicle, optionType, groupName, serial) {
  //Yet to fill in appropriat code here
  const updatedVehicle = { ...vehicle };

  return updatedVehicle;
}

//Helper Function
function addSingleOption(groupName, serial) {
  const optionsGroup = optionGroups.get(groupName);

  return [optionsGroup.choicesAvailable.find((c) => c.serial === serial)];
}

//Helper Function
function deleteSingleOption(groupName, serial) {
  const optionsGroup = optionGroups.get(groupName);

  return [optionsGroup.choicesAvailable.find((c) => c.serial === serial)];
}

//Handle all options w/ special actions
function specialAddActionHandler(vehicle, groupType, groupName, serial) {
  switch (groupName) {
    case "Powertrain":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Exterior Color":
      return exteriorColorAction(vehicle, groupType, groupName, serial);
      break;
    case "Interior Color":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Wheels":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Packages":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Exterior Accessories":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Interior Accessories":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
  }
}

//Handle all options w/ special actions
function specialDeleteActionHandler(vehicle, groupType, groupName, serial) {
  //Yet to fill in appropriate code here
  return vehicle;
}

//Helper function to handle any special actions when Exterior Color selected
function exteriorColorAction(vehicle, groupType, groupName, serial) {
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
      return addOptionSelected(vehicle, groupType, groupName, serial);
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
        return addOptionSelected(vehicle, groupType, groupName, serial);
      } else {
        //Change the Interior Colors available to be only  Black Cloth
        vehicle.options.find(
          (a) => a.name === "Interior Color"
        ).choicesAvailable = modelOptions
          .find((e) => e.name === "Interior Color")
          .choicesAvailable.slice(0, 1);
        return addOptionSelected(vehicle, groupType, groupName, serial);
      }
      break;
    case "Sedan Touring":
      return addOptionSelected(vehicle, groupType, groupName, serial);

      break;
    case "Hatchback Sport":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Hatcback EX-L":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Hatchback Sport Touring":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Si":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Type R":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
  }
}
