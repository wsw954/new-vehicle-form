import { useEffect, useState } from "react";
import { makes } from "/data/make";
import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function DropDropdown({
  name,
  vehicle,
  choices,
  onChange,
  firstDisabled,
}) {
  console.log(vehicle);

  //Create list of option elements to load select
  let choiceOptions = {};
  var initialValue = {};

  switch (name) {
    case "Make":
      initialValue = vehicle.make;
      choiceOptions = choices.map((choice, index) => (
        <option key={uuidv4({ index })} value={choice.name}>
          {choice.name}
        </option>
      ));
      break;
    case "Model":
      initialValue = vehicle.model;
      choiceOptions = choices.map((choice, index) => (
        <option key={uuidv4({ index })} value={choice.name}>
          {choice.name}
        </option>
      ));
      break;
    case "Trim":
      initialValue = vehicle.trim;
      choiceOptions = choices.map((choice, index) => (
        <option
          key={uuidv4({ index })}
          value={choice.name}
          data-price={choice.price}
        >
          {choice.name + " -MSRP-$" + choice.price}
        </option>
      ));
      break;
    case "Option":
      choiceOptions = choices.map((choice, index) => (
        <option
          key={uuidv4({ index })}
          value={choice.name}
          data-price={choice.price}
        >
          {choice.name + "-MSRP-$" + choice.price}
        </option>
      ));
      break;
    default:
      console.log([]);
  }

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <br></br>
      <select name={name} onChange={handleChange} value={initialValue}>
        <option key={0} disabled={firstDisabled}>
          Choose A {name}
        </option>
        {choiceOptions}
      </select>
    </>
  );
}
