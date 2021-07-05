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
      <q-item-label lines="1">
        <input
          v-if="componentData.type == 'text'"
          type="text"
          @input="changeValue"
        />
        <boolean-select v-else-if="componentData.type == 'boolean'" />
        <select-component v-else-if="componentData.type == 'select'" :componentData="componentData" />

      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <action-buttons :componentData="componentData" :hasChild="hasChild" :showChilds="showChilds" @toggleChilds="toggleChilds"/>
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
import SelectComponent from "./SelectComponent.vue";
import BooleanSelect from "./BooleanSelect.vue";
import ActionButtons from "./ActionButtons.vue";

export default {
  components: {
    SelectComponent,
    BooleanSelect,
    ActionButtons
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
