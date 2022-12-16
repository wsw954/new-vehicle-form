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
      choicesAvailable: option.choicesAvailable.filter((choice) =>
        choice.trim.includes(serialSelected)
      ),
    };
  });
  //Create default selected object, w/ blank choicesSelected
  var optionsSelected = dummyOptionsData.map((option) => {
    return { groupName: option.name, choicesSelected: [] };
  });

  var optionsData = {
    available: optionsAvailable,
    selected: optionsSelected,
  };
  return optionsData;
};

//Test function
export const handleOptionSelected = (vehicle, groupName, serial) => {
  //Create local var to store current vehicle info
  var updatedVehicle = vehicle;

  //Retrieve the option group data
  var optionGroup = dummyOptionsData.find((e) => e.name === groupName);

  //Retrieve the actual option selected
  var optionSelected = optionGroup.choicesAvailable.find(
    (c) => c.serial === serial
  );
  //Check if any special action required for the option selected
  if (optionSelected.hasOwnProperty("action")) {
    //Adjust vehicle for the special action required for this option selection
    updatedVehicle = optionSelected.action(
      vehicle,
      optionGroup.type,
      groupName,
      serial
    );
  } else {
    updatedVehicle = addOptionSelected(
      vehicle,
      optionGroup.type,
      groupName,
      serial
    );
  }
  return updatedVehicle;
};

//Helper function
function addOptionSelected(vehicle, optionType, groupName, serial) {
  var updatedVehicle = vehicle;
  switch (optionType) {
    case "Single":
      console.log(serial);
      //Change the selected option for vehicle to be
      updatedVehicle.selected.options.find(
        (os) => os.groupName === groupName
      ).choicesSelected = addSingleOption(groupName, serial);
      break;
    case "Multiple":
      console.log("Add option to vehicle.selected.groupName.choices[x]");
      break;
  }

  return updatedVehicle;
}

//Helper Function
function addSingleOption(groupName, serial) {
  return [
    dummyOptionsData
      .find((e) => e.name === groupName)
      .choicesAvailable.find((c) => c.serial === serial),
  ];
}

//Placeholder function for
function addMultipleOption(groupName, serial) {
  return [
    dummyOptionsData
      .find((e) => e.name === groupName)
      .choicesAvailable.find((c) => c.serial === serial),
  ];
}

