import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import { makes } from "/data/make";
import reducer from "/pages/api/reducer";
import Make from "/components/makedropdown.js";
import Model from "/components/modeldropdown.js";
import { v4 as uuidv4 } from "uuid";

//Retrieve list of makes for selection
const makeChoices = makes.map((make) => make.name);
//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Home() {
  //Track the vehicle choices available for the form
  const [formChoices, setFormChoices] = useState({
    makes: makeChoices,
    models: [],
    trims: [],
    options: [{ name: "", type: "", choices: [] }],
  });

  //Track the selected vehicle choices
  const [vehicle, updateVehicle] = useState({
    make: "",
    model: "",
    year: 0,
    trim: "",
    options: [{}],
  });

  //useReducer hook, which returns the current state and a di[spatch function
  const [state, dispatch] = useReducer(reducer, formChoices);

  //Helper function
  const handleMakeSelected = (event) => {

    console.log(event);
    const modelsList = makes.find((obj) => obj.name === event.target.value);
    const listModels = modelsList.models.map((make) => make.name);
    setFormChoices((prevState) => {
      return { ...prevState, models: listModels }; //Here it preserves the original state object
    });
    updateVehicle((vehicle) => {
      return { ...vehicle, make: event.target.value };
    });
    dispatch({
      type: "ACTIONS.MAKE_SELECTED",
      payload: { make: event.target.value },
    });
  };

  //Helper function
  const handleModelSelected = (event) => {
    console.log(event)
    console.log(formChoices);
    updateVehicle((vehicle) => {
      return { ...vehicle, model: event.target.value };
    });

    console.log(event.target.value);
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicle);
  };

  return (
    <>
      <div>
        <h3>New Vehicle Form</h3>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Make onChange={handleMakeSelected}></Make>
          </fieldset>
          <br></br>
          {!vehicle.make ? null : (
            <fieldset>
              <Model
                models={formChoices.models}
                onChange={handleModelSelected}
              ></Model>
            </fieldset>
          )}
          <br></br>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
