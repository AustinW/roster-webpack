<template>
    <input-text field="first_name" :initialData="rowData.first_name"></input-text>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'first-name-column',

  mixins: [DefaultProps],
};
</script>
