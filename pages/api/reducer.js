import { makes } from "/data/make";

// const modelsList = makes.find((obj) => obj.name === event.target.value);
// const listModels = modelsList.models.map((make) => make.name);

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTIONS:SELECTED",
};

const reducer = (vehicle, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      console.log(vehicle);
      console.log(action.payload);
      const modelsList = makes.find((obj) => obj.name === action.payload.make);

      return { ...vehicle, make: action.payload.make }; //Return  modelChoices
    case ACTIONS.MODEL_SELECTED:
      console.log(action);
      return { vehicle }; //Return trimChoices
    case ACTIONS.TRIM_SELECTED:
      return { vehicle }; //Return optionChoices
    case ACTIONS.OPTION_SELECTED:
      return { vehicle }; //Call on modelValidate() function to return a state
    default:
      return state;
  }
};

export default reducer;
