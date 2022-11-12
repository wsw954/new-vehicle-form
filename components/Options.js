import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";
import CheckBoxGroup from "/components/checkboxgroup.js";
import reducer from "/pages/api/reducer";
//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, initialOptions }) {
  // Get the initial option groups & choice as per trim selected

  const [vehicleOptions, dispatch] = useReducer(reducer, initialOptions);

  var handleOptionSelected = (optionGroup, name, serial) => {
    dispatch({
      type: "OPTION_SELECTED",
      payload: {
        vehicle: vehicle,
        optionGroup: optionGroup,
        name: name,
        serial: serial,
      },
    });
  };

  var optionDropdowns = [];
  var optionCheckBoxes = [];

  function optionBuilder(optionsArray) {
    optionsArray.forEach((element) => {
      switch (element.type) {
        case "Single":
          //Return Dropdowns for each Option Group
          optionDropdowns.push(
            <div key={uuidv4(element.name)}>
              <Dropdown
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                onChange={handleOptionSelected}
                firstDisabled={element.choices.length === 1 ? true : false}
              ></Dropdown>
              <br></br>
              <br></br>
            </div>
          );
          break;
        case "Multiple":
          //Return Dropdowns for each Option Group
          optionCheckBoxes.push(
            <div key={uuidv4(element.name)}>
              <CheckBoxGroup
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                onChange={handleOptionSelected}
                firstDisabled={element.choices.length === 1 ? true : false}
              ></CheckBoxGroup>
              <br></br>
              <br></br>
            </div>
          );
          break;
      }
    });
  }

  return (
    <>
      <br></br>
      <fieldset>
        <legend> Vehicle Options</legend>
        {optionBuilder(vehicleOptions)}
        {optionDropdowns}
        <br></br>
        {optionCheckBoxes}
      </fieldset>
    </>
  );
}
