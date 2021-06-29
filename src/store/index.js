import { createStore } from "vuex";

import {componentDatas} from '../data.js';

//create random id for the component keys
const uid = function() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

const getArrayTitles = function(arr = [], propName){
  return arr.reduce((acc, val) => {
    acc = acc || [];
    if (!val.locked && !val.used) acc.push(val[propName]);
    return acc;
  }, []);
}


export default createStore({
  state: {
    componentDatas: componentDatas,
    usedOptions: {},
    usedComponents: [],
    componentTypes: {
      text: "base-component",
      boolean: "base-component",
      select: "base-component",
      parent: "base-component",
    },
    componentsList: [],
  },
  mutations: {
    updateComponentValue(state, payload) {
      payload.component.value = payload.newValue;
      if(payload.optionId) payload.component.optionId = payload.optionId;

      console.log(state.componentsList);
    },
    addComponent(state, payload) {
      let data = {
        id: uid(),
        title: payload.component.title,
      };

      if (payload.component.type == "text") data.value = "";
      else if (payload.component.type == "parent") data.value = [];
      else if (payload.component.type == "boolean") data.value = false;

      if (payload.parent) {
        payload.parent.value.push(data);
      } else {
        state.componentsList.push(data);
      }
    },
    setComponentAsUsed(_, payload) {
      payload.component.used = true;
    },
    unlockComponent(_, payload) {
      payload.component.locked = false;
    },
    updateUsedOptions(state, payload) {
      if (state.usedOptions[payload.title] == null) {
        const arr = [payload.newValue];
        state.usedOptions[payload.title] = arr;
      } else {
        const usedOptionsArray = state.usedOptions[payload.title];
        usedOptionsArray.push(payload.newValue);
        state.usedOptions[payload.title] = usedOptionsArray.filter(title => title != payload.oldValue);
      }
    },
  },
  actions: {
    updateComponentValue(context, payload) {
      const component = context.getters.getComponentById(payload);

      if (component != null) {
        if (payload.usedOption) {
          context.commit("updateUsedOptions", {
            title: component.title,
            oldValue: component.value,
            newValue: payload.value
          });
        }

        let updateData ={
          component: component,
          newValue: payload.value,
          optionId: payload.optionId
        };
        context.commit("updateComponentValue", updateData);
      }
    },
    addComponent(context, payload) {
      const component = context.getters.getComponentData(payload.title);
      let parent = null;

      if (component.parent)
        parent = context.getters.getComponentByTitle(component.parent);

      context.commit("addComponent", { component, parent });

      if (!component.multiple)
        context.commit("setComponentAsUsed", { component });

      const relatedComponents = context.getters.getRelatedComponents(
        payload.title
      );
      for (let index in relatedComponents) {
        const comp = relatedComponents[index];
        if (comp.locked) context.commit("unlockComponent", { component: comp });
      }
    },
  },
  getters: {
    getComponents(state) {
      return state.componentsList;
    },
    getComponentById: (state) => (payload) => {
      const id = payload.id;
      const parentTitle = payload.parent;

      if (parentTitle == null) {
        return state.componentsList.find((comp) => comp.id == id);
      } else {
        const parent = state.componentsList.find(
          (comp) => comp.title == parentTitle
        ).value;
        return parent.find((comp) => comp.id == id);
      }
    },
    getComponentByTitle: (state) => (title) => {
      return state.componentsList.find((comp) => comp.title == title);
    },
    GetComponentName: (state) => (type) => {
      return state.componentTypes[type];
    },
    getComponentData: (state) => (title) => {
      return state.componentDatas.find((comp) => comp.title == title);
    },
    getComponentTitles(state) {
      return getArrayTitles(state.componentDatas, 'title');
    },
    getOptionDataId: (state) => (title) => {
      const options = state.componentDatas.find((comp) => comp.title == title).options;
      options.find(op => op.tit)
    },
    getComponentOptions: (state) => (title) => {
      const component = state.componentDatas.find((comp) => comp.title == title);
      const allOptions =  getArrayTitles(component.options, 'name');
      const usedOptions = state.usedOptions[title];
      if(usedOptions == null) return allOptions;
      return allOptions.filter(option => !usedOptions.includes(option));
    },
    getRelatedComponents: (state) => (title) => {
      return state.componentDatas.filter((comp) => comp.parent == title);
    },
  },
});
