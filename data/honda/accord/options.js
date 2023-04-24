export const trims = [
  { name: "LX", price: 27295, serial: "tt1" },
  { name: "EX", price: 29610, serial: "tt2" },
  { name: "Sport Hybrid", price: 31895, serial: "tt3" },
  { name: "EX-L Hybrid", price: 33540, serial: "tt4" },
  { name: "Sport-L Hybrid", price: 33875, serial: "tt5" },
  { name: "Touring Hybrid", price: 37890, serial: "tt6" },
];

export const dummyOptionsData = [
  {
    name: "Powertrain",
    type: "Single",
    choices: [
      {
        name: "192hp CVT w/ 1.5L Turbo 4-Cyl",
        price: 0,
        trim: ["tt1", "tt2"],
        serial: "pw1",
      },
      {
        name: "204hp E-CVT w/ 2.0L L4 w/ 2 Motor Hybrid System",
        price: 0,
        trim: ["tt3", "tt4", "tt5", "tt6"],
        serial: "pw2",
      },
    ],
  },
  {
    name: "Exterior Color",
    type: "Single",
    choices: [
      {
        name: "Canyon River Blue Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt5", "tt6"],
        serial: "ec4",
      },
      {
        name: "Crystal Black Pearl",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt5", "tt6"],
        serial: "ec4",
      },
      {
        name: "Lunar Silver Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6"],
        serial: "ec3",
        action: true,
      },
      {
        name: "Meteorite Gray Metallic",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt5", "tt6"],
        serial: "ec4",
      },

      {
        name: "Platinum Pearl White",
        price: 455,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7"],
        serial: "ec10",
        action: true,
      },
      {
        name: "Radiant Red Metallic",
        price: 455,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7"],
        serial: "ec10",
        action: true,
      },
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

export const trimSelected = (trim, serialSelected) => {
  var optionsForTrimSelected = dummyOptionsData.map((option) => {
    return {
      ...option,
      choices: option.choices.filter((choice) =>
        choice.trim.includes(serialSelected)
      ),
    };
  });
  return optionsForTrimSelected;
};
