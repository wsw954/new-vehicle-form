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
      vehicle = packagesAction(vehicle, optionDetail);
      vehicle = packagesAddComponents(vehicle, optionDetail);
      return vehicle;
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
      return packagesDeleteComponents(vehicle, optionDetail);
    case "Exterior Accessories":
      extAccDelete(vehicle, optionDetail);

    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

//Handles special actions for specific sets of packages selected
function packagesAction(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  let mutuallyExclusivePackages = [];
  switch (optionDetail.serial) {
    case "pk1":
      mutuallyExclusivePackages = ["pk3", "pk8"];
      mutuallyExclusivePackages.forEach((muExcPackage) => {
        updatedVehicle = packagesDeleteComponents(updatedVehicle, {
          serial: muExcPackage,
        });
      });
      updatedVehicle = packageDeleteParentOption(
        vehicle,
        mutuallyExclusivePackages
      );

      return updatedVehicle;
    case "pk3":
      mutuallyExclusivePackages = ["pk1", "pk8"];
      mutuallyExclusivePackages.forEach((option) => {
        updatedVehicle = packagesDeleteComponents(updatedVehicle, {
          serial: option,
        });
        updatedVehicle = packageDeleteParentOption(
          vehicle,
          mutuallyExclusivePackages
        );
      });
      return updatedVehicle;
    case "pk8":
      mutuallyExclusivePackages = ["pk1", "pk3"];
      mutuallyExclusivePackages.forEach((muExcPackage) => {
        updatedVehicle = packagesDeleteComponents(updatedVehicle, {
          serial: muExcPackage,
        });
      });
      updatedVehicle = packageDeleteParentOption(
        vehicle,
        mutuallyExclusivePackages
      );
      return updatedVehicle;
    default:
      return updatedVehicle;
  }
}

//Handles situations direct unselection of an option is an active component of a package
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

function packagesAddComponents(vehicle, optionDetail) {
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

function packagesDeleteComponents(vehicle, optionDetail) {
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

function packageDeleteParentOption(vehicle, arr) {
  const packagesOption = vehicle.selected.options.find(
    (option) => option.groupName === "Packages"
  );
  if (packagesOption) {
    packagesOption.choicesSelected = packagesOption.choicesSelected.filter(
      (choice) => {
        return !arr.includes(choice.serial);
      }
    );
  }
  return vehicle;
}

function extAccAdd(vehicle, optionDetail) {}

function extAccDelete(vehicle, optionDetail) {
  console.log("Line  124 in action");
  return vehicle;
}
