<template>
    <div>
        {{ rowData.birthdate }}
    </div>
</template>

<script>
import DefaultProps from './DefaultProps';

export default {
  name: 'birthdate-column',

  mixins: [DefaultProps],
};
</script>

<style scoped>

</style>
