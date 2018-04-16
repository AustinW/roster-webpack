<template>
    <input-text field="sync_partner" :initialData="rowData.sync_partner"></input-text>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'sync-partner-column',

  mixins: [DefaultProps],
};
</script>
