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
  //Create global variables
  var choiceOptions = {};
  var initialValue = {};

  var handleChange = (event) => {
    onChange(event.target.value);
  };

  //Customize Dropdown, relevant to vehicle variable
  switch (name) {
    case "Make":
      initialValue = vehicle.selected.make;
      choiceOptions = vehicle.makes.map((choice, index) => (
        <option key={uuidv4({ index })} value={choice.name}>
          {choice.name}
        </option>
      ));
      break;
    case "Model":
      initialValue = vehicle.selected.model;
      choiceOptions = vehicle.models.map((choice, index) => (
        <option key={uuidv4({ index })} value={choice.name}>
          {choice.name}
        </option>
      ));
      break;
    case "Trim":
      initialValue = vehicle.selected.trim;
      choiceOptions = vehicle.trims.map((choice, index) => (
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
      // console.log(
      //   vehicle.selected.options.find((e) => e.groupName === name)
      //     .choicesSelected.length > 0
      // );

      initialValue =
        vehicle.selected.trims === "" ? vehicle.selected.options[0].name : "";
      choiceOptions = choices.map((choice, index) => (
        <option
          key={uuidv4({ index })}
          value={choice.name}
          data-price={choice.price}
          data-option-group={name}
          data-serial={choice.serial}
        >
          {choice.name + "-price-$" + choice.price}
        </option>
      ));
      handleChange = (event) => {
        onChange(
          event.target.selectedOptions[0].getAttribute("data-option-group"),
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
