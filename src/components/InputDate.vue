<template>
    <div>
        <flat-pickr
            :id="field"
            placeholder="mm/dd/yyyy"
            v-model="temporaryData"
            v-show="editing"
            class="form-control"
            :config="flatPickrConfig"
        />
        <button type="button" class="btn btn-default" @click="save" v-show="editing">✔</button>
        <button type="button" class="btn btn-default" @click="cancel" v-show="editing">✖</button>
        <span @click="toggleEditing" v-show="!editing">{{ formattedDate }}</span>
    </div>
</template>

<script>
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';
import Vue from 'vue';

import BackendMixin from '../backend-mixin';

export default {
  name: 'input-date',

  data() {
    return {
      flatPickrConfig: null,
    };
  },

  computed: {
    formattedDate() {
      if (this.changeableData) {
        const momentDate = moment(this.changeableData).format('M/D/YY');
        return (momentDate) || '';
      }
      return this.changeableData;
    },
  },

  created() {
    if (this.temporaryData) {
      this.temporaryData = moment(this.temporaryData, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }

    this.flatPickrConfig = {
      dateFormat: 'm/d/Y',
      allowInput: true,
      onChange(selectedDate, dateStr, instance) {
        const momentDate = moment(dateStr, ['MM/DD/YY', 'M/D/YYYY', 'M/D/YY', 'MM-DD-YY', 'M-D-YYYY', 'M-D-YY']);
        if (momentDate.isValid()) {
          instance.setDate(momentDate.format('MM/DD/YYYY'), true);
          Vue.set(this, 'changeableData', momentDate.format('YYYY-MM-DD HH:mm:ss'));
          console.log(momentDate.format('YYYY-MM-DD HH:mm:ss'));
        } else {
          console.log('asdf');
          instance.clear();
        }
      },
      disable: [date => date > moment()],
    };
  },

  mixins: [BackendMixin],
};
</script>

<style scoped>

</style>
