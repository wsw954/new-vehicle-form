export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  const optionGroup = vehicle.selected.options.find(
    (o) => o.groupName === name
  );
  const choicesSelected = optionGroup.choicesSelected;

  const handleChange = (event) => {
    onChange({
      optionType: "Multiple",
      groupName: event.target.getAttribute("data-option-group"),
      name: event.target.value,
      serial: event.target.getAttribute("data-serial"),
      checked: event.target.checked,
    });
  };

  const checkBoxOptions = choices.map((choiceAvaiable, index) => (
    <div key={index}>
      <input
        type="checkbox"
        checked={choicesSelected.some(
          (selectedChoice) => selectedChoice.serial === choiceAvaiable.serial
        )}
        value={choiceAvaiable.name}
        data-price={choiceAvaiable.price}
        data-option-group={name}
        data-serial={choiceAvaiable.serial}
        data-package={
          choicesSelected.some(
            (selectedChoice) => selectedChoice.serial === choiceAvaiable.serial
          )
            ? choicesSelected.find((c) => c.serial === choiceAvaiable.serial)
                .package
            : ""
        }
        onChange={handleChange}
      ></input>
      <label htmlFor={choiceAvaiable.name}>
        {choiceAvaiable.name + "  $" + choiceAvaiable.price}{" "}
      </label>
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
