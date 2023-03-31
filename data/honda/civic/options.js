export const trims = [
  { name: "Sedan Sport", price: 25050, serial: "tt1" },
  { name: "Sedan EX", price: 26450, serial: "tt2" },
  { name: "Sedan Touring", price: 30050, serial: "tt3" },
  { name: "Hatchback Sport", price: 25850, serial: "tt4" },
  { name: "Hatchback EX-L", price: 28150, serial: "tt5" },
  { name: "Hatchback Sport Touring", price: 30950, serial: "tt6" },
  { name: "Si", price: 28500, serial: "tt7" },
  { name: "Type R", price: 42895, serial: "tt8" },
];

export const modelOptions = [
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
        trim: ["tt2", "tt3", "tt4", "tt5", "tt6"],
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
        action: true,
      },
      {
        name: "Crystal Pearl Black",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ec2",
        action: true,
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
        action: true,
      },
      {
        name: "Rallye Red",
        price: 0,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ec5",
        action: true,
      },
      {
        name: "Blazing Orange Pearl",
        price: 455,
        trim: ["tt7"],
        serial: "ec6",
      },
      {
        name: "Boost Blue Pearl",
        price: 455,
        trim: ["tt4", "tt6", "tt8"],
        serial: "ec7",
      },
      {
        name: "Championship White",
        price: 455,
        trim: ["tt8"],
        serial: "ec8",
      },
      {
        name: "Morning Mist Metallic",
        price: 455,
        trim: ["tt2", "tt3"],
        serial: "ec9",
        action: true,
      },

      {
        name: "Platinum Pearl White",
        price: 455,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7"],
        serial: "ec10",
        action: true,
      },
      {
        name: "Smoky Mauve Pearl",
        price: 455,
        trim: ["tt5", "tt6"],
        serial: "ec11",
      },
      {
        name: "Sonic Gray Pearl",
        price: 455,
        trim: ["tt1", "tt3", "tt4", "tt6", "tt7", "tt8"],
        serial: "ec12",
        action: true,
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
      { name: "Gray Cloth", price: 0, trim: [], serial: "ic2" },

      {
        name: "Black Leather",
        price: 0,
        trim: ["tt3", "tt5", "tt6"],
        serial: "ic3",
      },

      { name: "Gray Leather", price: 0, trim: [], serial: "ic4" },

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
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "pk1",
        popup: false,
        action: true,
      },
      {
        name: "All-Season Protection Package I",
        price: 415,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk2",
        popup: false,
        action: true,
      },
      {
        name: "All-Season Protection Package II",
        price: 370,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "pk3",
        popup: false,
        action: true,
      },
      {
        name: "All-Season Protection Package II",
        price: 367,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk4",
        popup: false,
        action: true,
      },
      {
        name: "HPD Package",
        price: 1452,
        trim: ["tt1", "tt2", "tt3"],
        serial: "pk5",
        popup: false,
        action: true,
      },
      {
        name: "HPD Package",
        price: 1130,
        trim: ["tt7"],
        serial: "pk6",
        popup: false,
        action: true,
      },
      {
        name: "HPD Package",
        price: 799,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk7",
        popup: false,
        action: true,
      },
      {
        name: "Protection Package",
        price: 300,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "pk8",
        popup: false,
        action: true,
      },
      {
        name: "Protection Package I",
        price: 295,
        trim: ["tt4", "tt5", "tt6"],
        serial: "pk9",
        popup: false,
        action: true,
      },
      {
        name: "R Protection Essentials",
        price: 700,
        trim: ["tt8"],
        serial: "pk10",
        action: true,
      },
      {
        name: "R Interior Driver's ",
        price: 950,
        trim: ["tt8"],
        serial: "pk11",
        action: true,
      },
      {
        name: "R Performance",
        price: 5350,
        trim: ["tt8"],
        serial: "pk12",
        action: true,
      },

      {
        name: "Protection Film",
        price: 150,
        trim: ["tt8"],
        serial: "pk13",
        popup: false,
        action: true,
      },
    ],
  },
  {
    name: "Exterior Accessories",
    type: "Multiple",
    choicesAvailable: [
      {
        name: "Bike Attachment-Frame Mount",
        price: 211,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea1",
        popup: true,
        action: true,
      },
      {
        name: "Body Side Molding",
        price: 242,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea2",
      },
      {
        name: "Car Cover",
        price: 375,
        trim: ["tt8"],
        serial: "ea3",
      },

      {
        name: "Decklid Spoiler-HPD",
        price: 322,
        trim: ["tt1", "tt2", "tt3"],
        serial: "ea4",
      },
      {
        name: "Door Edge Film",
        price: 54,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea5",
        popup: true,
        action: true,
      },
      {
        name: "Door Edge Guard",
        price: 124,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea6",
        popup: true,
        action: true,
      },
      {
        name: "Door Handle Film",
        price: 54,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea7",
      },
      {
        name: "Door Visors",
        price: 227,
        trim: ["tt8"],
        serial: "ea8",
      },

      {
        name: "Door Visors-Black",
        price: 231,
        trim: ["tt1", "tt4", "tt7"],
        serial: "ea9",
      },
      {
        name: "Door Visors-Chrome",
        price: 231,
        trim: ["tt2", "tt3", "tt5", "tt6"],
        serial: "ea10",
      },
      {
        name: "Emblem-HPD",
        price: 43,
        trim: ["tt4", "tt5", "tt6", "tt7"],
        serial: "ea11",
      },
      {
        name: "Emblems, Front & Rear-H-Mark",
        price: 113,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea12",
      },
      {
        name: "Emblem, Sport-Gloss Black",
        price: 40,
        trim: ["tt1", "tt4"],
        serial: "ea13",
      },
      {
        name: "Kayak Attachment",
        price: 264,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea14",
      },
      {
        name: "Moonroof Visor",
        price: 167,
        trim: ["tt2", "tt3", "tt5", "tt6", "tt7"],
        serial: "ea15",
      },
      {
        name: "Rear Bumper Applique",
        price: 76,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ea16",
      },
      {
        name: "Rear Bumper Protector",
        price: 95,
        trim: ["tt4", "tt5", "tt6"],
        serial: "ea17",
      },
      {
        name: "Roof Basket",
        price: 404,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea18",
      },

      {
        name: "Roof Box-Midsize",
        price: 555,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea19",
      },
      {
        name: "Roof Box-Short",
        price: 523,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea20",
      },
      {
        name: "Roof Rack",
        price: 399,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea21",
        popup: true,
        action: true,
      },
      {
        name: "Ski/Snowboard Attachment",
        price: 262,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea22",
      },
      {
        name: "Surf/Paddleboard Attachment",
        price: 169,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ea23",
      },
      {
        name: "Splash Guard Set",
        price: 113,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea24",
      },
      {
        name: "Tailgate Spoiler-HPD",
        price: 399,
        trim: ["tt4", "tt5", "tt6"],
        serial: "ea25",
      },

      {
        name: "Underbody Spoiler-HPD Front",
        price: 357,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea26",
      },
      {
        name: "Underbody Spoiler-HPD Rear",
        price: 322,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ea27",
      },
      {
        name: "Underbody Spoiler-HPD Side",
        price: 408,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ea28",
      },
      {
        name: "Valve Stem Caps",
        price: 113,
        trim: ["tt4", "tt5", "tt6", "tt7"],
        serial: "ea29",
      },
      {
        name: "Wheel Locks-Black",
        price: 92,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ea30",
      },
      {
        name: "Wheel Locks-Chrome",
        price: 63,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ea31",
      },
      {
        name: "Wheel Lug Nuts-Black",
        price: 51,
        trim: ["tt1", "tt2", "tt3"],
        serial: "ea32",
      },
      {
        name: "Wheel Lug Nuts-Black",
        price: 190,
        trim: ["tt4", "tt5", "tt6", "tt7"],
        serial: "ea33",
      },
      {
        name: "Wing Spoiler-Carbon Fiber",
        price: 2250,
        trim: ["tt8"],
        serial: "ea34",
      },
    ],
  },
  {
    name: "Interior Accessories",
    type: "Multiple",
    choicesAvailable: [
      {
        name: "All Season Floor Mats",
        price: 183,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ia1",
        // popup: false,
        // action: true,
      },
      {
        name: "Cargo Hook",
        price: 14,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ia2",
      },
      {
        name: "Cargo Net",
        price: 54,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ia3",
      },
      {
        name: "Cargo Tray",
        price: 121,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ia4",
      },
      {
        name: "Cargo Tray Dividers",
        price: 65,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ia5",
      },
      {
        name: "Contoured High-Wall Carpet Floor Mats",
        price: 194,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ia6",
        popup: false,
        action: true,
      },
      {
        name: "Door Sill Protection Film",
        price: 108,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7"],
        serial: "ia7",
        popup: false,
        action: true,
      },
      {
        name: "Door Sill Trim Illuminated",
        price: 322,
        trim: ["tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ia8",
        popup: false,
        action: true,
      },
      {
        name: "First Aid Kit",
        price: 34,
        trim: ["tt1", "tt2", "tt3"],
        serial: "ia9",
      },
      {
        name: "Illuminated Door Sill Trim-Red",
        price: 322,
        trim: ["tt1", "tt2", "tt3"],
        serial: "ia10",
        popup: false,
        action: true,
      },
      {
        name: "Rear Passenger Window Shades",
        price: 188,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "ia11",
      },
      {
        name: "Seat Back Protectors",
        price: 106,
        trim: ["tt4", "tt5", "tt6", "tt8"],
        serial: "ia12",
      },
      {
        name: "Shift Knob",
        price: 225,
        trim: ["tt8"],
        serial: "ia13",
      },
      {
        name: "Steering Wheel-Alcantara",
        price: 400,
        trim: ["tt8"],
        serial: "ia14",
      },
      {
        name: "Trunk Tray",
        price: 124,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ia15",
      },
      {
        name: "Trunk Tray Dividers",
        price: 65,
        trim: ["tt1", "tt2", "tt3", "tt7"],
        serial: "ia16",
      },
    ],
  },
  {
    name: "Electronic Accessories",
    type: "Multiple",
    choicesAvailable: [
      {
        name: "Engine Block Heater",
        price: 90,
        trim: ["tt1", "tt2", "tt3", "tt4", "tt4", "tt5", "tt6", "tt7", "tt8"],
        serial: "elec1",
      },
    ],
  },
];
