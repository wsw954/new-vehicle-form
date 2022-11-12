import { makes } from "/data/make";
import { validate } from "/utils/validate";

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTION_SELECTED",
};

const reducer = (formChoices, action) => {
  //Retrieve the relevant data file per make/model selected

  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      const modelsList = makes.find((obj) => obj.name === action.payload.make);
      const listModels = modelsList.models.map((make) => make);
      return { ...formChoices, models: listModels }; //Return  modelChoices
    case ACTIONS.MODEL_SELECTED:
      var dataFile = require("../../data/" +
        action.payload.make.toLowerCase() +
        "/" +
        action.payload.model.toLowerCase() +
        "/options");
      //Return an array of trims per model selected
      return { ...formChoices, trims: dataFile.trims }; //Return trimChoices
    case ACTIONS.TRIM_SELECTED:
      var dataFile = require("../../data/" +
        action.payload.make.toLowerCase() +
        "/" +
        action.payload.model.toLowerCase() +
        "/options");
      var optionsForTrimSelected = dataFile.trimSelected(
        action.payload.trimSelected,
        action.payload.serial
      );
      return { ...formChoices, options: optionsForTrimSelected }; //Return optionChoices
    case ACTIONS.OPTION_SELECTED:
      var dataFile = require("../../data/" +
        action.payload.vehicle.make.toLowerCase() +
        "/" +
        action.payload.vehicle.model.toLowerCase() +
        "/options");
      //Stand in code returns ALL Options for now
      var vehicleOptions = dataFile.optionSelected(
        action.payload.optionGroup,
        action.payload.serial
      );

      return vehicleOptions; //Return optionChoices

    default:
      return { formChoices };
  }
};

export default reducer;
