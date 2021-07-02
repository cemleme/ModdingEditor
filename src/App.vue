<template>
  <div class="row">
    <div class="col-sm-7 col-xs-12 q-mr-md">
      <q-list bordered class="rounded-borders">
        <q-select
          filled
          bottom-slots
          v-model="componentTitle"
          :options="unusedComponentTitles"
          label="Select Component to Add:"
          :hide-bottom-space="true"
        >
          <template v-slot:after>
            <q-btn round dense flat icon="library_add" @click="addComponent" />
          </template>
        </q-select>

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

    <div class="col-sm-4 col-xs-12">
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

    <confirm-modal />
</template>

<script>
import ConfirmModal from "./components/ConfirmModal.vue";

export default {
  components: {ConfirmModal},
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
  data() {
    return {
      componentTitle: null,
    };
  },
  methods: {
    addComponent() {
      if (this.componentTitle == null) return;

      this.$store.dispatch("addComponent", {
        title: this.componentTitle,
      });
      this.componentTitle = null;
    },
    GetComponentName(type) {
      return this.$store.getters.GetComponentName(type);
    }
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
