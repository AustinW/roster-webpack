<template>
    <input-text field="notes" :initialData="rowData.notes"></input-text>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'notes-column',

  mixins: [DefaultProps],
};
</script>
