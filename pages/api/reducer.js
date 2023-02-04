import { makes } from "/data/make";

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTION_SELECTED",
};

const reducer = (vehicle, action) => {
  //Retrieve the relevant data file per make/model selected

  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      const modelsList = makes.find((obj) => obj.name === action.payload.make);
      const listModels = modelsList.models.map((make) => make);
      return {
        ...vehicle,
        models: listModels, //Update models available per make selected
        trims: [], //Clear out any prior trims available
        options: [], //Clear out all prior options available
        selected: {
          ...vehicle.selected,
          make: action.payload.make, //Add make selected
          model: "", //Clear out any prior selected model
          trim: "", //Clear out any prior selected trim
          options: [], //Reset to default
        },
      };

    case ACTIONS.MODEL_SELECTED:
      var dataFile = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        action.payload.model.toLowerCase() +
        "/options");
      return {
        ...vehicle,
        trims: dataFile.trims, //Update trims available, per model selected
        options: [], //Clear out all prior options available
        selected: {
          ...vehicle.selected,
          model: action.payload.model, //Update model selected
          trim: "", //Clear out the prior selected trim
          options: [], //Reset to default
        },
      };

    case ACTIONS.TRIM_SELECTED:
      var dataFile = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/validate");
      //Retrieve options available per trim, as well as default options selected

      var optionsData = dataFile.trimSelected(action.payload.serial);

      return {
        ...vehicle,
        options: optionsData.available, //Update options available, per trim selected
        selected: {
          ...vehicle.selected,
          trim: action.payload.trim, //Update the trim selected
          options: optionsData.selected, //Reset to default
        },
      };

    case ACTIONS.OPTION_SELECTED:
      console.log(vehicle);
      var dataFile = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/validate");

      var updatedVehicle = dataFile.handleOptionSelected(
        vehicle,
        action.payload.optionDetail
      );
      return {
        ...vehicle,
        options: updatedVehicle.options,
        selected: updatedVehicle.selected,
      };

    default:
      return { vehicle };
  }
};

export default reducer;
