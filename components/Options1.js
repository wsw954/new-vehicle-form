import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";
import CheckBoxGroup from "/components/checkboxgroup.js";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, optionGroups, onChange }) {
  var optionDropdowns = [];
  var optionCheckBoxes = [];

  optionGroups.forEach((element) => {
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
                onChange={onChange}
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
                onChange={onChange}
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
