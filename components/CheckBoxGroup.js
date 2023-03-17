import { v4 as uuidv4 } from "uuid";

//Call uuidv4, to use to create unique IDs
uuidv4();

export default function CheckBoxGroup({ name, vehicle, choices, onChange }) {
  const selectedOptionGroup = vehicle.selected.options.find(
    (o) => o.groupName === name
  );
  const choicesSelected = selectedOptionGroup.choicesSelected;

  const handleChange = (event) => {
    const actionAttr = event.target.getAttribute("data-action");
    const actionValue = actionAttr === "true";
    const popupAttr = event.target.getAttribute("data-popup");
    const popupValue = popupAttr === "true";
    onChange({
      optionType: "Multiple",
      groupName: event.target.getAttribute("data-option-group"),
      name: event.target.value,
      serial: event.target.getAttribute("data-serial"),
      checked: event.target.checked,
      action: actionValue,
      package: event.target.getAttribute("data-package"),
      popup: popupValue,
    });
  };

  const checkBoxOptions = choices.map((choiceAvailable, index) => {
    let packageValue = "";
    let dataPopup =
      choiceAvailable.hasOwnProperty("popup") &&
      typeof choiceAvailable.popup === "boolean"
        ? choiceAvailable.popup
        : false;
    let dataAction =
      choiceAvailable.hasOwnProperty("action") &&
      typeof choiceAvailable.action === "boolean"
        ? choiceAvailable.action
        : false;
    const selectedChoice = {};
    if (choicesSelected.length > 0) {
      selectedChoice = choicesSelected.find(
        (o) => o.serial === choiceAvailable.serial
      );

      if (selectedChoice !== null && selectedChoice !== undefined) {
        if (selectedChoice.hasOwnProperty("package")) {
          packageValue = selectedChoice.package;
          dataPopup = selectedChoice.popup;
        }
      }
    }

    return (
      <div key={uuidv4({ index })}>
        <input
          type="checkbox"
          checked={choicesSelected.some(
            (selectedChoice) => selectedChoice.serial === choiceAvailable.serial
          )}
          value={choiceAvailable.name}
          data-price={choiceAvailable.price}
          data-option-group={name}
          data-serial={choiceAvailable.serial}
          data-action={dataAction}
          data-package={packageValue}
          data-popup={JSON.stringify(dataPopup)}
          onChange={handleChange}
        />
        <label htmlFor={choiceAvailable.name}>
          {choicesSelected.some(
            (selectedChoice) =>
              selectedChoice.serial === choiceAvailable.serial &&
              name !== "Packages" &&
              selectedChoice.package
          )
            ? `${choiceAvailable.name}-Included in Package`
            : `${choiceAvailable.name}  $${choiceAvailable.price} `}
        </label>
      </div>
    );
  });

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
