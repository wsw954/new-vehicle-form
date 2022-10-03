import { useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function DropDropdown({
  name,
  choices,
  onChange,
  defaultValue,
}) {
  const [value, setValue] = useState();
  //Create list of option elements to load make select
  const choicesOptions = choices.map((choice) => (
    <option key={uuidv4({ choice })} value={choice}>
      {choice}
    </option>
  ));

  const handleChange = (event) => {
    onChange(event);
    setValue(event.target.value);
  };

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <br></br>
      <select
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
      >
        <option key={uuidv4(0)} disabled value={defaultValue}>
          Choose A {name}
        </option>
        {choicesOptions}
      </select>
    </>
  );
}
