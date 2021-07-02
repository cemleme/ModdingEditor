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
    tooltip: "Shows on the modding list to select among other mods",
    icon: "title",
    type: "text",
    title: "Mod Title",
  },
  {
    tooltip: "(optional) To remember who created to modding",
    icon: "person",
    type: "text",
    title: "Author",
  },
  {
    tooltip: "Select if you want to switch/reload scene after the modding",
    icon: "tv",
    type: "select",
    title: "Scene",
    options: scenes,
  },
  {
    tooltip: "Clears current inventory",
    icon: "reset_tv",
    type: "boolean",
    title: "Reset Inventory",
  },
  {
    tooltip: "Selected items will be added to the current inventory",
    icon: "inventory_2",
    type: "parent",
    title: "Inventory Items",
    add: "Item",
  },
  {
    tooltip: "The amount of item is ignored if it can't be carried multiple",
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
    tooltip: "Selected objective will be set as complete",
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
    tooltip: "Sets selected global variables, other variables remain unchanged",
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
