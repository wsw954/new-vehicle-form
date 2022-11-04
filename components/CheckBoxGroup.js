import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  //Create list of option elements to load select
  let checkBoxOptions = {};
  var initialValue = {};

  checkBoxOptions = choices.map((choice, index) => (
    <div key={uuidv4({ index })}>
      <input
        key={uuidv4(choice.name)}
        type="checkbox"
        name={choice.name}
        value={choice.name}
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
