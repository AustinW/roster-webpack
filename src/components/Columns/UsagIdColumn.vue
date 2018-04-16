<template>
    <input-text field="usag_id" :initialData="rowData.usag_id"></input-text>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'usag-id-column',

  mixins: [DefaultProps],
};
</script>
