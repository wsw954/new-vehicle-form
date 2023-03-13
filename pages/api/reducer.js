import { makes } from "/data/make";

const ACTIONS = {
  MAKE_SELECTED: "MAKE_SELECTED",
  MODEL_SELECTED: "MODEL_SELECTED",
  TRIM_SELECTED: "TRIM_SELECTED",
  OPTION_SELECTED: "OPTION_SELECTED",
  POPUP_CONFIRM: "POPUP_CONFIRM",
  POPUP_CANCEL: "POPUP_CANCEL",
};

const reducer = (vehicle, action) => {
  let updatedVehicle = { ...vehicle };
  switch (action.type) {
    case ACTIONS.MAKE_SELECTED:
      const modelsList = makes.find((obj) => obj.name === action.payload.make);
      const listModels = modelsList.models.map((make) => make);
      return {
        ...vehicle,
        models: listModels, //Update models available per make selected
        trims: [], //Clear out any prior trims available
        options: [], //Clear out all prior options available
        selected: {
          ...vehicle.selected,
          make: action.payload.make, //Add make selected
          model: "", //Clear out any prior selected model
          trim: "", //Clear out any prior selected trim
          options: [], //Reset to default
        },
      };

    case ACTIONS.MODEL_SELECTED:
      const dataOptions = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        action.payload.model.toLowerCase() +
        "/options");
      return {
        ...vehicle,
        trims: dataOptions.trims, //Update trims available, per model selected
        options: [], //Clear out all prior options available
        selected: {
          ...vehicle.selected,
          model: action.payload.model, //Update model selected
          trim: "", //Clear out the prior selected trim
          options: [], //Reset to default
        },
      };

    case ACTIONS.TRIM_SELECTED:
      let dataValidate = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/validate");
      const optionsData = dataValidate.trimSelected(action.payload.serial);
      return {
        ...vehicle,
        options: optionsData.available, //Update options available, per trim selected
        selected: {
          ...vehicle.selected,
          trim: { name: action.payload.trim, serial: action.payload.serial }, //Update the trim selected
          options: optionsData.selected, //Reset to default
        },
      };
    case ACTIONS.OPTION_SELECTED:
      dataValidate = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/validate");
      updatedVehicle = dataValidate.handleOptionSelected(
        vehicle,
        action.payload
      );

      return {
        ...vehicle,
        options: updatedVehicle.options,
        selected: updatedVehicle.selected,
      };
    case ACTIONS.POPUP_CONFIRM:
      dataValidate = require("../../data/" +
        vehicle.selected.make.toLowerCase() +
        "/" +
        vehicle.selected.model.toLowerCase() +
        "/validate");
      updatedVehicle = dataValidate.handlePopupConfirm(vehicle, action.payload);
      return {
        ...vehicle,
        options: updatedVehicle.options,
        selected: updatedVehicle.selected,
        popup: {
          show: false,
          message: "",
          detail: {},
        },
      };
    case ACTIONS.POPUP_CANCEL:
      return {
        ...vehicle,
        popup: {
          show: false,
          message: "",
          detail: {},
        },
      };
    default:
      return { vehicle };
  }
};

export default reducer;
