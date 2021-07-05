<template>
  <div>
    <q-input
      v-if="textData"
      v-model="inputVal"
      type="text"
      outlined
      style="width: 150px;"
      :dense="true"
      @change="updateInput"
    >
      <template v-slot:before>
        <q-icon name="text_fields" />
      </template>
    </q-input>

    <q-input
      v-else-if="intData"
      v-model.number="inputVal"
      type="number"
      outlined
      style="width: 100px;"
      :dense="true"
      @change="updateInput"
    >
      <template v-slot:before>
        <q-icon name="pin" />
      </template>
    </q-input>
    <q-checkbox
      v-else-if="booleanData"
      v-model="inputVal"
      @click="updateInput"
    />
  </div>
</template>

<script>
export default {
  props: ["optionData"],
  inject: ["id", "parentName"],
  computed: {
    booleanData() {
      return this.optionData.type === "bool";
    },
    intData() {
      return this.optionData.type === "int";
    },
    textData() {
      return this.optionData.type === "text";
    },
  },
  data() {
    return {
      selectVal: "",
      inputVal: null,
    };
  },
  watch: {
    optionData() {
      this.setValueOnNewSelection();
    },
  },
  created() {
    this.setValueOnNewSelection();
  },
  methods: {
    updateInput() {
      const data = {
        id: this.id,
        parent: this.parentName,
        input: this.inputVal,
      };
      
      this.$store.dispatch("updateComponentInput", data);
    },
    setValueOnNewSelection() {
      if (this.booleanData) this.inputVal = true;
      else if (this.intData) this.inputVal = 1;
      else if (this.textData) this.inputVal = "";

      this.updateInput();
    },
  },
};
</script>
