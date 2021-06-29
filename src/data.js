const scenes = [
  { name: "Persistence", optionId: 1 },
  { name: "Irkalla", optionId: 2 },
  { name: "Takaroa", optionId: 3 },
];
const items = [
  { name: "Hand Scanner", optionId: 73 },
  { name: "Metal Scraps", optionId: 2 },
];

export const componentDatas = [
  {
    type: "text",
    title: "Mod Title",
  },
  {
    type: "text",
    title: "Author",
  },
  {
    type: "select",
    title: "Scene",
    options: scenes,
  },
  {
    type: "boolean",
    title: "Reset Inventory",
  },
  {
    type: "parent",
    title: "Inventory Items",
    add: "Item",
  },
  {
    type: "select",
    title: "Item",
    parent: "Inventory Items",
    options: items,
    multiple: true,
    amount: true,
    locked: true,
  },
];
