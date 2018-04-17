<template>
    <div>
        <flat-pickr
            :id="field"
            placeholder="mm/dd/yyyy"
            v-model="temporaryData"
            v-show="editing"
            class="form-control"
            :config="flatPickrConfig"
        ></flat-pickr>
        <button type="button" class="btn btn-default" @click="save" v-show="editing">✔</button>
        <button type="button" class="btn btn-default" @click="cancel" v-show="editing">✖</button>
        <span @click="toggleEditing" v-show="!editing">{{ formattedDate }}</span>
    </div>
</template>

<script>
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';

import BackendMixin from '../backend-mixin';

export default {
  name: 'input-date',

  data() {
    return {
      flatPickrConfig: {
        dateFormat: 'm/d/Y',
        allowInput: true,
        disable: [date => date > moment()],
        onClose(selectedDates, dateStr, instance) {
          const momentDate = moment(dateStr, ['MM/DD/YY', 'M/D/YYYY', 'M/D/YY', 'MM-DD-YY', 'M-D-YYYY', 'M-D-YY']);

          if (momentDate.isValid()) {
            instance.setDate(momentDate.format('MM/DD/YYYY'), true);
          } else {
            instance.clear();
          }
        },
      },
    };
  },

  computed: {
    formattedDate() {
      if (this.temporaryData) {
        const momentDate = moment(this.temporaryData).format('M/D/YYYY');
        return (momentDate) || '';
      }
      return this.temporaryData;
    },
  },

  created() {
    if (this.initialData) {
      this.initDate(this.initialData);
    }
  },

  methods: {
    cancel() {
      this.initDate(this.initialData);
      this.editing = false;
    },

    initDate(date) {
      this.temporaryData = moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    },
  },

  mixins: [BackendMixin],
};
</script>

<style scoped>

</style>
