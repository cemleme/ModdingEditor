<template>
  <base-modal ref="deleteComponentConfirmation"
    >Delete {{ componentTitle }}?</base-modal
  >
  <base-modal ref="deleteChildConfirmation"
    >Delete {{ componentTitle }} children?</base-modal
  >

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
    >
      <q-tooltip> Add {{ componentData.add }} </q-tooltip>
    </q-btn>

    <add-multiple-options
      v-if="componentData.add != null && childHasMultipleOptions"
      :options="childMultipleOptions"
      :subItemTitle="componentData.add"
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
    >
      <q-tooltip>
        Hide childs
      </q-tooltip>
    </q-btn>
    <q-btn
      v-if="hasChild && !showChilds"
      class="gt-xs"
      size="12px"
      flat
      dense
      round
      icon="expand_more"
      @click="toggleChilds"
    >
      <q-tooltip>
        Show childs
      </q-tooltip>
    </q-btn>

    <q-btn
      v-if="hasChild"
      class="gt-xs"
      size="12px"
      flat
      dense
      round
      icon="layers_clear"
      @click="deleteChilds"
    >
      <q-tooltip>
        Delete childs
      </q-tooltip>
    </q-btn>

    <q-btn
      v-if="componentData.tooltip"
      class="gt-xs"
      size="12px"
      flat
      dense
      round
      icon="help"
    >
      <q-tooltip>
        {{ componentData.tooltip }}
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
    >
      <q-tooltip>
        Delete component?
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import BaseModal from "./BaseModal.vue";
import AddMultipleOptions from "./AddMultipleOptions.vue";

export default {
  components: {
    BaseModal,
    AddMultipleOptions,
  },
  props: ["componentData", "showChilds", "hasChild"],
  inject: ["id", "parentName", "componentTitle"],
  emits: ["toggleChilds"],
  computed: {
    childHasOptions() {
      return (
        this.$store.getters.getComponentOptions(this.componentData.add).length >
        0
      );
    },
    childMultipleOptions() {
      return this.$store.getters.getComponentMultipleOptions(
        this.componentData.add
      );
    },
    childHasMultipleOptions() {
      const multipleOptions = this.childMultipleOptions;
      return multipleOptions && multipleOptions.length > 0;
    },
  },
  methods: {
    deleteConfirm() {
      this.$refs.deleteComponentConfirmation.show().then((ok) => {
        if (ok) {
          const data = {
            id: this.id,
            parent: this.parentName,
            title: this.componentTitle,
          };

          this.$store.dispatch("deleteComponent", data);
        }
      });
    },
    toggleChilds() {
      this.$emit("toggleChilds");
    },
    addSubComponent() {
      const subItemTitle = this.componentData.add;
      if (subItemTitle == null) return;
      this.$store.dispatch("addComponent", { title: subItemTitle });
    },
    deleteChilds() {
      this.$refs.deleteChildConfirmation.show().then((ok) => {
        if (ok) {
          const data = {
            id: this.id,
            parent: this.parentName,
            title: this.componentTitle,
          };

          this.$store.dispatch("deleteChildren", data);
        }
      });
    },
  },
};
</script>
