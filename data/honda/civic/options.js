export const trims = [
  { name: "Sedan Sport", price: 24650, serial: "tt1" },
  { name: "Sedan EX", price: 26050, serial: "tt2" },
  { name: "Sedan Touring", price: 29650, serial: "tt3" },
  { name: "Hatchback Sport", price: 22450, serial: "tt4" },
  { name: "Hatchback EX-L", price: 27750, serial: "tt5" },
  { name: "Hatchback Sport Touring", price: 30550, serial: "tt6" },
  { name: "Si", price: 27300, serial: "tt7" },
  { name: "Type R", price: 42895, serial: "tt8" },
];

//Retrieve options available, as well as default options selected
export const trimSelected = (trim, serialSelected) => {
  //Retrieve all options available, per trim selected
  var optionsAvailable = dummyOptionsData.map((option) => {
    return {
      ...option,
      choices: option.choices.filter((choice) =>
        choice.trim.includes(serialSelected)
      ),
    };
  });
  //Create default option selected object
  var optionsSelected = dummyOptionsData.map((option) => {
    return { groupName: option.name, choicesSelected: [] };
  });

  var optionsData = {
    available: optionsAvailable,
    selected: optionsSelected,
  };
  return optionsData;
};

//Test Function
export const optionSelected = (vehicle, groupName, name, serial) => {
  switch (vehicle.selected.trim) {
    case "Sedan Sport":
      var testVehicle = {
        makes: vehicle.makes,
        models: vehicle.models,
        trims: vehicle.trims,
        options: vehicle.options,
        selected: {
          make: vehicle.selected.make,
          model: vehicle.selected.model,
          trim: vehicle.selected.trim,
          options: vehicle.selected.options,
        },
      };

      var optionToChange = testVehicle.selected.options.find(
        (e) => e.groupName === groupName
      ); //Retrieve the existing selected options
      optionToChange.choicesSelected = [
        dummyOptionsData
          .find((e) => e.name === groupName)
          .choices.find((c) => c.serial === serial),
      ]; //Add the new selected option to the array of choicesSelected

      testVehicle.selected.options.find(
        (os) => os.groupName === groupName
      ).choicesSelected = optionToChange.choicesSelected; //

      return testVehicle;

      break;
    case "Sedan EX":
      var testVehicle = {
        makes: vehicle.makes,
        models: vehicle.models,
        trims: vehicle.trims,
        options: vehicle.options,
        selected: {
          make: vehicle.selected.make,
          model: vehicle.selected.model,
          trim: vehicle.selected.trim,
          options: vehicle.selected.options,
        },
      };

      var optionToChange = testVehicle.selected.options.find(
        (e) => e.groupName === groupName
      ); //Retrieve the existing selected options
      optionToChange.choicesSelected = [
        dummyOptionsData
          .find((e) => e.name === groupName)
          .choices.find((c) => c.serial === serial),
      ]; //Add the new selected option to the array of choicesSelected

      testVehicle.selected.options.find(
        (os) => os.groupName === groupName
      ).choicesSelected = optionToChange.choicesSelected; //

      return testVehicle;
      break;
    case "Sedan Touring":
      var testVehicle = {
        makes: vehicle.makes,
        models: vehicle.models,
        trims: vehicle.trims,
        options: vehicle.options,
        selected: {
          make: vehicle.selected.make,
          model: vehicle.selected.model,
          trim: vehicle.selected.trim,
          options: vehicle.selected.options,
        },
      };

      var optionToChange = testVehicle.selected.options.find(
        (e) => e.groupName === groupName
      ); //Retrieve the existing selected options
      optionToChange.choicesSelected = [
        dummyOptionsData
          .find((e) => e.name === groupName)
          .choices.find((c) => c.serial === serial),
      ]; //Add the new selected option to the array of choicesSelected

      testVehicle.selected.options.find(
        (os) => os.groupName === groupName
      ).choicesSelected = optionToChange.choicesSelected; //

      return testVehicle;
      break;
    case "Hatchback Sport":
      console.log("Return for HatchBack Sport");
      return testVehicle;
      break;
    case "Hatchback EX-L":
      console.log("Return ");
      return testVehicle;
      break;
    case "Hatchback Sport Touring":
      console.log("Return ");
      return testVehicle;
      break;
    case "Si":
      console.log("Return SI Data");
      return testVehicle;
      break;
    case "Type R":
      console.log("Return Type R Data");
      return testVehicle;
      break;
  }
  return updatedVehicle;
};

