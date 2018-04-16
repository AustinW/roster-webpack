<template>
    <td>
        <input v-model="firstNameFilter" class="form-control" type="text" v-on:keyup="addFilter">
    </td>
</template>

<script>
const KEY = 'first-name';

export default {
  name: 'filter-first-name',

  props: {
    initialFilter: {
      type: String,
      default: '',
      required: false,
    },
  },

  created() {
    this.firstNameFilter = this.initialFilter;
  },

  data() {
    return {
      firstNameFilter: null,
    };
  },

  methods: {
    addFilter() {
      if (this.firstNameFilter) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: athlete =>
            athlete.first_name.toLowerCase().includes(this.firstNameFilter.toLowerCase()),
        });
      } else {
        this.$store.dispatch('removeFilter', KEY);
      }
    },
  },
};
</script>

<style scoped>
    input { width: 150px }
</style>
