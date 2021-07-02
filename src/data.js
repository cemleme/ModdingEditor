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
    icon: "title",
    type: "text",
    title: "Mod Title",
  },
  {
    icon: "person",
    type: "text",
    title: "Author",
  },
  {
    icon: "tv",
    type: "select",
    title: "Scene",
    options: scenes,
  },
  {
    icon: "reset_tv",
    type: "boolean",
    title: "Reset Inventory",
  },
  {
    icon: "inventory_2",
    type: "parent",
    title: "Inventory Items",
    add: "Item",
  },
  {
    icon: "category",
    type: "select",
    title: "Item",
    parent: "Inventory Items",
    options: items,
    multiple: true,
    amount: true,
    locked: true,
  },
  {
    icon: "receipt_long",
    type: "parent",
    title: "Objectives",
    add: "Objective",
  },
  {
    icon: "task",
    type: "select",
    title: "Objective",
    parent: "Objectives",
    options: objectives,
    multiple: true,
    locked: true,
  },
  {
    icon: "tune",
    type: "parent",
    title: "Variables",
    add: "Variable",
  },
  {
    icon: "settings",
    type: "select",
    title: "Variable",
    parent: "Variables",
    options: variables,
    multiple: true,
    locked: true,
    input: true
  },
];
