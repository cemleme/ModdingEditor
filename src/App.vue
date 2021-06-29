<template>
<select ref="component-select">
  <option v-for="component in componentTitles" :key="component" :value="component">{{component}}</option>
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
</template>

<script>

export default {
  computed: {
    components() {
      return this.$store.getters.getComponents;
    },
    componentTitles(){
      return this.$store.getters.getComponentTitles;
    }
  },
  methods: {
    addComponent() {
      this.$store.dispatch("addComponent", {title: this.$refs['component-select'].value});
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

ul{
  list-style: none;
  padding-inline-start: 1rem;
}
</style>
