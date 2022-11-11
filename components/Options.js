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
        optionName: name,
        optionSerial: serial,
      },
    });
  };

  console.log(vehicleOptions);
  var optionDropdowns = [];
  var optionCheckBoxes = [];

  //I think I will have to replace the code below to use 2 separate functions that return the relevant  html elements

  vehicleOptions.forEach((element) => {
    switch (element.type) {
      case "Single":
        //Check if the optionGroup has choices
        element.choices.length > 0 ? (
          optionDropdowns.push(
            <div key={uuidv4(element.name)}>
              <Dropdown
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                onChange={handleOptionSelected}
                firstDisabled={element.choices > 1 ? true : false}
              ></Dropdown>
              <br></br>
              <br></br>
            </div>
          )
        ) : (
          <br></br>
        );
        break;
      case "Multiple":
        element.choices.length > 0 ? (
          optionCheckBoxes.push(
            <div key={uuidv4(element.name)}>
              <CheckBoxGroup
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                onChange={handleOptionSelected}
                firstDisabled={false}
              ></CheckBoxGroup>
              <br></br>
              <br></br>
            </div>
          )
        ) : (
          <br></br>
        );
        break;
    }
  });

  return (
    <>
      <br></br>
      <fieldset>
        <legend> Vehicle Options</legend>
        {optionDropdowns}
        <br></br>
        {optionCheckBoxes}
      </fieldset>
    </>
  );
}
