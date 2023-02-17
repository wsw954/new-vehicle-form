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
      package: event.target.getAttribute("data-package"),
    });
  };

  const checkBoxOptions = choices.map((choiceAvailable, index) => (
    <div key={index}>
      <input
        type="checkbox"
        checked={choicesSelected.some(
          (selectedChoice) => selectedChoice.serial === choiceAvailable.serial
        )}
        value={choiceAvailable.name}
        data-price={choiceAvailable.price}
        data-option-group={name}
        data-serial={choiceAvailable.serial}
        data-package={
          choicesSelected.some(
            (selectedChoice) => selectedChoice.serial === choiceAvailable.serial
          )
            ? choicesSelected.find((c) => c.serial === choiceAvailable.serial)
                .package
            : ""
        }
        onChange={handleChange}
      ></input>
      <label htmlFor={choiceAvailable.name}>
        {choicesSelected.some(
          (selectedChoice) =>
            selectedChoice.serial === choiceAvailable.serial &&
            name !== "Packages" &&
            selectedChoice.package
        )
          ? choiceAvailable.name + "-Included in Package"
          : choiceAvailable.name + "  $" + choiceAvailable.price + " "}
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
