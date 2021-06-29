<template>
  <li>
    <div class="flex-container" :class="className">
      <div>
        <span class="title">{{ title }}</span>
        <span v-if="!hasChild">: {{ value }}</span>
      </div>
      <div>
        <input
          v-if="componentData.type == 'text'"
          type="text"
          v-model="newVal"
          @input="changeValue"
        />
        <select
          v-else-if="componentData.type == 'boolean'"
          v-model="newVal"
          @blur="changeValue"
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <select
          v-else-if="componentData.type == 'select'"
          v-model="newVal"
          @change="changeValue"
        >
          <option
            v-for="option in unusedOptions"
            :key="option"
            :value="option"
            >{{ option }}</option
          >
        </select>
        <button
          v-else-if="componentData.type == 'parent'"
          @click="addSubComponent"
        >
          Add
        </button>
      </div>
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

export default {
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
  data() {
    return {
      newVal: this.value,
    };
  },
  computed: {
    hasChild() {
      return Array.isArray(this.value);
    },
    componentData() {
      return this.$store.getters.getComponentData(this.title);
    },
    unusedOptions() {
      return this.$store.getters.getComponentOptions(this.title);
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

      if (this.componentData.type == "select"){
          data.usedOption = true;
          data.optionId = this.componentData.options.find(option => option.name == event.target.value).optionId;
      }
      
      this.$store.dispatch("updateComponentValue", data);
    },
    addSubComponent() {
      const subItemTitle = this.componentData.add;
      if (subItemTitle == null) return;
      this.$store.dispatch("addComponent", { title: subItemTitle });
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}

.heading {
}

.list-item {
  width: 70vw;
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 2px solid red;
}

.list-item-sub {
  width: 50vw;
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 1px dashed red;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}
</style>
