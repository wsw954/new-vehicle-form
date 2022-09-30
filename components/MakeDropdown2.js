import { useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function MakeDropdown({ makeOptions, onChange }) {
  return (
    <>
      <select defaultValue={0} onChange={onChange}>
        <option key={uuidv4(0)} disabled value={0}>
          Choose A Make
        </option>
        {makeOptions.map((makes) => (
          <option key={uuidv4({ makes })} value={makes}>
            {makes}
          </option>
        ))}
      </select>
    </>
  );
}
