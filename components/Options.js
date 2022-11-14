import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";
import CheckBoxGroup from "/components/checkboxgroup.js";
import reducer from "/pages/api/reducer";
//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, initialOptions }) {
  //Track all selected vehicle options
  const [selectedOptions, updateSelectedOptions] = useState(
    initialOptions.map((optionGroup, index) => ({
      name: optionGroup.name,
      choices: [],
    }))
  );

  //Tracks all available vehicle options
  const [vehicleOptions, dispatch] = useReducer(reducer, initialOptions);

  //Recode  this to just add only the option selected to the state of selectedOptions
  var handleDropdownSelected = (optionGroup, name, serial) => {
    updateSelectedOptions((current) =>
      current.map((obj) => {
        if (obj.name === optionGroup) {
          obj.choices.push({ name: name, serial: serial });
          return {
            ...obj,
            choices: [{ name: name, serial: serial }],
          };
        }
        return obj;
      })
    );

    dispatch({
      type: "OPTION_SELECTED",
      payload: {
        vehicle: vehicle,
        optionGroup: optionGroup,
        name: name,
        serial: serial,
        selectedOptions: selectedOptions,
      },
    });
  };

  var optionDropdowns = [];
  var optionCheckBoxes = [];

  function optionBuilder(optionsArray) {
    optionsArray.forEach((element, index) => {
      switch (element.type) {
        case "Single":
          //Return Dropdowns for each Option Group
          optionDropdowns.push(
            <div key={uuidv4(element.name)}>
              <Dropdown
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                selectedOptions={selectedOptions[index].choices}
                onChange={handleDropdownSelected}
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
                options={selectedOptions}
                choices={element.choices}
                onChange={handleDropdownSelected}
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
