<template>
    <tr>
        <td>Filters</td>
        <td></td>
        <filter-active></filter-active>
        <td></td>
        <filter-first-name></filter-first-name>
        <filter-last-name></filter-last-name>
        <filter-gender></filter-gender>
        <td></td>
        <filter-age></filter-age>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</template>

<script>

import FilterActive from './FilterActive.vue';
import FilterFirstName from './FilterFirstName.vue';
import FilterLastName from './FilterLastName.vue';
import FilterGender from './FilterGender.vue';
import FilterAge from './FilterAge.vue';

export default {
  name: 'filter-bar',

  components: {
    FilterActive,
    FilterFirstName,
    FilterLastName,
    FilterGender,
    FilterAge,
  },
};
</script>

<style scoped>

</style>
