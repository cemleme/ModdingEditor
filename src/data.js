const scenes = [
  { name: "Persistence", optionId: 1 },
  { name: "Irkalla", optionId: 2 },
  { name: "Takaroa", optionId: 3 },
];
const items = [
  { name: "Heat Gun", optionId: 0, type:"int" },
  { name: "Air Canister", optionId: 1, type:"int" },
  { name: "Electrode", optionId: 2, type:"int" },
  { name: "Metal Scraps", optionId: 3, type:"int" },
  { name: "Plasma Cutter", optionId: 4, type:"int" },
  { name: "Power Supply", optionId: 5, type:"int" },
  { name: "Wire Needle", optionId: 6, type:"int" },
  { name: "Binary Sequencing Device", optionId: 7, type:"int" },
  { name: "Broken Binary Sequencer", optionId: 8, type:"int" },
  { name: "Hand Scanner", optionId: 9, type:"int" },
  { name: "Iron Ore", optionId: 12, type:"int" },
  { name: "Cluster Lifeform", optionId: 13, type:"int" },
  { name: "Silicon Wafers", optionId: 14, type:"int" },
  { name: "Iron Chips", optionId: 15, type:"int" },
];
const objectives = [
  { name: "Morning Routine", optionId: 2 },
  { name: "Read Messages", optionId: 3 },
  { name: "Check on the Hydroponics Bay", optionId: 4 },
  { name: "Contact the Commander", optionId: 5 },
  { name: "Repairs for June", optionId: 6 },
  { name: "Select Planet Destination", optionId: 7 },
  { name: "Crew Input", optionId: 8 },
  { name: "Ask the commander's opinion", optionId: 9 },
  { name: "Ask the quartermaster's opinion", optionId: 10 },
  { name: "Ask the engineer's opinion", optionId: 11 },
  { name: "Ask the health officer's opinion", optionId: 12 },
  { name: "Ask the pilot's opinion", optionId: 13 },
  { name: "Explore Irkalla", optionId: 14 },
  { name: "Tower Trouble", optionId: 15 },
  { name: "Find Data Fragments from the Second Star", optionId: 16 },
  { name: "Collect Lifeform Samples", optionId: 17 },
  { name: "Investigate Tower", optionId: 19 },
  { name: "Repair Tower", optionId: 20 },
  { name: "Return to Persistence", optionId: 21 },
  { name: "Head Back to Shuttle Drop Off Point", optionId: 22 },
  { name: "Return to Ship", optionId: 23 },
  { name: "Joey's Plasma Cutter", optionId: 1 },
  { name: "Contact Joey via Comms", optionId: 18 },
];
const objectivesMultiple = [
    { name: "Persistence Step 1", range:"2-13" },
    { name: "All Irkalla", range:"14-22" },
    { name: "Complete Demo", range:"1-23" },
];
const variables = [
  { name: "Persistence_Progress_Step", optionId: 39, type:"int" },
  { name: "Irkalla_Progress_Step", optionId: 54, type:"int" },
  { name: "Irkalla Tower Is Seen", optionId: 63, type:"bool" },
  { name: "Watched Irkalla Approach", optionId: 69, type:"bool" },
  { name: "Watched Takaroa Approach", optionId: 70, type:"bool" },
  { name: "Watched Banyan Approach", optionId: 71, type:"bool" },
  { name: "Completed Irkalla", optionId: 72, type:"bool" },
  { name: "Completed Takaroa", optionId: 73, type:"bool" },
  { name: "Completed Banyan", optionId: 74, type:"bool" },
  { name: "Character Name", optionId: 22, type:"text" },
  { name: "Blueprints", optionId: 2, type:"text" },
  { name: "Messages", optionId: 3, type:"text" },
  { name: "Logs", optionId: 13, type:"text" },
  { name: "Discoveries", optionId: 9, type:"text" },
];

export const componentDatas = [
  {
    tooltip: "Shows on the modding list to select among other mods",
    icon: "title",
    type: "text",
    title: "Mod Title",
    exportTitle: 'title'
  },
  {
    tooltip: "(optional) To remember who created to modding",
    icon: "person",
    type: "text",
    title: "Author",
    exportTitle: 'author'
  },
  {
    tooltip: "Select if you want to switch/reload scene after the modding",
    icon: "tv",
    type: "select",
    title: "Scene",
    options: scenes,
    exportTitle: 'scene'
  },
  {
    tooltip: "Clears current inventory",
    icon: "reset_tv",
    type: "boolean",
    title: "Reset Inventory",
    exportTitle: 'resetInventory'
  },
  {
    tooltip: "Selected items will be added to the current inventory",
    icon: "inventory_2",
    type: "parent",
    title: "Inventory Items",
    add: "Item",
    exportTitle: 'items'
  },
  {
    tooltip: "The amount of item is ignored if it can't be carried multiple",
    icon: "category",
    type: "select",
    title: "Item",
    parent: "Inventory Items",
    options: items,
    multiple: true,
    input: true,
    locked: true,
  },
  {
    tooltip: "Selected objective will be set as complete",
    icon: "receipt_long",
    type: "parent",
    title: "Completed Objectives",
    add: "Objective",
    exportTitle: 'objectives'
  },
  {
    icon: "task",
    type: "select",
    title: "Objective",
    parent: "Completed Objectives",
    options: objectives,
    multipleOptions: objectivesMultiple,
    multiple: true,
    locked: true,
  },
  {
    tooltip: "Sets selected global variables, other variables remain unchanged. Some variables require scene reload. You can set the scene component to reload.",
    icon: "tune",
    type: "parent",
    title: "Variables",
    add: "Variable",
    exportTitle: 'variables'
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
