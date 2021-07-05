<template>
  <teleport to="body">
    <q-dialog persistent v-model="isOpen">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar :icon="icon" color="primary" text-color="white" />
          <span class="q-ml-sm">
            <slot></slot>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="labelCancel" color="primary" @click="cancel" />
          <q-btn flat :label="labelConfirm" color="primary" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </teleport>
</template>

<script>
export default {
  name: "ModalConfirmation",
  props: {
      icon: {type: String, default: 'delete_forever'},
      labelConfirm: {type: String, default: 'Confirm'},
      labelCancel: {type: String, default: 'Cancel'},
  },
  data() {
    return {
      isOpen: false,
      resolvePromise: null,
      rejectPromise: null,
    };
  },
  methods: {
    confirm() {
      this.resolvePromise(true);
      this.isOpen = false;
    },
    cancel() {
      this.resolvePromise(false);
      this.isOpen = false;
    },
    show() {
      return new Promise((resolve, reject) => {
        this.isOpen = true;
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
  },
};
</script>
