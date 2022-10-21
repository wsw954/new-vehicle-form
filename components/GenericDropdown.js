import { useEffect, useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function GenericDropdown({
  name,
  vehicle,
  choices,
  onChange,
  firstDisabled,
}) {
  const [state, setState] = useState("");
  const handleChange = (event) => {
    onChange(event.target.value);
    setState(event.target.value);
  };

  //   useEffect(() => {
  //     setState("");
  //   }, [vehicle]);
  return (
    <>
      <label>{name}</label>
      <br></br>
      <select name={name} onChange={handleChange} value={state}>
        <option key={0} disabled={firstDisabled}>
          Choose A {name}
        </option>
        {choices &&
          choices.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </>
  );
}