export const dummyOptionsData = [
  {
    name: "Powertrain",
    type: "Single",
    choicesAvailable: [
      {
        name: "2.0L 4-Cyl 158hp Engine w/CVT",
        price: 0,
        trim: ["tt1", "tt2"],
        serial: "pw1",
      },
      {
        name: "1.5L Turbo 4-Cyl 180hp Engine w/CVT",
        price: 0,
        trim: ["tt2", "tt4", "tt5", "tt6"],
        serial: "pw2",
      },
      {
        name: "2.0L 4-Cyl Engine w/ 6MT",
        price: 0,
        trim: ["tt4", "tt6"],
        serial: "pw3",
      },
      {
        name: "1.5L Turbo 4-Cyl 200hp w/ 6MT",
        price: 0,
        trim: ["tt7"],
        serial: "pw4",
      },
      {
        name: "2.0L Turbo 4-Cyl 315hp w/ 6MT",
        price: 0,
        trim: ["tt8"],
        serial: "pw5",
      },
    ],
  },
  {
    name: "Exterior Color",
    type: "Single",
    choicesAvailable: [
      {
        name: "Aegean Blue Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ec1",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Crystal Pearl Black",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ec2",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Lunar Silver Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6"],
        serial: "ec3",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Meteorite Gray Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6"],
        serial: "ec4",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Rallye Red",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ec5",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Blazing Orange Pearl",
        price: 395,
        trim: ["tt7"],
        serial: "ec6",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Boost Blue Pearl",
        price: 395,
        trim: ["tt5", "tt6", "tt8"],
        serial: "ec7",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Championship White",
        price: 395,
        trim: ["tt8"],
        serial: "ec8",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Morning Mist Metallic",
        price: 395,
        trim: ["tt2", "tt3"],
        serial: "ec9",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },

      {
        name: "Platinum Pearl White",
        price: 395,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7"],
        serial: "ec10",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Smoky Mauve Pearl",
        price: 395,
        trim: ["tt4", "tt6"],
        serial: "ec11",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
      {
        name: "Sonic Gray Pearl",
        price: 395,
        trim: ["tt1", "tt5", "tt6", "tt7", "tt8"],
        serial: "ec12",
        action: (vehicle, groupType, groupName, serial) =>
          exteriorColorAction(vehicle, groupType, groupName, serial),
      },
    ],
  },
  {
    name: "Interior Color",
    type: "Single",
    choicesAvailable: [
      {
        name: "Black Cloth",
        price: 0,
        trim: ["tt1", "tt2", "tt4"],
        serial: "ic1",
      },
      { name: "Gray Cloth", price: 0, trim: ["tt2"], serial: "ic2" },

      { name: "Black Leather", price: 0, trim: ["tt3", "tt5"], serial: "ic3" },

      { name: "Gray Leather", price: 0, trim: ["tt3", "tt6"], serial: "ic4" },

      { name: "Black & Red Cloth", price: 0, trim: ["tt7"], serial: "ic5" },
      {
        name: "Red/Black Suede-Effect Fabric",
        price: 0,
        trim: ["tt8"],
        serial: "ic6",
      },
    ],
  },
  {
    name: "Wheels",
    type: "Single",
    choicesAvailable: [
      {
        name: "18-Inch Gloss-Black Alloy Wheels",
        price: 0,
        trim: ["tt1", "tt4"],
        serial: "w1",
      },

      {
        name: "18-Inch Alloy Wheels",
        price: 0,
        trim: ["tt3", "tt6"],
        serial: "w2",
      },

      {
        name: "17-Inch Alloy Wheels",
        price: 0,
        trim: ["tt2", "tt5"],
        serial: "w3",
      },

      {
        name: "18-Inch Black Alloy Wheels",
        price: 1708,
        trim: ["tt1", "tt3", "tt4", "tt6", "tt7"],
        serial: "w4",
      },
      {
        name: "18-Inch Matte Black Alloy Wheels",
        price: 0,
        trim: ["tt7"],
        serial: "w5",
      },

      {
        name: "19-Inch Matte Black Alloy Wheels",
        price: 0,
        trim: ["tt8"],
        serial: "w6",
      },

      {
        name: "19-Inch Forged Alloy Wheels",
        price: 3100,
        trim: ["tt8"],
        serial: "w7",
      },
    ],
  },
  {
    name: "Packages",
    type: "Multiple",
    choicesAvailable: [
      {
        name: "All-Season Protection Package I",
        price: 420,
        trim: ["tt1", "tt2", "tt3"],
        serial: "pk1",
      },
      {
        name: "All-Season Protection Package I",
        price: 415,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk2",
      },
      {
        name: "All-Season Protection Package II",
        price: 370,
        trim: ["tt1", "tt2", "tt3"],
        serial: "pk3",
      },
      {
        name: "All-Season Protection Package II",
        price: 367,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk4",
      },
      {
        name: "HPD Package",
        price: 1452,
        trim: ["tt1", "tt2", "tt3"],
        serial: "pk5",
      },
      {
        name: "HPD Package",
        price: 1130,
        trim: ["tt7"],
        serial: "pk6",
      },
      {
        name: "HPD Package",
        price: 799,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk7",
      },
      {
        name: "Protection Package",
        price: 300,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "pk8",
      },
      {
        name: "Protection Package I",
        price: 295,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk9",
      },
      {
        name: "Protection Film Package",
        price: 150,
        trim: ["tt8"],
        serial: "pk10",
      },
    ],
  },
  {
    name: "Exterior Accessories",
    type: "Multiple",
    choicesAvailable: [
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
    choicesAvailable: [
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
    choicesAvailable: [
      {
        name: "Engine Block Heater",
        price: 90,
        trim: ["tt1"],
        serial: "elec1",
      },
    ],
  },
];

//Helper function to handle any special actions when Exterior Color selected
function exteriorColorAction(vehicle, groupType, groupName, serial) {
  //Outer switch to handle specified trim
  switch (vehicle.selected.trim) {
    case "Sedan Sport":
      //For Sedan Sport, the only Interior Color available is Black Cloth
      //Change the Interior Colors available to be only  Black Cloth
      vehicle.options.find(
        (a) => a.name === "Interior Color"
      ).choicesAvailable = dummyOptionsData
        .find((e) => e.name === "Interior Color")
        .choicesAvailable.slice(0, 1);
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Sedan EX":
      //Only ec9 results in two available options for Interior Color
      if (serial === "ec10") {
        //Change the Interior Colors available to be BOTH Gray Cloth & Black Cloth
        vehicle.options.find(
          (a) => a.name === "Interior Color"
        ).choicesAvailable = dummyOptionsData
          .find((e) => e.name === "Interior Color")
          .choicesAvailable.slice(0, 2);
        return addOptionSelected(vehicle, groupType, groupName, serial);
      } else {
        //Change the Interior Colors available to be only  Black Cloth
        vehicle.options.find(
          (a) => a.name === "Interior Color"
        ).choicesAvailable = dummyOptionsData
          .find((e) => e.name === "Interior Color")
          .choicesAvailable.slice(0, 1);
        return addOptionSelected(vehicle, groupType, groupName, serial);
      }
      break;
    case "Sedan Touring":
      return addOptionSelected(vehicle, groupType, groupName, serial);

      break;
    case "Hatchback Sport":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Hatcback EX-L":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Hatchbac Sport Touring":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Si":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
    case "Type R":
      return addOptionSelected(vehicle, groupType, groupName, serial);
      break;
  }
}
