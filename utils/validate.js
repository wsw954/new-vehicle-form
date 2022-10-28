export const validate = (vehicle, itemSelected) => {
  //Get the current vehicle , then the latest itemSelected
  //  console.log(vehicle);
  //   console.log(itemSelected);

  //Get the relevant data files
  var dataFile = require("../data/" +
    vehicle.make.toLowerCase() +
    "/" +
    vehicle.model.toLowerCase() +
    "/options");
  // console.log(dataFile.optionsData.template);
  switch (itemSelected) {
    case "Trim":
      //Return the data file

      return dataFile.trimsData.trims;
      break;
    case "Option":
    //route to the model specific validate module to handle an option selected
    case "else":
      break;
    default:
      return dataFile.optionsData.template;
  }

  //Process what the validation should be

  //   console.log(dataFile.optionsData.list);

  //Return an object that lists the current choices available,
  //This processing will include deselecting items, selecting items and changing any choices now available
};
