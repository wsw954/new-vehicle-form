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
  var choiceOptions = {};
  var initialValue = {};

  var handleChange = (event) => {
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
      let optionGroup = vehicle.selected.options.find(
        (o) => o.groupName === name
      );
      let choicesSelected = optionGroup.choicesSelected;

      let unselected = {
        groupName: vehicle.selected.options.find((o) => o.groupName === name)
          ?.groupName,
        name: null,
        serial: null,
      };
      //Assign initialValue
      initialValue = vehicle.selected.options.find((o) => o.groupName === name)
        ?.choicesSelected[0]?.name;

      choiceOptions = choices.map((choiceAvailable, index) => {
        return (
          <option
            key={uuidv4({ index })}
            value={choiceAvailable.name}
            data-price={choiceAvailable.price}
            data-option-group={name}
            data-serial={choiceAvailable.serial}
            data-package={
              choicesSelected.some(
                (selectedChoice) =>
                  selectedChoice.serial === choiceAvailable.serial
              )
                ? choicesSelected.find(
                    (c) => c.serial === choiceAvailable.serial
                  ).package
                : ""
            }
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
        if (event.target.selectedIndex > 0) {
          unselected = {
            groupName: vehicle.selected.options.find(
              (o) => o.groupName === name
            )?.groupName,
            name:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.name || null,
            serial:
              vehicle.selected.options.find((o) => o.groupName === name)
                ?.choicesSelected[0]?.serial || null,
          };
        }
        onChange({
          optionType: "Single",
          groupName:
            event.target.selectedOptions[0].getAttribute("data-option-group"),
          name: event.target.value,
          serial: event.target.selectedOptions[0].getAttribute("data-serial"),
          unselected: unselected,
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
