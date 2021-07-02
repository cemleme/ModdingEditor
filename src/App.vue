<template>
  <div class="row">
    <div class="col-8">
      <q-list bordered class="rounded-borders" style="max-width: 600px">
        <q-item-label header>
          <select ref="component-select">
            <option
              v-for="component in unusedComponentTitles"
              :key="component"
              :value="component"
              >{{ component }}</option
            >
          </select>
          <button @click="addComponent">add</button>
        </q-item-label>

        <q-separator spaced />

        <base-component
          v-for="comp in components"
          :key="comp.id"
          :id="comp.id"
          :title="comp.title"
          :value="comp.value"
          :isHeading="true"
        />
      </q-list>
    </div>

    <div class="col-4">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">Output:</div>
            </div>

            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>Copy</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Save File</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          {{ jsonData }}
        </q-card-section>
      </q-card>

      <div class="json-output">{{ components }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    jsonData() {
      return (
        "[" + JSON.stringify(this.$store.getters.getJSONdata, null, 4) + "]"
      );
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
  margin: 30px;
}
</style>
