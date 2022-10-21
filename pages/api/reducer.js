import { makes } from "/data/make";

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTIONS:SELECTED",
};

//Temp stand in code for options
const optionChoices = [{ wheels: [], engines: [], intAcc: [] }];

const reducer = (formChoices, action) => {
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
        "/trims");
      //Return an array of trims per model selected
      return { ...formChoices, trims: dataFile.trimsData.trims }; //Return trimChoices
    case ACTIONS.TRIM_SELECTED:
      console.log(formChoices);
      console.log(action.payload);
      return { ...formChoices, options: optionChoices }; //Return optionChoices
    case ACTIONS.OPTION_SELECTED:
      return { formChoices }; //Call on modelValidate() function to return a state
    default:
      return state;
  }
};

export default reducer;
