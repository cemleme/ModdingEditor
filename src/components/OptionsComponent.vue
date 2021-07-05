<template>
  <div v-show="unusedOptions.length > 0">
    <q-select
      color="purple-12"
      filled
      v-model="selectVal"
      :options="unusedOptions"
      :dense="true"
      :label="`Change ` + componentTitle"
      style="width:150px;"
    >
    </q-select>
  </div>
</template>

<script>
export default {
  props: ["allOptions"],
  inject: ["id", "componentTitle", "parentName"],
  emits: ["changeData"],
  computed: {
    unusedOptions() {
      return this.$store.getters.getComponentOptions(this.componentTitle);
    },
  },
  data() {
    return {
      selectVal: null,
      type: null,
      inputVal: null,
    };
  },
  watch: {
    selectVal() {
      this.changeData();
    },
  },
  methods: {
    changeData() {
      if (this.selectVal == null) return;
      this.inputVal = this.selectVal;

      const data = {
        id: this.id,
        value: this.inputVal,
        parent: this.parentName,
        usedOption: true,
      };
      this.$emit("changeData", data);

      this.selectVal = null;
    },
  },
};
</script>

<style scoped>
input[type="number"] {
  width: 50px;
}
</style>
