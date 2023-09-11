import { groupBy } from "lodash";

export type RecipeType = {
  id: string;
  input: ConnectionType[];
  output: ConnectionType[];
  productionNodes: string[];
};

export type ConnectionType = {
  id: string;
  count: number;
};

export type ProductionNodeType = {
  id: string;
  name: string;
  desc: string;
  image: string;
  recipes: RecipeType[];
};

export type ItemDescType = {
  id: string;
  name: string;
  image: string;
};

export const itemList: ItemDescType[] = [
  {
    id: "constructor",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/6/61/Constructor.png",
    name: "Constructor",
  },
  {
    id: "ironPlate",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/5/51/Iron_Plate.png",
    name: "Iron Plage",
  },
  {
    id: "ironRod",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/5/5f/Iron_Rod.png",
    name: "Iron Rod",
  },
  {
    id: "screw",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/5/59/Screw.png",
    name: "Screw",
  },
  {
    id: "cable",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/4/49/Cable.png",
    name: "Cable",
  },
  {
    id: "wire",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/7/77/Wire.png",
    name: "Wire",
  },
  {
    id: "copperIngot",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/0/00/Copper_Ingot.png",
    name: "Copper Ingot",
  },
  {
    id: "copperOre",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/7/78/Copper_Ore.png",
    name: "Copper Ore",
  },
  {
    id: "ironOre",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/8/87/Iron_Ore.png",
    name: "Iron Ore",
  },
  {
    id: "ironIngot",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/0/0a/Iron_Ingot.png",
    name: "Iron Ingot",
  },
  {
    id: "reinforcedIronPlate",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/2/29/Reinforced_Iron_Plate.png",
    name: "Reinforced Iron Plate",
  },
  {
    id: "rotor",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/3/3d/Rotor.png",
    name: "Rotor",
  },
];

export const itemsDescMap = itemList.reduce<Record<string, ItemDescType>>(
  (acc, val) => {
    acc[val.id] = val;
    return acc;
  },
  {}
);

export const recipesList: RecipeType[] = [
  {
    id: "rotor",
    productionNodes: ["constructor"],
    input: [
      {
        count: 20,
        id: "ironRod",
      },
      {
        count: 100,
        id: "screw",
      },
    ],
    output: [
      {
        count: 4,
        id: "rotor",
      },
    ],
  },
  {
    id: "ironRod",
    productionNodes: ["constructor"],
    input: [
      {
        count: 15,
        id: "ironIngot",
      },
    ],
    output: [
      {
        count: 15,
        id: "ironRod",
      },
    ],
  },

  {
    id: "ironPlate",
    productionNodes: ["constructor"],
    input: [
      {
        count: 30,
        id: "ironIngot",
      },
    ],
    output: [
      {
        count: 20,
        id: "ironPlate",
      },
    ],
  },
  {
    id: "screw",
    productionNodes: ["constructor"],
    input: [
      {
        count: 10,
        id: "ironRod",
      },
    ],
    output: [
      {
        count: 40,
        id: "screw",
      },
    ],
  },
  {
    id: "cable",
    productionNodes: ["constructor"],
    input: [
      {
        count: 60,
        id: "wire",
      },
    ],
    output: [
      {
        count: 30,
        id: "cable",
      },
    ],
  },
  {
    id: "wire",
    productionNodes: ["constructor"],
    input: [
      {
        count: 15,
        id: "copperIngot",
      },
    ],
    output: [
      {
        count: 30,
        id: "wire",
      },
    ],
  },
  {
    id: "copperIngot",
    productionNodes: ["constructor"],
    input: [
      {
        count: 30,
        id: "copperOre",
      },
    ],
    output: [
      {
        count: 30,
        id: "copperIngot",
      },
    ],
  },
  {
    id: "ironIngot",
    productionNodes: ["constructor"],
    input: [
      {
        count: 30,
        id: "ironOre",
      },
    ],
    output: [
      {
        count: 30,
        id: "ironIngot",
      },
    ],
  },
  {
    id: "reinforcedIronPlate",
    productionNodes: ["constructor"],
    input: [
      {
        count: 30,
        id: "ironPlate",
      },
      {
        count: 60,
        id: "screw",
      },
    ],
    output: [
      {
        count: 5,
        id: "reinforcedIronPlate",
      },
    ],
  },
];

export const recipeMap = recipesList.reduce<Record<string, RecipeType>>(
  (acc, val) => {
    acc[val.id] = val;
    return acc;
  },
  {}
);

export const productionNodesList: ProductionNodeType[] = [
  {
    id: "constructor",
    name: "Constructor",
    image:
      "https://static.wikia.nocookie.net/satisfactory_gamepedia_en/images/6/61/Constructor.png/revision/latest?cb=20220920180002",
    desc: "Crafts one part into another part. Can be automated by feeding parts into it with a conveyor belt connected to the input. The produced parts can be automatically extracted by connecting a conveyor belt to the output.",
    recipes: recipesList,
  },
];
