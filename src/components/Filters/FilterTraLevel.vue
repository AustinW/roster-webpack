<template>
    <td>
        <dropdown :data="traLevelFilter" :cbChanged="changed"/>
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
    this.traLevelFilter = this.initialFilter;
  },

  data() {
    return {
      traLevelFilter: [
        { label: 'Level 1', value: '1' },
        { label: 'Level 2', value: '2' },
        { label: 'Level 3', value: '3' },
        { label: 'Level 4', value: '4' },
        { label: 'Level 5', value: '5' },
        { label: 'Level 6', value: '6' },
        { label: 'Level 7', value: '7' },
        { label: 'Level 8', value: '8' },
        { label: 'Level 9', value: '9' },
        { label: 'Level 10', value: '10' },
        { label: 'YE 11-12', value: 'ye-11-12' },
        { label: 'YE 13-14', value: 'ye-13-14' },
        { label: 'Junior Elite', value: 'jr' },
        { label: 'Open Elite', value: 'oe' },
        { label: 'Senior Elite', value: 'sr' },
      ],
    };
  },

  methods: {
    addFilter() {
      if (this.traLevelFilter) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: athlete => parseInt(athlete.active) === parseInt(this.traLevelFilter),
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
