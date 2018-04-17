<template>
    <td>
        <input-text
                v-if="this.textFields.includes(column)"
                :initial-data="entry[column]"
                :field="column"
                :id="entry.id"
        />

        <input-select
                v-else-if="this.selectFields.includes(column)"
                :initial-data="entry[column]"
                :field="column"
                :options="fieldOptions(column)"
                :id="entry.id"
        />

        <input-date
                v-else-if="this.dateFields.includes(column)"
                :initial-data="entry[column]"
                :field="column"
                :id="entry.id"
        />

        <span v-else>{{ fieldModifier(column) }}</span>
    </td>
</template>

<script>

import InputText from './InputText.vue';
import InputSelect from './InputSelect.vue';
import InputDate from './InputDate.vue';

export default {
  name: 'column',

  props: {
    entry: null,
    column: null,
  },

  data() {
    return {
      textFields: ['usag_id', 'first_name', 'last_name'],
      selectFields: ['active', 'gender', 'tra_level', 'dmt_level', 'tum_level'],
      dateFields: ['birthdate'],
    };
  },

  methods: {
    fieldOptions(key) {
      const options = this.$store.getters.fieldOptions;

      if (key === 'tra_level' || key === 'dmt_level' || key === 'tum_level') {
        return options.level;
      }

      return options[key];
    },

    fieldModifier(column) {
      if (column === 'age') {
        return this.entry.competitive_age;
      }
      return this.entry[column];
    },
  },

  components: { InputText, InputSelect, InputDate },
};
</script>
