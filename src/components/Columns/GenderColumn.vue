<template>
    <input-select field="gender" :initialData="rowData.gender"
                  :options="[{ title: 'M', value: 'M' }, { title: 'F', value: 'F' }]"></input-select>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'gender-column',

  mixins: [DefaultProps],
};
</script>
