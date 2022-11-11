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

export default function Home() {
  //Track the selected vehicle choices
  const [vehicle, updateVehicle] = useState({
    make: "",
    model: "",
    trim: "",
    options: [{}],
  });

  //Track the selected vehicle choices
  // const [options, updateOptions] = useState({
  //   name: "",
  //   choices: [{}],
  // });

  //Hook to retrieve form choices
  const [formChoices, dispatch] = useReducer(reducer, {
    models: [{}],
    trims: [],
    options: [{}],
  });

  //Helper function
  const handleMakeSelected = (make) => {
    //Reset vehicle state to be just make
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        make: make,
        model: "",
        trim: "",
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
        trim: "",
        options: [{}],
      };
    });

    dispatch({
      type: "MODEL_SELECTED",
      payload: { make: vehicle.make, model: model },
    });
  };

  //Helper function
  const handleTrimSelected = (trim, serial) => {
    //Add trim to vehicle object & clear out all options
    updateVehicle((vehicle) => {
      return { ...vehicle, trim: trim, options: [{}] };
    });

    //Pass into dispatch the name & serial of the trim selected
    dispatch({
      type: "TRIM_SELECTED",
      payload: {
        make: vehicle.make,
        model: vehicle.model,
        trimSelected: trim,
        serial: serial,
      },
    });
  };

  //Helper function
  const handleOptionSelected = (optionGroup, name, serial) => {
    updateVehicle((vehicle) => {
      return {
        ...vehicle,
        options: [
          {
            name: optionGroup,
            choice: name,
            serial: serial,
          },
        ],
      };
    });

    // dispatch({
    //   type: "OPTION_SELECTED",
    //   payload: {
    //     currVehicle: vehicle,
    //     optionSelected: {
    //       optionGroupName: optionGroup,
    //       choice: name,
    //       serial: serial,
    //     },
    //   },
    // });
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
              firstDisabled={vehicle.make != "" ? true : false}
            ></Dropdown>
          </fieldset>
          <br></br>
          {vehicle.make ? (
            <fieldset>
              <Dropdown
                name="Model"
                vehicle={vehicle}
                choices={formChoices.models}
                onChange={handleModelSelected}
                firstDisabled={vehicle.model != "" ? true : false}
              ></Dropdown>
            </fieldset>
          ) : (
            <br></br>
          )}
          <br></br>
          {vehicle.model ? (
            <fieldset>
              <Dropdown
                name="Trim"
                vehicle={vehicle}
                choices={formChoices.trims}
                onChange={handleTrimSelected}
                firstDisabled={
                  formChoices.trims.length === 1 || vehicle.trim != ""
                    ? true
                    : false
                }
              ></Dropdown>
            </fieldset>
          ) : (
            <br></br>
          )}
          <br></br>
          {formChoices.trims.length === 1 || vehicle.trim ? (
            <>
              <Options
                vehicle={vehicle}
                initialOptions={formChoices.options}
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
