import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import { makes } from "/data/make";
import reducer from "/pages/api/reducer";
import Dropdown from "/components/dropdown.js";
import Options from "/components/options.js";
import { v4 as uuidv4 } from "uuid";

//Retrieve list of makes for selection
const makeChoices = makes.map((make) => make);

//Call uuidv4, to use to create unique IDs
uuidv4();

//Set vehicle initial state
var initialState = {
  makes: makes.map((make) => make),
  models: [],
  trims: [],
  options: [],
  selected: {
    make: "",
    model: "",
    trim: "",
    options: [],
  },
};

export default function Home() {
  //Hook to retrieve form choices
  const [vehicle, dispatch] = useReducer(reducer, initialState);

  //Helper function
  const handleMakeSelected = (make) => {
    dispatch({
      type: "MAKE_SELECTED",
      payload: { make: make },
    });
  };

  //Helper function
  const handleModelSelected = (model) => {
    dispatch({
      type: "MODEL_SELECTED",
      payload: { model: model },
    });
  };

  //Helper function
  const handleTrimSelected = (trim, serial) => {
    //Pass into dispatch the name & serial of the trim selected
    dispatch({
      type: "TRIM_SELECTED",
      payload: {
        trim: trim,
        serial: serial,
      },
    });
  };

  //Helper function
  const handleOptionSelected = (optionType, selected, unselected) => {
    //Add code to handle option selected
    dispatch({
      type: "OPTION_SELECTED",
      payload: {
        optionType: optionType,
        selected: selected,
        unselected: unselected,
      },
    });
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(e);
    const data = new FormData(e.target);
    console.log("Submit Clicked");
  };

  return (
    <>
      <div className="container">
        <h3>New Vehicle Form</h3>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Dropdown
              name="Make"
              vehicle={vehicle}
              choices={makeChoices}
              onChange={handleMakeSelected}
              firstDisabled={vehicle.selected.make != "" ? true : false}
            ></Dropdown>
          </fieldset>
          <br></br>
          {vehicle.selected.make ? (
            <fieldset>
              <Dropdown
                name="Model"
                vehicle={vehicle}
                onChange={handleModelSelected}
                firstDisabled={vehicle.selected.model != "" ? true : false}
              ></Dropdown>
            </fieldset>
          ) : (
            <br></br>
          )}
          <br></br>
          {vehicle.selected.model ? (
            <fieldset>
              <Dropdown
                name="Trim"
                vehicle={vehicle}
                onChange={handleTrimSelected}
                firstDisabled={vehicle.selected.trim != "" ? true : false}
              ></Dropdown>
            </fieldset>
          ) : (
            <br></br>
          )}
          <br></br>
          {vehicle.trims.length === 1 || vehicle.selected.trim ? (
            <>
              <Options
                vehicle={vehicle}
                onChange={handleOptionSelected}
              ></Options>
            </>
          ) : (
            <br></br>
          )}
          <br></br>

          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
