import { modelOptions } from "/data/honda/accord/options";

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

//Helper function
export const handleOptionSelected = (vehicle, groupName, serial) => {
  //Create local var to store current vehicle info
  var updatedVehicle = { ...vehicle };

  //Retrieve the option group data
  var optionGroup = modelOptions.find((e) => e.name === groupName);

  //Retrieve the actual option selected
  var optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === serial
  );
  //Check if any special action required for the option selected
  if ("action" in optionSelected) {
    //Adjust vehicle for the special action required for this option selection
    updatedVehicle = optionSelected.action(
      vehicle,
      optionGroup.type,
      groupName,
      serial
    );
  } else {
    updatedVehicle = addOptionSelected(
      vehicle,
      optionGroup.type,
      groupName,
      serial
    );
  }
  return updatedVehicle;
};

//Add option selected
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

//Use a Map to store the option groups and choices available, so that you can look up these values more efficiently
const optionGroups = new Map(modelOptions.map((e) => [e.name, e]));

//Helper Function
function addSingleOption(groupName, serial) {
  const optionsGroup = optionGroups.get(groupName);
  return [optionsGroup.choicesAvailable.find((c) => c.serial === serial)];
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
