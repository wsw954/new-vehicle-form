import { trims, modelOptions } from "/data/honda/civic/options";

const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));
const trimsAvailable = new Map(trims.map((e) => [e.name, e]));

//Main handler function
export const addSpecialAction = (vehicle, optionDetail) => {
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
      return vehicle;
    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

export const deleteSpecialAction = (vehicle, optionDetail) => {
  switch (optionDetail.groupName) {
    case "Powertrain":
      return vehicle;
    case "Exterior Color":
      console.log("Line 35 in deleteSpecialAction");
      return vehicle;
    case "Interior Color":
      return vehicle;
    case "Wheels":
      return vehicle;
    case "Packages":
      console.log("Line 40 in action, will have to unselect the components");
      return vehicle;
    case "Exterior Accessories":
      return vehicle;
    case "Interior Accessories":
      return vehicle;
    default:
      return vehicle;
  }
};

//
function packagesAdd(vehicle, optionDetail) {
  let testObject = {};
  switch (vehicle.selected.trim) {
    case "Sedan Sport":
      const components = [
        {
          groupName: "Exterior Accessories",
          name: "Splash Guard Set",
          serial: "ea24",
        },
        {
          groupName: "Interior Accessories",
          name: "All Season Floor Mats",
          serial: "ia1",
        },
        {
          groupName: "Interior Accessories",
          name: "Trunk Tray",
          serial: "ia10",
        },
      ];
      const result = [];
      components.forEach((component) => {
        const modelOption = optionGrpAvailable.get(component.groupName);

        if (modelOption) {
          const choice = modelOption.choicesAvailable.find(
            (choice) => choice.serial === component.serial
          );
          if (choice) {
            result.push({
              groupName: modelOption.name,
              name: choice.name,
              serial: choice.serial,
            });
          }
        }
      });
      vehicle.selected.options.forEach((option) => {
        result.forEach((element) => {
          if (option.groupName === element.groupName) {
            option.choicesSelected.push({
              name: element.name,
              serial: element.serial,
            });
          }
        });
      });

      return vehicle;
    case "Sedan EX":
      testObject = getPackageComponents(vehicle.selected.trim, optionDetail);

      //Add to the selected-Options-groupName-choicesSelected
      return vehicle;
    case "Sedan Touring":
      return vehicle;
    case "Hatchback Sport":
      return vehicle;
    case "Hatchback EX-L":
      return vehicle;
    case "Hatchback Sport Touring":
      return vehicle;
    case "Si":
      return vehicle;
    case "Type R":
      return vehicle;
    default:
      return vehicle;
  }
}

function getPackageComponents(trim, optionDetail) {
  switch (trim) {
    case "Sedan Sport":
      const optionGroup = optionGrpAvailable.get(optionDetail.groupName);
      const components = [
        {
          groupName: "Exterior Accessories",
          name: "Splash Guard Set",
          serial: "ea24",
        },
        {
          groupName: "Interior Accessories",
          name: "All Season Floor Mats",
          serial: "ia1",
        },
        {
          groupName: "Interior Accessories",
          name: "Trunk Tray",
          serial: "ia10",
        },
      ];

      const testObj = components.forEach((component) => () => {});

      console.log(compTestObject);

      //Get the package components,
      //Add to the selected-Options-groupName-choicesSelected
      return [{ components: ["ea24", "ia1", "ia10"] }];
    case "Sedan EX":
      //Get the package components,
      //Add to the selected-Options-groupName-choicesSelected
      return [{ name: "Sedan Ex Package 2" }];
    case "Sedan Touring":
      return vehicle;
    case "Hatchback Sport":
      return vehicle;
    case "Hatchback EX-L":
      console.log("LIne 41 in action, have to delete package components");
      return vehicle;
    case "Hatchback Sport Touring":
      return vehicle;
    case "Si":
      return vehicle;
    case "Type R":
      return vehicle;
    default:
      return vehicle;
  }
  return;
}

function findMatchingComponents(modelOptions, components) {
  console.log("Line 155 in action");
  const matchingComponents = [];
  for (let i = 0; i < modelOptions.length; i++) {
    const modelOption = modelOptions[i];
    for (let j = 0; j < modelOption.choicesAvailable.length; j++) {
      const choice = modelOption.choicesAvailable[j];
      for (let k = 0; k < components.length; k++) {
        const component = components[k];
        if (
          modelOption.groupName === component.groupName &&
          choice.serial === component.serial
        ) {
          matchingComponents.push(component);
        }
      }
    }
  }

  return matchingComponents;
}
