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
  var choiceOptions = {};
  var initialValue = {};

  var handleChange = (event) => {
    onChange(event.target.value);
  };

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
          data-serial={choice.serial}
        >
          {choice.name + " -MSRP-$" + choice.price}
        </option>
      ));
      handleChange = (event) => {
        onChange(
          event.target.value,
          event.target.selectedOptions[0].getAttribute("data-serial")
        );
      };

      break;
    default:
      initialValue = choices[0].name;
      choiceOptions = choices.map((choice, index) => (
        <option
          key={uuidv4({ index })}
          value={choice.name}
          data-price={choice.price}
          data-optionname={name}
          data-serial={choice.serial}
        >
          {choice.name + "-price-$" + choice.price}
        </option>
      ));
      handleChange = (event) => {
        onChange(
          event.target.selectedOptions[0].getAttribute("data-optionname"),
          event.target.value,
          event.target.selectedOptions[0].getAttribute("data-serial")
        );
      };
      break;
  }

  return (
    <>
      <label className="option-name" htmlFor={name}>
        {name}
      </label>
      <br></br>
      <select className={name} onChange={handleChange} value={initialValue}>
        <option key={0} disabled={firstDisabled}>
          Select {name}
        </option>
        {choiceOptions}
      </select>
    </>
  );
}
