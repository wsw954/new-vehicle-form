import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  //Create list of option elements to load select
  let checkBoxOptions = {};
  var initialValue = {};
  if (
    vehicle.selected.options.find((o) => o.groupName === name).choicesSelected
      .length > 0
  ) {
    initialValue = vehicle.selected.options.find((o) => o.groupName === name)
      .choicesSelected[0].name;
  }

  var handleChange = (event) => {
    onChange(
      event.target.getAttribute("data-option-group"),
      event.target.value,
      event.target.getAttribute("data-serial")
    );
  };

  checkBoxOptions = choices.map((choice, index) => (
    <div key={uuidv4({ index })}>
      <input
        key={uuidv4(choice.name)}
        type="checkbox"
        value={initialValue}
        name={name}
        onChange={handleChange}
        data-price={choice.price}
        data-option-group={name}
        data-serial={choice.serial}
      ></input>
      <label htmlFor={choice.name}>{choice.name + "  $" + choice.price} </label>
    </div>
  ));

  return (
    <>
      <fieldset id={name}>
        <legend className="option-name">{name}</legend>
        {checkBoxOptions}
      </fieldset>

      <br></br>
    </>
  );
}
