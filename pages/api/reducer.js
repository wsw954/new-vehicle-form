const ACTIONS = {
  MAKE_SELECTED: "make-selected",
  MODEL_SELECTED: "model-selected",
  TRIM_SELECTED: "trim-selected",
  OPTION_SELECTED: "option-selected",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      console.log(action.paylod);
      return { state }; //Return modelChoices
    case ACTIONS.MODEL_SELECTED:
      return { count: state.count - 1 }; //Return trimChoices
    case ACTIONS.TRIM_SELECTED:
      return { count: state.count - 1 }; //Return optionChoices
    case ACTIONS.OPTION_SELECTED:
      return { count: state.count - 1 }; //Call on modelValidate() function to return a state
    default:
      return state;
  }
};

export default reducer;
