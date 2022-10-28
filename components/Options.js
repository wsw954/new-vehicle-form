import { v4 as uuidv4 } from "uuid";
import Dropdown from "/components/dropdown.js";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function Options({ vehicle, options, onChange }) {
  console.log(vehicle);
  console.log(options);

  //Create list of option elements to load select
  let choiceOptions = {};
  var initialValue = {};

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <span>Put code for Options fieldsets here</span>
      <br></br>
    </>
  );
}
