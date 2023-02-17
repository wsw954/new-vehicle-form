import { modelOptions } from "/data/honda/civic/options";
import { getComponents } from "/data/honda/civic/components";
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

//Main handler function
export const addActionHandler = (vehicle, optionDetail) => {
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      return extColorAdd(vehicle, optionDetail);
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      vehicle = packagesAction(vehicle, optionDetail);
      vehicle = packagesAddComponents(vehicle, optionDetail);
      return vehicle;
    case "Exterior Accessories":
      return extAccAdd(vehicle, optionDetail);
    case "Interior Accessories":
      return intAccAdd(vehicle, optionDetail);
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

function extColorAdd(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  const optionGroupName = "Interior Color";
  const extraColors = {
    "Sedan EX": {
      ec4: { name: "Gray Cloth", price: 0, trim: [], serial: "ic2" },
      ec10: { name: "Gray Cloth", price: 0, trim: [], serial: "ic2" },
    },
    "Sedan Touring": {
      ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
      ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    },
    "Hatchback EX-L": {
      ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
      ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    },
    "Hatchback Sport Touring": {
      ec4: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
      ec10: { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },
    },
  };

  if (extraColors[updatedVehicle.selected.trim]) {
    const color =
      extraColors[updatedVehicle.selected.trim][optionDetail.serial];
    if (color) {
      updatedVehicle = clearChoicesSelected(vehicle, optionGroupName);
      return addOptionInChoicesAvailable(
        updatedVehicle,
        optionGroupName,
        color
      );
    } else {
      return removeOptionInChoicesAvailable(
        updatedVehicle,
        optionGroupName,
        extraColors[updatedVehicle.selected.trim]["ec4"]
      );
    }
  } else {
    return updatedVehicle;
  }
}

function extAccAdd(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  let arrayExOptions = [];
  switch (optionDetail.serial) {
    case "ea5":
      arrayExOptions = ["ea6"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;
    case "ea6":
      arrayExOptions = ["ea5"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;

    default:
      return updatedVehicle;
  }
}

function intAccAdd(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  let arrayExOptions = [];
  switch (optionDetail.serial) {
    case "ia1":
      arrayExOptions = ["ia6"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;
    case "ia6":
      arrayExOptions = ["ia1"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;
    case "ia7":
      arrayExOptions = ["ia10"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;
    case "ia10":
      arrayExOptions = ["ia7"];
      updatedVehicle = deleteMutuallyExclusiveOptions(
        vehicle,
        optionDetail.groupName,
        arrayExOptions
      );
      return updatedVehicle;
    default:
      return updatedVehicle;
  }
}

//Handles special actions for specific sets of packages selected
function packagesAction(vehicle, optionDetail) {
  let updatedVehicle = { ...vehicle };
  let mutuallyExclusivePackages = [];
  switch (optionDetail.serial) {
    case "pk1":
      mutuallyExclusivePackages = ["pk3", "pk6", "pk8"];
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
    case "pk2":
      mutuallyExclusivePackages = ["pk4", "pk9"];
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
    case "pk3":
      mutuallyExclusivePackages = ["pk1", "pk6", "pk8"];
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
    case "pk4":
      mutuallyExclusivePackages = ["pk2", "pk9"];
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
    case "pk6":
      mutuallyExclusivePackages = ["pk1", "pk3", "pk8"];
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
    case "pk8":
      mutuallyExclusivePackages = ["pk1", "pk3", "pk6"];
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
    case "pk9":
      mutuallyExclusivePackages = ["pk2", "pk4"];
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

function extAccDelete(vehicle, optionDetail) {
  console.log("Line  124 in action");
  return vehicle;
}

function addOptionInChoicesAvailable(vehicle, optionGroupName, choice) {
  const optionGroup = vehicle.options.find(
    (option) => option.name === optionGroupName
  );
  const objectExists = optionGroup.choicesAvailable.some(
    (option) => option.serial === choice.serial
  );
  if (optionGroup) {
    if (!objectExists) {
      optionGroup.choicesAvailable = [...optionGroup.choicesAvailable, choice];
    }
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

function clearChoicesSelected(vehicle, optionGroupName) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesSelected = [];
  }
  return vehicle;
}

function deleteMutuallyExclusiveOptions(vehicle, optionGroupName, arr) {
  const optionGroup = vehicle.selected.options.find(
    (option) => option.groupName === optionGroupName
  );
  if (optionGroup) {
    optionGroup.choicesSelected = optionGroup.choicesSelected.filter(
      (choice) => {
        return !arr.includes(choice.serial);
      }
    );
  }
  return vehicle;
}
