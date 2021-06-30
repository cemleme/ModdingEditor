const scenes = [
  { name: "Persistence", optionId: 1 },
  { name: "Irkalla", optionId: 2 },
  { name: "Takaroa", optionId: 3 },
];
const items = [
  { name: "Hand Scanner", optionId: 73 },
  { name: "Metal Scraps", optionId: 2 },
];
const objectives = [
  { name: "Tower Trouble", optionId: 73 },
  { name: "Morning Routine", optionId: 2 },
  { name: "Test obj 1", optionId: 2 },
  { name: "asdfa", optionId: 2 },
  { name: "fsdfsd", optionId: 2 },
];
const variables = [
  { name: "Persistence_Progress", optionId: 73 },
  { name: "Irkalla_Progress", optionId: 2 },
  { name: "MessagesReceived", optionId: 3 },
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
  {
    type: "parent",
    title: "Objectives",
    add: "Objective",
  },
  {
    type: "select",
    title: "Objective",
    parent: "Objectives",
    options: objectives,
    multiple: true,
    locked: true,
  },
  {
    type: "parent",
    title: "Variables",
    add: "Variable",
  },
  {
    type: "select",
    title: "Variable",
    parent: "Variables",
    options: variables,
    multiple: true,
    locked: true,
    input: true
  },
];
