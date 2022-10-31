import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, optionGroups, onChange }) {
  var optionDropdowns = [];

  optionGroups.forEach((element) => {
    switch (element.type) {
      case "Single":
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
    }
  });

  return (
    <>
      {optionDropdowns}
      <br></br>
    </>
  );
}
