<template>
  <div class="flex-container">
    <div class="flex-div component-editor">
      <select ref="component-select">
        <option
          v-for="component in unusedComponentTitles"
          :key="component"
          :value="component"
          >{{ component }}</option
        >
      </select>
      <button @click="addComponent">add</button>
      <ul>
        <base-component
          v-for="comp in components"
          :key="comp.id"
          :id="comp.id"
          :title="comp.title"
          :value="comp.value"
          :isHeading="true"
        />
      </ul>
    </div>
    <div class="flex-div json-output">{{jsonData}}</div>
    <div class="flex-div json-output">{{components}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    jsonData(){
      return '['+JSON.stringify(this.$store.getters.getJSONdata, null, 4)+']';
    },
    components() {
      return this.$store.getters.getComponents;
    },
    unusedComponentTitles() {
      return this.$store.getters.getUnusedParentComponentTitles;
    },
  },
  methods: {
    addComponent() {
      this.$store.dispatch("addComponent", {
        title: this.$refs["component-select"].value,
      });
    },
    GetComponentName(type) {
      return this.$store.getters.GetComponentName(type);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 20px;
}

ul {
  list-style: none;
  padding-inline-start: 1rem;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-div {
  margin: 1rem;
  width: 40vw;
}
</style>
