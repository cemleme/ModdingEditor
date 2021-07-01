<template>
  <li>
    <div class="flex-container" :class="className">
      <div>
        <span class="title">{{ title }}</span>
        <span v-if="!hasChild">: {{ value }}</span>
      </div>
      <div class="flex-container">
        <input
          v-if="componentData.type == 'text'"
          type="text"
          @input="changeValue"
        />
        <boolean-select v-else-if="componentData.type == 'boolean'" />
        <select-component
          v-else-if="componentData.type == 'select'"
          :haveAmount="componentData.amount"
          :haveInput="componentData.input"
          :allOptions="componentData.options"
        />
        <add-button v-else-if="componentData.add != null && childHasOptions" />
      </div>
      <button @click="deleteComponent">Del</button>
    </div>

    <ul v-if="hasChild">
      <base-component
        v-for="comp in value"
        :key="comp.id"
        :id="comp.id"
        :title="comp.title"
        :value="comp.value"
        :parentName="title"
        :isHeading="false"
      />
    </ul>
  </li>
</template>

<script>
//import { ref } from 'vue'

import SelectComponent from "./SelectComponent.vue";
import AddButton from "./AddButton.vue";
import BooleanSelect from "./BooleanSelect.vue";

export default {
  components: {
    SelectComponent,
    AddButton,
    BooleanSelect,
  },
  props: {
    id: { type: String, required: true },
    title: {
      type: String,
    },
    value: {},
    isHeading: {
      type: Boolean,
      default: false,
    },
    parentName: {
      type: String,
      default: null,
    },
  },
  provide() {
    return {
      id: this.id,
      componentTitle: this.title,
      changeValue: this.changeValue,
      addSubComponent: this.addSubComponent,
      parentName: this.parentName,
    };
  },
  computed: {
    hasChild() {
      return Array.isArray(this.value);
    },
    componentData() {
      return this.$store.getters.getComponentData(this.title);
    },
    childHasOptions() {
      return (
        this.$store.getters.getComponentOptions(this.componentData.add).length >
        0
      );
    },
    className() {
      let className = "list-item";
      if (this.isHeading) className += " heading ";
      else className += " list-item-sub";
      return className;
    },
  },
  methods: {
    changeValue(event) {
      const data = {
        id: this.id,
        value: event.target.value,
        parent: this.parentName,
      };

      this.$store.dispatch("updateComponentValue", data);
    },
    addSubComponent() {
      const subItemTitle = this.componentData.add;
      if (subItemTitle == null) return;
      this.$store.dispatch("addComponent", { title: subItemTitle });
    },
    deleteComponent() {
      const data = {
        id: this.id,
        parent: this.parentName,
      };

      this.$store.dispatch("deleteComponent", data);
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}

.list-item {
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 2px solid red;
}

.list-item-sub {
  width: 40vw;
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 1px dashed red;
}
</style>
