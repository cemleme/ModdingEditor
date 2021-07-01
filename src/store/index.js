import { createStore } from "vuex";
import { componentDatas } from "../data.js";

//create random id for the component keys
const uid = function() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

const getArrayTitles = function(arr = [], propName, filter = null) {
  let array = arr;

  if (filter != null) {
    array = arr.filter(filter);
  }

  return array.reduce((acc, val) => {
    acc = acc || [];
    if (!val.locked) acc.push(val[propName]);
    return acc;
  }, []);
};

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
    updateComponentValue(_, payload) {
      payload.component.value = payload.newValue;
      if (payload.optionId) payload.component.optionId = payload.optionId;
    },
    updateComponentAmount(_, payload){
      payload.component.count = payload.count;
    },
    updateComponentInput(_, payload){
      payload.component.input = payload.input;
    },
    addComponent(state, payload) {
      let data = {
        id: uid(),
        title: payload.component.title,
        value: payload.value,
      };

      if (payload.parent) {
        payload.parent.value.push(data);
      } else {
        state.componentsList.push(data);
      }
    },
    setComponentAsUsed(state, payload) {
      if (!state.usedComponents.includes(payload.title)) {
        state.usedComponents.push(payload.title);
      }
    },
    setComponentAsUnused(state, payload){
      state.usedComponents = state.usedComponents.filter(comp=> comp != payload.title);
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
        if(payload.newValue != null) usedOptionsArray.push(payload.newValue);
        state.usedOptions[payload.title] = usedOptionsArray.filter(
          (title) => title != payload.oldValue
        );
      }
    },
    deleteUsedOptionTitle(state, payload){
      state.usedOptions[payload.title] = null;
    },
    deleteComponent(state, payload){
      state.componentsList = state.componentsList.filter(comp => comp != payload);
    },
    deleteChildComponent(state,payload){
      payload.parent.value = payload.parent.value.filter(comp => comp != payload.component);
    }
  },
  actions: {
    updateComponentValue(context, payload) {
      const component = context.getters.getComponentById(payload);
      if (component != null) {
        if (payload.usedOption) {
          context.commit("updateUsedOptions", {
            title: component.title,
            oldValue: component.value,
            newValue: payload.value,
          });
        }

        let updateData = {
          component: component,
          newValue: payload.value,
          optionId: payload.optionId,
        };

        if (payload.count) updateData.count = payload.count;

        context.commit("updateComponentValue", updateData);
      }
    },
    updateComponentAmount(context, payload)
    {
      const component = context.getters.getComponentById(payload);

      if (component != null) {
        let updateData = {
          component: component,
          count: payload.count
        };

        context.commit("updateComponentAmount", updateData);
      }
    },
    updateComponentInput(context, payload)
    {
      const component = context.getters.getComponentById(payload);

      if (component != null) {
        let updateData = {
          component: component,
          input: payload.input
        };

        context.commit("updateComponentInput", updateData);
      }
    },
    addComponent(context, payload) {
      const component = context.getters.getComponentData(payload.title);
      let parent = null;

      if (component.parent)
        parent = context.getters.getComponentByTitle(component.parent);

      let value = null;

      if (component.type == "text") value = "";
      else if (component.type == "parent") value = [];
      else if (component.type == "boolean") value = false;
      else if (component.type == "select") {
        value = context.getters.getComponentOptions(component.title)[0];
        context.commit("updateUsedOptions", {
          title: component.title,
          oldValue: null,
          newValue: value,
        });
      }

      context.commit("addComponent", { component, parent, value });

      if (!component.multiple)
        context.commit("setComponentAsUsed", { title:payload.title });

      const relatedComponents = context.getters.getRelatedComponents(
        payload.title
      );
      for (let index in relatedComponents) {
        const comp = relatedComponents[index];
        if (comp.locked) context.commit("unlockComponent", { component: comp });
      }
    },
    deleteComponent(context, payload){
      const component = context.getters.getComponentById(payload);

      if(payload.parent == null)
      {
        context.commit("setComponentAsUnused", { title:component.title });
        
        if(Array.isArray(component.value) && component.value.length > 0)
        {
          context.commit("deleteUsedOptionTitle", {
            title: component.value[0].title,
          });
        }

        context.commit("deleteComponent", component);
      }
      else {
        const parent = context.getters.getComponentByTitle(payload.parent);
        context.commit("updateUsedOptions", {
          title: component.title,
          oldValue: component.value,
          newValue: null,
        });
        context.commit("deleteChildComponent", {component, parent});
      }
    }
  },
  getters: {
    getJSONdata(state) {
      return state.componentsList.reduce((acc, val) => {
        acc = acc || {};
        acc[val["title"]] = val["value"];
        //if (!val.locked && !val.used) acc.push(val[propName]);
        return acc;
      }, {});
    },
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
    getParentComponent: (state) => (title) =>  {
      const parentTitle = state.componentDatas.find((comp) => comp.title == title).parent;
      return state.componentsList.find((comp) => comp.title == parentTitle);
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
    getUnusedParentComponentTitles(state) {
      const allTitles = getArrayTitles(
        state.componentDatas,
        "title",
        (comp) => comp.parent == null
      );

      return allTitles.filter((title) => !state.usedComponents.includes(title));
    },
    getOptionDataId: (state) => (title) => {
      const options = state.componentDatas.find((comp) => comp.title == title)
        .options;
      options.find((op) => op.tit);
    },
    getComponentOptions: (state) => (title) => {
      const component = state.componentDatas.find(
        (comp) => comp.title == title
      );
      const allOptions = getArrayTitles(component.options, "name");
      const usedOptions = state.usedOptions[title];
      if (usedOptions == null) return allOptions;
      return allOptions.filter((option) => !usedOptions.includes(option));
    },
    getRelatedComponents: (state) => (title) => {
      return state.componentDatas.filter((comp) => comp.parent == title);
    },
  },
});
