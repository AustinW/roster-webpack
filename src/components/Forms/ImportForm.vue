<template>
    <b-form>
        <b-form-row>
            <b-form-group label="Import Athletes" label-for="importer" class="col-md-12">
                <b-form-file
                        id="importer"
                        v-model="importer"
                        ref="importer"
                        required>
                </b-form-file>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-checkbox v-model="clear" id="clear">
                Erase all athletes and replace with imported roster?
            </b-form-checkbox>
        </b-form-row>
    </b-form>
</template>

<script>

export default {
  name: 'ImportForm',

  data() {
    return {
      importer: null,
      clear: null,
    };
  },

  methods: {
    formGetter(field) {
      return this.$store.getters['ImportForm/form'][field];
    },

    formSetter(field, value) {
      this.$store.dispatch('ImportForm/updateFormField', { field, value });
    },
  },

  created() {
    // this.$store.registerModule('ImportForm')
  },

  computed: {
    title() {
      const name = this.$store.getters['ImportForm/name'];
      return name || 'Add Athlete';
    },

    first_name: {
      get() { return this.formGetter('first_name'); },
      set(value) { this.formSetter('first_name', value); },
    },

    last_name: {
      get() { return this.formGetter('last_name'); },
      set(value) { this.formSetter('last_name', value); },
    },

    usag_id: {
      get() { return this.formGetter('usag_id'); },
      set(value) { this.formSetter('usag_id', value); },
    },

    gender: {
      get() { return this.formGetter('gender'); },
      set(value) { this.formSetter('gender', value); },
    },

    birthdate: {
      get() { return this.formGetter('birthdate'); },
      set(value) { this.formSetter('birthdate', value); },
    },

    tra_level: {
      get() { return this.formGetter('tra_level'); },
      set(value) { this.formSetter('tra_level', value); },
    },

    dmt_level: {
      get() { return this.formGetter('dmt_level'); },
      set(value) { this.formSetter('dmt_level', value); },
    },

    tum_level: {
      get() { return this.formGetter('tum_level'); },
      set(value) { this.formSetter('tum_level', value); },
    },

    allLevels() {
      const { allLevels } = this.$store.getters;

      const reindexed = [];

      allLevels.forEach((level) => {
        reindexed.push({
          text: level.value,
          value: level.key,
        });
      });

      return reindexed;
    },
  },

};
</script>

<style scoped>

</style>
