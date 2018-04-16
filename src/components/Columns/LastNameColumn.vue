<template>
    <input-text field="last_name" :initialData="rowData.last_name"></input-text>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'last-name-column',

  mixins: [DefaultProps],
};
</script>
