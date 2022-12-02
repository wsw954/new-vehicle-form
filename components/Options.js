import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";
import CheckBoxGroup from "/components/checkboxgroup.js";
//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, onChange }) {
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
                onChange={onChange}
                firstDisabled={false}
              ></Dropdown>
              <br></br>
              <br></br>
            </div>
          );
          break;
        case "Multiple":
          //Return CheckBox Group for each Option Group
          optionCheckBoxes.push(
            <div key={uuidv4(element.name)}>
              <CheckBoxGroup
                name={element.name}
                vehicle={vehicle}
                choices={element.choices}
                onChange={onChange}
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
        {optionBuilder(vehicle.options)}
        {optionDropdowns}
        <br></br>
        {optionCheckBoxes}
      </fieldset>
    </>
  );
}
