<template>
    <td>
        <select v-model="genderFilter" class="form-control" v-on:change="addFilter">
            <option value="">All</option>
            <option value="f">F</option>
            <option value="m">M</option>
        </select>
    </td>
</template>

<script>
const KEY = 'gender';

export default {
  name: 'filter-gender',

  props: {
    initialFilter: {
      type: String,
      default: '',
      required: false,
    },
  },

  created() {
    this.genderFilter = this.initialFilter;
  },

  data() {
    return {
      genderFilter: null,
    };
  },

  methods: {
    addFilter() {
      if (this.genderFilter) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: athlete => athlete.gender.toLowerCase() === this.genderFilter,
        });
      } else {
        this.$store.dispatch('removeFilter', KEY);
      }
    },
  },
};
</script>

<style scoped>

</style>
