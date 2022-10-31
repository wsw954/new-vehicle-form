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
    default:
      choiceOptions = choices.map((choice, index) => (
        <option
          key={uuidv4({ index })}
          value={choice.name}
          data-price={choice.price}
        >
          {choice.name + "-price-$" + choice.price}
        </option>
      ));
      break;

    // console.log([]);
  }

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label className="dropdown-name" htmlFor={name}>
        {name}
      </label>
      <br></br>
      <select className={name} onChange={handleChange} value={initialValue}>
        <option key={0} disabled={firstDisabled}>
          Choose A {name}
        </option>
        {choiceOptions}
      </select>
    </>
  );
}
