import { useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

//Retrieve list of makes for selection
const listMakes = makes.map((make) => make.name);

//Create list of option elements to load make select
const makeOptions = listMakes.map((makes) => (
  <option key={uuidv4({ makes })} value={makes}>
    {makes}
  </option>
));
export default function MakeDropdown({ onChange }) {
  return (
    <>
      <select defaultValue={0} onChange={onChange}>
        <option key={uuidv4(0)} disabled value={0}>
          Choose A Make
        </option>
        {makeOptions}
      </select>
    </>
  );
}
