import { modelOptions } from "/data/honda/civic/options";
import { getComponents } from "/data/honda/civic/components";
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

//Main handler function
export const addActionHandler = (vehicle, optionDetail) => {
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      return vehicle;
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      return packagesAdd(vehicle, optionDetail);
    case "Exterior Accessories":
      extAccAdd(vehicle, optionDetail);
      return vehicle;
    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

export const deleteActionHandler = (vehicle, optionDetail) => {
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      return vehicle;
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      return packagesDelete(vehicle, optionDetail);
    case "Exterior Accessories":
      extAccDelete(vehicle, optionDetail);

    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

export const componentActionHandler = (vehicle, optionDetail) => {
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.package
  );
  let updatedSelectedOptions = vehicle.selected.options.map((option) => {
    if (
      !packageComponents.some(
        (component) => component.groupName === option.groupName
      )
    ) {
      return option;
    }

    return {
      ...option,
      choicesSelected: option.choicesSelected.filter(
        (choice) =>
          !packageComponents.some(
            (component) =>
              component.groupName === option.groupName &&
              component.serial === choice.serial
          )
      ),
    };
  });
  let updatedVehicle = {
    ...vehicle,
    selected: {
      ...vehicle.selected,
      options: updatedSelectedOptions,
    },
  };
  return updatedVehicle;
};

function optionDeselect(vehicle, optionDetail) {
  //Get the option choices to deselect
  //Then deselect
}

function optionSelect() {}

function optionAvailability() {}

function optionUnvailability() {}

function packagesAdd(vehicle, optionDetail) {
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  const result = [];

  packageComponents.forEach((component) => {
    const modelOption = optionGrpAvailable.get(component.groupName);
    if (modelOption) {
      const choice = modelOption.choicesAvailable.find(
        (choice) => choice.serial === component.serial
      );
      if (choice) {
        result.push({
          groupName: modelOption.name,
          name: choice.name,
          price: choice.price,
          trim: choice.trim,
          serial: choice.serial,
          package: optionDetail.serial,
        });
      }
    }
  });

  vehicle.selected.options.forEach((option) => {
    result.forEach((element) => {
      if (option.groupName === element.groupName) {
        option.choicesSelected.push({
          name: element.name,
          price: element.price,
          trim: element.trim,
          serial: element.serial,
          package: element.package,
        });
      }
    });
  });
  return vehicle;
}

function packagesDelete(vehicle, optionDetail) {
  //Retrieves the package components stored in separate file
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  for (const component of packageComponents) {
    const optionGroup = vehicle.selected.options.find(
      (o) => o.groupName === component.groupName
    );
    if (!optionGroup) continue;
    optionGroup.choicesSelected = optionGroup.choicesSelected.filter(
      (choice) => choice.serial !== component.serial
    );
  }
  return vehicle;
}

function extAccAdd(vehicle, optionDetail) {}

function extAccDelete(vehicle, optionDetail) {
  console.log("Line  124 in action");
  return vehicle;
}
