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
  const getInitialValue = () => {
    switch (name) {
      case "Make":
        return vehicle.selected.make;
      case "Model":
        return vehicle.selected.model;
      case "Trim":
        return vehicle.selected.trim.name;
      default:
        const optionGroup = vehicle.selected.options.find(
          (o) => o.groupName === name
        );

        return optionGroup?.choicesSelected[0]?.name;
    }
  };

  const getChoiceOptions = () => {
    if (name === "Make" || name === "Model") {
      return vehicle[name.toLowerCase() + "s"].map((choice) => (
        <option key={uuidv4()} value={choice.name}>
          {choice.name}
        </option>
      ));
    }

    if (name === "Trim") {
      return vehicle.trims.map((choice) => (
        <option
          key={uuidv4()}
          value={choice.name}
          data-price={choice.price}
          data-serial={choice.serial}
        >
          {choice.name + " -MSRP-$" + choice.price}
        </option>
      ));
    }

    const optionGroup = vehicle.selected.options.find(
      (o) => o.groupName === name
    );
    const choicesSelected = optionGroup.choicesSelected;

    return choices.map((choiceAvailable, index) => {
      let dataPopup = choiceAvailable.popup ?? false;
      let dataAction = choiceAvailable.action ?? false;
      let packageValue = "";

      if (choicesSelected.length > 0) {
        const selectedChoice = choicesSelected.find(
          (o) => o.serial === choiceAvailable.serial
        );
        if (selectedChoice) {
          // console.log(selectedChoice);
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
  };

  const handleChange = (event) => {
    if (name === "Make" || name === "Model") {
      onChange(event.target.value);
    } else if (name === "Trim") {
      onChange(
        event.target.value,
        event.target.selectedOptions[0].getAttribute("data-serial")
      );
    } else {
      let checked = false;
      let actionValue = false;
      let popupValue = false;
      let packageValue = "";
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
      if (event.target.selectedIndex > 0) {
        checked = true;
        const actionAttr =
          event.target.selectedOptions[0].getAttribute("data-action");
        actionValue = actionAttr === "true";
        const popupAttr =
          event.target.selectedOptions[0].getAttribute("data-popup");
        popupValue = popupAttr === "true";
        packageValue =
          event.target.selectedOptions[0].getAttribute("data-package");

        unselected = {
          optionType: "Single",
          groupName: vehicle.selected.options.find((o) => o.groupName === name)
            ?.groupName,
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
        checked: checked,
        action: actionValue,
        package: packageValue,
        popup: popupValue,
      });
    }
  };

  const initialValue = getInitialValue();
  const choiceOptions = getChoiceOptions();

  return (
    <>
      <label className="option-name" htmlFor={name}>
        {name}
      </label>
      <br />
      <select className={name} onChange={handleChange} value={initialValue}>
        <option key={0} disabled={firstDisabled}>
          Select {name}
        </option>
        {choiceOptions}
      </select>
    </>
  );
}
