import { useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function ModelDropdown({ models, onChange }) {
  const [value, setValue] = useState();
  //Create list of option elements to load make select
  const modelOptions = models.map((model) => (
    <option key={uuidv4({ model })} value={model}>
      {model}
    </option>
  ));


  const handleChange = (event) => {
    onChange(event);
    setValue(event.target.value);
  }

  return (
    <>
      <select defaultValue={0} onChange={handleChange} value={value}>
        <option key={uuidv4(0)} disabled value={0}>
          Choose A Model
        </option>
        {modelOptions}
      </select>
    </>
  );
}
