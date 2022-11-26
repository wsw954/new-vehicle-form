// import { options } from "../../data/honda/civic/options";
import { makes } from "/data/make";
import { validate } from "/utils/validate";

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
          options: [{ group: "", choices: [{ name: "", serial: [] }] }], //Reset to default
        },
      };
      break;
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
          options: [{ group: "", choices: [{ name: "", serial: [] }] }], //Reset to default
        },
      };
      break;
    case ACTIONS.TRIM_SELECTED:
      var dataFile = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/options");
      var optionsForTrimSelected = dataFile.trimSelected(
        action.payload.trimSelected,
        action.payload.serial
      );
      return {
        ...vehicle,
        options: optionsForTrimSelected, //Update options available, per trim selected
        selected: {
          ...vehicle.selected,
          trim: action.payload.trim, //Update the trim selected
          options: [{ group: "", choices: [{ name: "", serial: [] }] }], //Reset to default
        },
      };
      break;
    case ACTIONS.OPTION_SELECTED:
      var dataFile = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/options");

      var updatedVehicle = dataFile.optionSelected(
        vehicle,
        action.payload.groupName,
        action.payload.name,
        action.payload.serial
      );

      return updatedVehicle;
      break;
    default:
      return { vehicle };
  }
};

export default reducer;
