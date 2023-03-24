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
  let choiceOptions = {};
  let initialValue = {};

  let handleChange = (event) => {
    onChange(event.target.value);
  };

  //Customize Dropdown, relevant to vehicle variable being handled
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
      initialValue = vehicle.selected.trim.name;
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
      let optionGroup = vehicle.selected.options.find(
        (o) => o.groupName === name
      );
      let choicesSelected = optionGroup.choicesSelected;
      // let selectedChoice = {};

      let unselected = {
        optionType: "Single",
        groupName: vehicle.selected.options.find((o) => o.groupName === name)
          ?.groupName,
        name: null,
        serial: null,
        action: false,
        package: null,
        popup: false,
      };
      //Assign initialValue
      initialValue = choicesSelected[0]?.name;

      choiceOptions = choices.map((choiceAvailable, index) => {
        let dataPopup = choiceAvailable.popup ?? false;
        let dataAction = choiceAvailable.action ?? false;
        let packageValue = "";

        if (choicesSelected.length > 0) {
          const selectedChoice = choicesSelected.find(
            (o) => o.serial === choiceAvailable.serial
          );
          if (selectedChoice) {
            packageValue = selectedChoice.package;
            dataPopup = selectedChoice.popup ?? false;
          }
        }

        return (
          <option
            key={uuidv4({ index })}
            value={choiceAvailable.name}
            data-price={choiceAvailable.price}
            data-option-group={name}
            data-serial={choiceAvailable.serial}
            data-action={JSON.stringify(dataAction)}
            data-package={packageValue}
            data-popup={JSON.stringify(dataPopup)}
          >
            {choicesSelected.some(
              (selectedChoice) =>
                selectedChoice.serial === choiceAvailable.serial &&
                name !== "Packages" &&
                selectedChoice.package
            )
              ? choiceAvailable.name + "-Included in Package"
              : choiceAvailable.name + "  $" + choiceAvailable.price + " "}
          </option>
        );
      });
      handleChange = (event) => {
        let actionValue = false;
        let popupValue = false;

        if (event.target.selectedIndex > 0) {
          const actionAttr = event.target.getAttribute("data-action");
          actionValue = actionAttr === "true";
          const popupAttr = event.target.getAttribute("data-popup");
          popupValue = popupAttr === "true";

          unselected = {
            optionType: "Single",
            groupName: vehicle.selected.options.find(
              (o) => o.groupName === name
            )?.groupName,
            name:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.name || null,
            serial:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.serial || null,
            action:
              event.target.selectedOptions[0].getAttribute("data-action") ||
              false,
            package:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.package || null,
            popup:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.popup || false,
          };
        }
        onChange({
          optionType: "Single",
          groupName:
            event.target.selectedOptions[0].getAttribute("data-option-group"),
          name: event.target.value,
          serial: event.target.selectedOptions[0].getAttribute("data-serial"),
          unselected: unselected,
          action: actionValue,
          package: event.target.getAttribute("data-package"),
          popup: popupValue,
        });
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
