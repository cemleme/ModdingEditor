<template>
  <q-item>
    <q-item-section avatar top style="min-width: 20px;">
      <q-icon
        color="primary"
        :name="componentData.icon"
        @click="toggleChilds"
      />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ title }}</span>
        <span v-if="!hasChild" class="text-grey-8">: {{ value }}</span>
      </q-item-label>
      <q-item-label lines="1" class="row">
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
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          v-if="componentData.add != null && childHasOptions"
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="add_circle_outline"
          @click="addSubComponent"
        />
        <q-btn
          v-if="hasChild && showChilds"
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="expand_less"
          @click="toggleChilds"
        />
        <q-btn
          v-if="hasChild && !showChilds"
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="expand_more"
          @click="toggleChilds"
        />
        <q-btn v-if="componentData.tooltip" class="gt-xs" size="12px" flat dense round icon="help">
          <q-tooltip>
            {{componentData.tooltip}}
          </q-tooltip>
        </q-btn>
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="deleteConfirm"
        />
      </div>
    </q-item-section>
  </q-item>

  <q-list
    v-if="hasChild && showChilds"
    class="rounded-borders"
    style="margin-left:70px;"
  >
    <base-component
      v-for="comp in value"
      :key="comp.id"
      :id="comp.id"
      :title="comp.title"
      :value="comp.value"
      :parentName="title"
      :isHeading="false"
    />
  </q-list>

  <q-separator inset="item" style="margin-left: 55px;" />
</template>

<script>
//import { ref } from 'vue'

import SelectComponent from "./SelectComponent.vue";
import BooleanSelect from "./BooleanSelect.vue";

export default {
  components: {
    SelectComponent,
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
  data() {
    return {
      showChilds: true,
    };
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
      return Array.isArray(this.value) && this.value.length > 0;
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
    deleteConfirm(){
      const data = {
        id: this.id,
        parent: this.parentName,
        title: this.title
      };

      this.$store.dispatch("confirm/askDelete",data );
    },
    toggleChilds() {
      this.showChilds = !this.showChilds;
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
