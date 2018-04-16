<template>
    <td>
        <input v-model="lastNameFilter" class="form-control" type="text" v-on:keyup="addFilter">
    </td>
</template>

<script>
const KEY = 'last-name';

export default {
  name: 'filter-last-name',

  props: {
    initialFilter: {
      type: String,
      default: '',
      required: false,
    },
  },

  created() {
    this.lastNameFilter = this.initialFilter;
  },

  data() {
    return {
      lastNameFilter: null,
    };
  },

  methods: {
    addFilter() {
      if (this.lastNameFilter) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: athlete =>
            athlete.last_name.toLowerCase().includes(this.lastNameFilter.toLowerCase()),
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
