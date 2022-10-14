import { makes } from "/data/make";

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTIONS:SELECTED",
};

//Temp hardcoded trim choices passed to index.js file
const trimChoices = ["Sedan LX", "Sedan Sport", "Sedan EX"];
//Temp stand in code for options
const optionChoices = [{ wheels: [], engines: [], intAcc: [] }];

const reducer = (formChoices, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      const modelsList = makes.find((obj) => obj.name === action.payload.make);
      const listModels = modelsList.models.map((make) => make.name);
      return { ...formChoices, models: listModels }; //Return  modelChoices
    case ACTIONS.MODEL_SELECTED:
      console.log(formChoices);
      // fetch the model JSON using the model name specified in url
      //Return an array of names of trims per model selected
      return { ...formChoices, trims: trimChoices }; //Return trimChoices
    case ACTIONS.TRIM_SELECTED:
      console.log(formChoices);
      console.log(action.payload.trim);
      return { ...formChoices, options: optionChoices }; //Return optionChoices
    case ACTIONS.OPTION_SELECTED:
      return { formChoices }; //Call on modelValidate() function to return a state
    default:
      return state;
  }
};

export default reducer;
