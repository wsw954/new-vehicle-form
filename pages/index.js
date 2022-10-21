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
  //Track the selected vehicle choices
  const [vehicle, updateVehicle] = useState({
    make: null,
    model: null,
    trim: null,
    options: [{}],
  });

  //Hook to retrieve form choices
  const [formChoices, dispatch] = useReducer(reducer, {
    models: [{}],
    trims: [{}],
    options: [{}],
  });

  //Helper function
  const handleMakeSelected = (make) => {
    //Reset vehicle state to be just make
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        make: make,
        model: null,
        trim: null,
        options: [{}],
      };
    });
    dispatch({
      type: "MAKE_SELECTED",
      payload: { make: make },
    });
  };

  //Helper function
  const handleModelSelected = (model) => {
    //Reset the vehicle to be clear out trims and options
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        model: model,
        trim: null,
        options: [{}],
      };
    });

    dispatch({
      type: "MODEL_SELECTED",
      payload: { make: vehicle.make, model: model },
    });
  };

  //Helper function
  const handleTrimSelected = (trim) => {
    updateVehicle((vehicle) => {
      return { ...vehicle, trim: trim, options: [{}] };
    });

    dispatch({
      type: "TRIM_SELECTED",
      payload: {
        make: vehicle.make,
        model: vehicle.model,
        trim: trim,
      },
    });
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
              vehicle={vehicle}
              choices={makeChoices}
              onChange={handleMakeSelected}
              firstDisabled={vehicle.make != null ? true : false}
            ></Dropdown>
          </fieldset>
          <br></br>
          {!vehicle.make ? null : (
            <fieldset>
              <Dropdown
                name="Model"
                vehicle={vehicle}
                choices={formChoices.models}
                onChange={handleModelSelected}
                firstDisabled={vehicle.model != null ? true : false}
              ></Dropdown>
            </fieldset>
          )}
          <br></br>
          {!vehicle.model ? null : (
            <fieldset>
              <Dropdown
                name="Trim"
                vehicle={vehicle}
                choices={formChoices.trims}
                onChange={handleTrimSelected}
                firstDisabled={
                  formChoices.trims.length === 1 || vehicle.trim != null
                    ? true
                    : false
                }
              ></Dropdown>

              {console.log(formChoices.trims)}
            </fieldset>
          )}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
