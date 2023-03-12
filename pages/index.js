import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import { makes } from "/data/make";
import reducer from "/pages/api/reducer";
import Dropdown from "/components/dropdown.js";
import Options from "/components/options.js";
import Popup from "../components/Popup";
import { v4 as uuidv4 } from "uuid";

//Retrieve list of makes for selection
const makeChoices = makes.map((make) => make);

//Call uuidv4, to use to create unique IDs
uuidv4();

//Set vehicle initial state
let initialState = {
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
  popup: {
    show: false,
    message: "",
    detail: {},
  },
};

export default function Home() {
  //Hook to retrieve form choices
  const [vehicle, dispatch] = useReducer(reducer, initialState);
  const [showPopup, setShowPopup] = useState(false);
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

  const handleOptionSelection = (optionDetail) => {
    if (vehicle.popup.show) {
      dispatch({
        type: "POPUP_SHOW",
        payload: optionDetail,
      });
      setShowPopup(true);
    } else {
      dispatch({ type: "OPTION_SELECTED", payload: optionDetail });
    }
  };

  //Helper function
  const handleOptionConfirmation = (optionDetail) => {
    e.preventDefault(e); // prevent form submission

    dispatch({
      type: "POPUP_CONFIRM",
      payload: optionDetail,
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
                onChange={handleOptionSelection}
              ></Options>
              <br></br>
            </>
          ) : (
            <br></br>
          )}
          <br></br>
          <div>
            {showPopup && (
              <Popup
                message={vehicle.popup.message}
                onConfirm={handleOptionConfirmation}
                onCancel={() => setShowPopup(false)}
              />
            )}
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
