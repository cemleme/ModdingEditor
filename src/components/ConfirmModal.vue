<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Delete component - {{title}}?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeModal" />
        <q-btn
          flat
          label="Delete"
          color="primary"
          
          @click="confirmDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  computed: {
    confirm() {
      return this.$store.getters['confirm/getConfirm'];
    },
    title(){
        return this.$store.getters['confirm/getTitle'];
    }
  },
  methods: {
    confirmDelete() {
        this.$store.dispatch("confirm/approveDelete");
    },
    closeModal(){
        this.$store.dispatch("confirm/cancelDelete");
    }
  },
};
</script>
