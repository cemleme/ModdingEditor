<template>
  <div>
    <div v-show="unusedOptions.length > 0">
      <select ref="selectComp" @change="updateData">
        <option hidden value selected> -- change value -- </option>
        <option v-for="option in unusedOptions" :key="option" :value="option">{{
          option
        }}</option>
      </select>
    </div>

    <input
      v-if="haveAmount"
      type="number"
      ref="amount"
      value="1"
      @input="updateAmount"
    />
    <input v-if="haveInput" type="text" value="" @input="updateInput" />
  </div>
</template>

<script>
export default {
  props: ["haveAmount", "haveInput", "allOptions"],
  inject: ["id", "componentTitle", "parentName"],
  computed: {
    unusedOptions() {
      return this.$store.getters.getComponentOptions(this.componentTitle);
    },
  },
  data() {
    return {
      selectVal: "",
    };
  },
  methods: {
    updateAmount() {
      const data = {
        id: this.id,
        parent: this.parentName,
        count: this.$refs.amount.value,
      };

      this.$store.dispatch("updateComponentAmount", data);
    },
    updateInput(event) {
      const data = {
        id: this.id,
        parent: this.parentName,
        input: event.target.value,
      };

      this.$store.dispatch("updateComponentInput", data);
    },
    updateData() {
      this.selectVal = this.$refs.selectComp.value;

      const data = {
        id: this.id,
        value: this.selectVal,
        parent: this.parentName,
        usedOption: true,
      };

      data.optionId = this.allOptions.find(
        (option) => option.name == this.selectVal
      ).optionId;

      this.$store.dispatch("updateComponentValue", data);
      this.$refs.selectComp.value = null;
    },
  },
};
</script>
