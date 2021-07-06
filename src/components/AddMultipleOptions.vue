<template>
  <q-btn class="gt-xs" size="12px" flat dense round icon="add_circle">
    <q-tooltip> Add multiple options </q-tooltip>
    <q-popup-edit v-model="label" auto-save>
      <q-select
        filled
        bottom-slots
        v-model="selectValue"
        :options="options"
        option-value="range"
        option-label="name"
        label="Select Component to Add:"
        :hide-bottom-space="true"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="library_add"
            @click="addMultipleSubComponents"
          />
        </template>
      </q-select>
    </q-popup-edit>
  </q-btn>
</template>

<script>
export default {
  props: ["options", "subItemTitle"],
  data() {
    return {
      label: "add multiple",
      selectValue: null,
    };
  },
  methods: {
    addMultipleSubComponents() {
      if (this.subItemTitle == null) return;
      const data = {
        title: this.subItemTitle,
        range: this.selectValue.range,
      };
      this.$store.dispatch("addMultipleSubComponent", data);
    },
  },
};
</script>
