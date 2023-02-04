import { modelOptions } from "/data/honda/civic/options";
import { getComponents } from "/data/honda/civic/components";
const optionGrpAvailable = new Map(modelOptions.map((e) => [e.name, e]));

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
  //Retrieves the package components stored in separate file
  const packageComponents = getComponents(
    vehicle.selected.trim,
    optionDetail.serial
  );
  const result = [];
  //Retrieves from main data file, the package components
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
        });
      }
    }
  });
  //Adds the components of package selected to the main vehicle state object
  vehicle.selected.options.forEach((option) => {
    result.forEach((element) => {
      if (option.groupName === element.groupName) {
        option.choicesSelected.push({
          name: element.name,
          price: element.price,
          trim: element.trim,
          serial: element.serial,
        });
      }
    });
  });
  return vehicle;
}
