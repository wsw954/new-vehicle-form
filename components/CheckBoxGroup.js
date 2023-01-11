import { useState } from "react";

export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  // Find the choicesSelected array and store it in a variable
  const optionGroup = vehicle.selected.options.find(
    (o) => o.groupName === name
  );
  const choicesSelected = optionGroup.choicesSelected;
  var deselected = {
    groupName: "",
    name: "",
    serial: "",
  };

  // Use the useState hook to store the state of the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // const handleChange = (event) => {
  //   // Update the value of the isChecked state variable based on the checked attribute of the checkbox
  //   setIsChecked(!isChecked);
  //   onChange(
  //     {
  //       groupName: event.target.getAttribute("data-option-group"),
  //       name: event.target.value,
  //       serial: event.target.getAttribute("data-serial"),
  //     },
  //     { groupName: "", name: "", serial: "" }
  //   );
  // };
  const handleChange = (event) => {
    if (!isChecked) {
      onChange(
        { optionType: "Multiple" },
        {
          groupName: event.target.getAttribute("data-option-group"),
          name: event.target.value,
          serial: event.target.getAttribute("data-serial"),
        },
        deselected
      );
      setIsChecked(true);
    } else {
      onChange(
        {
          deselected,
        },
        {
          groupName: event.target.getAttribute("data-option-group"),
          name: event.target.value,
          serial: event.target.getAttribute("data-serial"),
        }
      );
      setIsChecked(false);
    }
  };

  // Use the index of the element in the array as the key
  const checkBoxOptions = choices.map((choice, index) => (
    <div key={index}>
      <input
        type="checkbox"
        // Set the checked attribute based on whether the current checkbox element is in the choicesSelected array
        checked={choicesSelected.some(
          (selectedChoice) => selectedChoice.serial === choice.serial
        )}
        value={choice.name}
        data-price={choice.price}
        data-option-group={name}
        data-serial={choice.serial}
        // Use the map method to attach the onChange event handler to each checkbox element
        onChange={handleChange}
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