export const dummyOptionsData = [
  {
    name: "Powertrain",
    type: "Single",
    choices: [
      {
        name: "Powertrain for TT1",
        price: 0,
        trim: ["tt1", "tt2"],
        serial: "pw1",
        action: null,
      },
      {
        name: "Powertrain for TT2",
        price: 0,
        trim: ["tt2"],
        serial: "pw2",
        action: null,
      },
      {
        name: "Powertrain for TT3",
        price: 0,
        trim: ["tt3"],
        serial: "pw3",
        action: null,
      },
      {
        name: "Powertrain TT4",
        price: 0,
        trim: ["tt4"],
        serial: "pw4",
        action: null,
      },
      {
        name: "Powertrain TT5",
        price: 0,
        trim: ["tt5"],
        serial: "pw5",
      },
      {
        name: "powertrain TT6",
        price: 0,
        trim: ["tt6"],
        serial: "pw6",
      },
      {
        name: "powertrain TT7",
        price: 0,
        trim: ["tt7"],
        serial: "pw7",
      },
    ],
  },
  {
    name: "Exterior Color",
    type: "Single",
    choices: [
      { name: "Ex Color TT1", price: 0, trim: ["tt1"], serial: "ec1" },
      { name: "Ex Color TT1", price: 0, trim: ["tt1", "tt2"], serial: "ec2" },
      {
        name: "Ex Color TT2",
        price: 0,
        trim: ["tt1", "tt3"],
        serial: "ec3",
      },
      { name: "Exterior Color TT3", price: 0, trim: ["tt3"], serial: "ec4" },
      { name: "exterior Color  TT4", price: 0, trim: ["tt4"], serial: "ec5" },
      { name: "EXterior Color TT5", price: 0, trim: ["tt5"], serial: "ec6" },
      { name: "Ex Color  TT6", price: 0, trim: ["tt6"], serial: "ec7" },
      { name: "ExColor  TT7", price: 0, trim: ["tt7"], serial: "ec8" },
    ],
  },
  {
    name: "Interior Color",
    type: "Single",
    choices: [
      { name: "Interior Color TT1", price: 0, trim: ["tt1"], serial: "ic1" },
      { name: "Interior Color TT2", price: 0, trim: ["tt1"], serial: "ic2" },
      { name: "Interior Color TT3", price: 0, trim: ["tt3"], serial: "ic3" },
      { name: "Interior Color  TT4", price: 0, trim: ["tt4"], serial: "ic4" },
      { name: "Interior Color TT5", price: 0, trim: ["tt5"], serial: "ic5" },
      { name: "Interior Color  TT6", price: 0, trim: ["tt6"], serial: "ic6" },
      { name: "Interior Color  TT7", price: 0, trim: ["tt7"], serial: "ic7" },
    ],
  },
  {
    name: "Wheels",
    type: "Single",
    choices: [
      { name: "Wheels TT1", price: 0, trim: ["tt1", "tt2"], serial: "w1" },
      { name: "Wheels TT2", price: 0, trim: ["tt1", "tt2"], serial: "w2" },
      { name: "Wheels TT3", price: 0, trim: ["tt3"], serial: "w3" },
      { name: "Wheels  TT4", price: 0, trim: ["tt4"], serial: "w4" },
      { name: "Wheels TT5", price: 0, trim: ["tt5"], serial: "w5" },
      { name: "Wheels  TT6", price: 0, trim: ["tt6"], serial: "w6" },
      { name: "Wheels  TT7", price: 0, trim: ["tt7"], serial: "w7" },
    ],
  },
  {
    name: "Packages",
    type: "Multiple",
    choices: [
      {
        name: "All-Season Protection Package I",
        price: 420,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "pk1",
      },
      {
        name: "All-Season Protection Package II",
        price: 370,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "pk2",
      },
      ,
      {
        name: "HPD Package",
        price: 1452,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "pk3",
      },
      {
        name: "Protection Package",
        price: 300,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "pk4",
      },
    ],
  },
  {
    name: "Exterior Accessories",
    type: "Multiple",
    choices: [
      {
        name: "Body Side Molding",
        price: 242,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea1",
      },
      {
        name: "Decklid Spoiler",
        price: 322,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea2",
      },
      { name: "Door Edge Film", price: 54, trim: ["tt1"], serial: "ea3" },
      { name: "Door Edge Guard", price: 124, trim: ["tt1"], serial: "ea4" },
      { name: "Door Handle Film", price: 54, trim: ["tt1"], serial: "ea5" },
      { name: "Ext Accs TT1", price: 0, trim: ["tt1"], serial: "ea6" },
      { name: "Ext Accs TT2", price: 0, trim: ["tt1"], serial: "ea7" },
      { name: "Ext Accs TT3", price: 0, trim: ["tt3"], serial: "ea8" },
      { name: "Ext Accs  TT4", price: 0, trim: ["tt4"], serial: "ea9" },
      { name: "Ext Accs TT5", price: 0, trim: ["tt5"], serial: "ea10" },
      { name: "Ext Accs  TT6", price: 0, trim: ["tt6"], serial: "ea11" },
      { name: "Ext Accs  TT7", price: 0, trim: ["tt7"], serial: "ea12" },
    ],
  },
  {
    name: "Interior Accessories",
    type: "Multiple",
    choices: [
      {
        name: "All Season Floor Mats",
        price: 183,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ia1",
      },
      {
        name: "Body Side Moulding",
        price: 242,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ia2",
      },
      { name: "Cargo Hook", price: 14, trim: ["tt1"], serial: "ia3" },
      { name: "Cargo Net", price: 54, trim: ["tt1"], serial: "ia4" },
      { name: "Carpet Floor Mats", price: 194, trim: ["tt1"], serial: "ia5" },
      {
        name: "Door Sill Protection Film",
        price: 108,
        trim: ["tt1"],
        serial: "ia6",
      },
      { name: "Int Accs TT1", price: 0, trim: ["tt1"], serial: "ia7" },
      { name: "Int Accs TT2", price: 0, trim: ["tt1"], serial: "ia8" },
      { name: "Int Accs TT3", price: 0, trim: ["tt3"], serial: "ia9" },
      { name: "Int Accs  TT4", price: 0, trim: ["tt4"], serial: "ia10" },
      { name: "Int Accs TT5", price: 0, trim: ["tt5"], serial: "ia11" },
      { name: "Int Accs  TT6", price: 0, trim: ["tt6"], serial: "ia12" },
      { name: "int Accs  TT7", price: 0, trim: ["tt7"], serial: "ia13" },
    ],
  },
  {
    name: "Electronic Accessories",
    type: "Multiple",
    choices: [
      {
        name: "Engine Block Heater",
        price: 90,
        trim: ["tt1"],
        serial: "elec1",
      },
    ],
  },
];
