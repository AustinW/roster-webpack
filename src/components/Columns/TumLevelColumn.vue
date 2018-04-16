<template>
    <input-select field="tum_level" :initialData="rowData.tum_level" :options="options"></input-select>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'tum-level-column',

  data() {
    return {
      options: [
        { value: '1', title: 'Level 1' },
        { value: '2', title: 'Level 2' },
        { value: '3', title: 'Level 3' },
        { value: '4', title: 'Level 4' },
        { value: '5', title: 'Level 5' },
        { value: '6', title: 'Level 6' },
        { value: '7', title: 'Level 7' },
        { value: '8', title: 'Level 8' },
        { value: '9', title: 'Level 9' },
        { value: '10', title: 'Level 10' },
        { value: 'YE 11-12', title: 'YE 11-12' },
        { value: 'YE 13-14', title: 'YE 13-14' },
        { value: 'JR', title: 'Junior Elite' },
        { value: 'SR', title: 'Senior Elite' },
      ],
    };
  },

  mixins: [DefaultProps],
};
</script>
