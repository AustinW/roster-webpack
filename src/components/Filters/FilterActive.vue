<template>
    <td>
        <select v-model="activeFilter" class="form-control" v-on:change="addFilter">
            <option value="">All</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
    </td>
</template>

<script>
const KEY = 'active';

export default {
  name: 'filter-active',

  props: {
    initialFilter: {
      type: String,
      default: '',
      required: false,
    },
  },

  created() {
    this.activeFilter = this.initialFilter;
  },

  data() {
    return {
      activeFilter: null,
    };
  },

  methods: {
    addFilter() {
      if (this.activeFilter) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: athlete => parseInt(athlete.active, 10) === parseInt(this.activeFilter, 10),
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
