export const trimsData = {
  trims: [
    { name: "Sedan LX", price: 22350, serial: "tt1" },
    { name: "Sedan Sport", price: 23750, serial: "tt2" },
    { name: "Sedan EX", price: 25350, serial: "tt3" },
    { name: "Sedan Touring", price: 28950, serial: "tt4" },
    { name: "Hatchback LX", price: 22350, serial: "tt5" },
    { name: "Hatchback Sport", price: 24550, serial: "tt6" },
    { name: "Hatchback EX-L", price: 27050, serial: "tt7" },
    { name: "Hatchback Sport Touring", price: 29850, serial: "tt8" },
    { name: "Si", price: 27300, serial: "tt9" },
    { name: "Si HPT", price: 27300, serial: "tt10" },
  ],
};

export const optionsData = {
  options: [
    {
      name: "Powertrain",
      type: "Single",
      choices: [{ name: "2.0L 4-Cyl. Engine with CVT", price: 0, trim: "tt1" }],
    },
    {
      name: "Exterior Color",
      type: "Single",
      choices: [
        { name: "Aegean Blue Metallic", price: 0, trim: ["tt1"] },
        { name: "Crystal Pearl Black", price: 0, trim: ["tt1"] },
        { name: "Lunar Silver Metallic", price: 0, trim: ["tt1"] },
        { name: "Meteorite Gray Metallic", price: 0, trim: ["tt1"] },
        { name: "Rallye Red", price: 0, trim: ["tt1"] },
        { name: "Platinum Pearl White", price: 395, trim: ["tt1"] },
        { name: "Sonic Gray Pearl", price: 395, trim: ["tt1"] },
      ],
    },
    {
      name: "Interior Color",
      type: "Single",
      choices: [{ name: "Black Cloth", price: 0, trim: ["tt1"] }],
    },
    {
      name: "Wheels",
      type: "Single",
      choices: [
        { name: "18-inch Gloss-Black Alloy Wheels", price: 0, trim: ["tt1"] },
        { name: "18-inch Black Alloy Wheels", price: 1708, trim: ["tt1"] },
      ],
    },
    {
      name: "Packages",
      type: "Multiple",
      choices: [
        { name: "All-Season Protection Package I", price: 420, trim: ["tt1"] },
        { name: "All-Season Protection Package II", price: 370, trim: ["tt1"] },
        { name: "HPD Package", price: 1452, trim: ["tt1"] },
        { name: "Protection Package", price: 300, trim: ["tt1"] },
      ],
    },
    {
      name: "Interior Accessories",
      type: "Multiple",
      choices: [
        { name: "Body Side Molding", price: 242, trim: ["tt1"] },
        { name: "Decklid Spoiler", price: 322, trim: ["tt1"] },
        { name: "Door Edge Film", price: 54, trim: ["tt1"] },
        { name: "Door Edge Guard", price: 124, trim: ["tt1"] },
        { name: "Door Handle Film", price: 54, trim: ["tt1"] },
      ],
    },
    {
      name: "Exterior Accessories",
      type: "Multiple",
      choices: [
        { name: "All Season Floor Mats", price: 183, trim: ["tt1"] },
        { name: "Cargo Hook", price: 14, trim: ["tt1"] },
        { name: "Cargo Net", price: 54, trim: ["tt1"] },
        { name: "Carpet Floor Mats", price: 194, trim: ["tt1"] },
        { name: "Door Sill Protection Film", price: 108, trim: ["tt1"] },
      ],
    },
    {
      name: "Electronic Accessories",
      type: "Multiple",
      choices: [{ name: "Engine Block Heater", price: 90, trim: ["tt1"] }],
    },
  ],
};

//Validation function for only selections which will affect other possible choices, say select, deselect or change choices available
export const validate = (vehicle, optionChoice) => {
  switch (optionChoice) {
    case "Oranges":
      console.log("Oranges are $0.59 a pound.");
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
};
