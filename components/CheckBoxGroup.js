export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  // Find the choicesSelected array and store it in a variable
  const optionGroup = vehicle.selected.options.find(
    (o) => o.groupName === name
  );
  const choicesSelected = optionGroup.choicesSelected;

  // Use the index of the element in the array as the key
  const checkBoxOptions = choices.map((choice, index) => (
    <div key={index}>
      <input
        type="checkbox"
        // Set the checked attribute based on whether the current checkbox element is in the choicesSelected array
        checked={choicesSelected.some(
          (selectedChoice) => selectedChoice.serial === choice.serial
        )}
        // Use the map method to attach the onChange event handler to each checkbox element
        onChange={(event) =>
          onChange(
            event.target.getAttribute("data-option-group"),
            event.target.value,
            event.target.getAttribute("data-serial")
          )
        }
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
