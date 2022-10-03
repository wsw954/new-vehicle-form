import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import { makes } from "/data/make";
import reducer from "/pages/api/reducer";
import Dropdown from "/components/dropdown.js";
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
    updateVehicle((vehicle) => {
      return { ...vehicle, model: event.target.value };
    });

    console.log(event.target.value);
    //1. Call function to retriev trim data
    //2. Load this trim data into trim dropdown
  };

  //Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(e);
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    //Insert code to call database API to save form data
  };

  return (
    <>
      <div>
        <h3>New Vehicle Form</h3>
        <form onSubmit={handleSubmit}>
          <fieldset>
            {/* <Make onChange={handleMakeSelected}></Make> */}
            <Dropdown
              defaultValue={0}
              name="Make"
              choices={makeChoices}
              onChange={handleMakeSelected}
            ></Dropdown>
          </fieldset>
          <br></br>
          {!vehicle.make ? null : (
            <fieldset>
              <Dropdown
                defaultValue={0}
                name="Model"
                choices={formChoices.models}
                onChange={handleModelSelected}
              ></Dropdown>
            </fieldset>
          )}
          <br></br>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
