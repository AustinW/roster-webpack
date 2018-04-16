<template>
    <b-modal id="addAthlete" :title="title" @ok="handleOk" ref="modal">
        <add-athlete-form></add-athlete-form>
    </b-modal>
</template>

<script>

import AddAthleteForm from '../Forms/AddAthleteForm.vue';

export default {
  name: 'AddAthleteModal',

  computed: {
    title() {
      const name = this.$store.getters['AddAthleteForm/name'];
      return name || 'Add Athlete';
    },
  },

  methods: {
    handleOk(event) {
      event.preventDefault();

      this.$store.dispatch('AddAthleteForm/addAthlete').then(() => {
        this.$refs.modal.hide();
      }).catch((response) => {
        console.error(response);
      });
    },
  },

  components: { AddAthleteForm },
};
</script>

<style scoped>

</style>
