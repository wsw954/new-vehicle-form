import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import { makes } from "/data/make";
import reducer from "/pages/api/reducer";
import Dropdown from "/components/dropdown.js";
import { v4 as uuidv4 } from "uuid";

//Retrieve list of makes for selection
const makeChoices = makes.map((make) => make);

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Home() {
  //Track the vehicle choices available for the form
  // const [formChoices, setFormChoices] = useState({
  //   makes: makeChoices,
  //   models: [],
  //   trims: [],
  //   options: [{ name: "", type: "", choices: [] }],
  // });

  //Track the selected vehicle choices
  const [vehicle, updateVehicle] = useState({
    make: null,
    model: null,
    trim: null,
    options: [{}],
  });

  //Hook to retrieve form choices
  const [formChoices, dispatch] = useReducer(reducer, {
    makes: makeChoices,
    models: [{}],
    trims: [{}],
    options: [{}],
  });

  //useReducer hook, which returns the current state and a dispatch function
  // const [vehicle, dispatch2] = useReducer(reducer, {
  //   make: "",
  //   model: "",
  //   year: 0,
  //   trim: "",
  //   options: [{}],
  // });

  //Helper function
  const handleMakeSelected = (event) => {
    //Reset vehicle state to be just make
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        make: event.target.value,
        model: null,
        trim: null,
        options: [{}],
      };
    });
    dispatch({
      type: "MAKE_SELECTED",
      payload: { make: event.target.value },
    });
  };

  //Helper function
  const handleModelSelected = (event) => {
    //Reset the vehicle to be clear out trims and options
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        model: event.target.value,
        trim: null,
        options: [{}],
      };
    });

    dispatch({
      type: "MODEL_SELECTED",
      payload: { make: vehicle.make, model: event.target.value },
    });
  };

  //Helper function
  const handleTrimSelected = (event) => {
    updateVehicle((vehicle) => {
      return { ...vehicle, trim: event.target.value, options: [{}] };
    });

    dispatch({
      type: "TRIM_SELECTED",
      payload: {
        make: vehicle.make,
        model: vehicle.model,
        trim: event.target.value,
      },
    });

    console.log("Handle Trim Selected");
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(e);
    const data = new FormData(e.target);
    // console.log(Object.fromEntries(data.entries()));
    //Insert code to call database API to save form data
  };

  return (
    <>
      <div>
        <h3>New Vehicle Form</h3>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Dropdown
              name="Make"
              choices={formChoices.makes}
              onChange={handleMakeSelected}
              firstDisabled={!vehicle.make ? null : true}
            ></Dropdown>
          </fieldset>
          <br></br>
          {!vehicle.make ? null : (
            <fieldset>
              <Dropdown
                name="Model"
                choices={formChoices.models}
                onChange={handleModelSelected}
                firstDisabled={!vehicle.model ? null : true}
              ></Dropdown>
            </fieldset>
          )}
          <br></br>
          {!vehicle.model ? null : (
            <fieldset>
              <Dropdown
                name="Trim"
                choices={formChoices.trims}
                onChange={handleTrimSelected}
                firstDisabled={
                  !vehicle.trim ? null || formChoices.trims.length < 2 : true
                }
              ></Dropdown>
            </fieldset>
          )}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
