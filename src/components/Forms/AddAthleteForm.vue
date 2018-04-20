<template>
    <b-form>
        <b-form-row>
            <b-form-group label="First Name" label-for="first_name" class="col-md-6">
                <b-form-input
                        id="first_name"
                        v-model="first_name"
                        required
                        placeholder="First Name">
                </b-form-input>
            </b-form-group>

            <b-form-group label="Last Name" label-for="last_name" class="col-md-6">
                <b-form-input
                        id="last_name"
                        v-model="last_name"
                        required
                        placeholder="Last Name">
                </b-form-input>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group label="USAG Number" label-for="usag_id" class="col-md-6">
                <b-form-input
                        id="usag_id"
                        v-model="usag_id"
                        required
                        placeholder="USAG Number">
                </b-form-input>
            </b-form-group>

            <b-form-group label="Gender" label-for="gender" class="col-md-6">
                <b-form-select
                        id="gender"
                        v-model="gender"
                        :options="{ 'F': 'Female', 'M': 'Male' }"
                        required
                        placeholder="Gender">
                </b-form-select>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group label="Birthdate" label-for="birthdate" class="col-md-12">
                <b-form-input
                        id="birthdate"
                        v-model="birthdate"
                        required
                        placeholder="mm/dd/yyyy">
                </b-form-input>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group label="Trampoline" label-for="tra_level" class="col-md-4">
                <b-form-select
                        id="tra_level"
                        v-model="tra_level"
                        :options="allLevels"
                        required
                        placeholder="Trampoline Level">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Double Mini" label-for="dmt_level" class="col-md-4">
                <b-form-select
                        id="dmt_level"
                        v-model="dmt_level"
                        :options="allLevels"
                        required
                        placeholder="Double Mini Level">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Tumbling" label-for="tum_level" class="col-md-4">
                <b-form-select
                        id="tum_level"
                        v-model="tum_level"
                        :options="allLevels"
                        required
                        placeholder="Tumbling Level">
                </b-form-select>
            </b-form-group>
        </b-form-row>

    </b-form>
</template>

<script>

export default {
  name: 'AddAthleteForm',

  data() {
    return {

    };
  },

  methods: {
    formGetter(field) {
      return this.$store.getters['AddAthleteForm/form'][field];
    },

    formSetter(field, value) {
      this.$store.dispatch('AddAthleteForm/updateFormField', { field, value });
    },
  },

  created() {
    // this.$store.registerModule('AddAthleteForm')
  },

  computed: {
    title() {
      const name = this.$store.getters['AddAthleteForm/name'];
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
