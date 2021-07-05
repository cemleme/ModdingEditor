<template>
  <div class="row justify-between">
    <options-component :allOptions="allOptions" @changeData="updateData"/>
    <input-component v-if="componentData.input" :optionData="optionData" />
  </div>
</template>

<script>
import OptionsComponent from "./OptionsComponent.vue";
import InputComponent from "./InputComponent.vue";

export default {
  components: {
    OptionsComponent,
    InputComponent,
  },
  props: ["componentData"],
  inject: ["id", "componentTitle", "parentName"],
  computed: {
    unusedOptions() {
      return this.$store.getters.getComponentOptions(this.componentTitle);
    },
    allOptions(){
      return this.componentData.options;
    },
    optionData()
    {
      return  this.allOptions.find(
        (option) => option.name == this.selectVal
      );
    }
  },
  data() {
    return {
      selectVal: "",
      type: null,
      inputVal: null,
    };
  },
  created() {
      this.selectVal = this.unusedOptions[0];
    //console.log(this.componentData);
    //this.setValueOnNewSelection();
  },
  methods: {
    updateData(data) {
      this.selectVal = data.value;

      data.optionId = this.allOptions.find(
        (option) => option.name == this.selectVal
      ).optionId;

      data.type = this.allOptions.find(
        (option) => option.name == this.selectVal
      ).type;

      this.$store.dispatch("updateComponentValue", data);
    },
  },
};
</script>

<style scoped>
input[type="number"] {
  width: 50px;
}
</style>
