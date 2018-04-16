<template>
    <pre>
        <code v-if="rosterLoaded">
            {{ instructions.join(';') }}
        </code>
    </pre>
</template>

<script>
import { mapGetters } from 'vuex';

const TRA = 5;
const TUM = 6;
const DMT = 7;

export default {
  name: 'level-autofill',

  computed: {
    ...mapGetters(['rosterLoaded']),

    instructions() {
      const instructions = [];

      this.$store.getters.selectedAthletes.forEach((athlete) => {
        if (athlete.tra_level) {
          const traMapped = this.levelMap(athlete.tra_level, athlete.competitive_age);
          const dmtMapped = this.levelMap(athlete.dmt_level, athlete.competitive_age);
          const tumMapped = this.levelMap(athlete.tum_level, athlete.competitive_age);

          if (traMapped) instructions.push(`$('select[name="Apparatus[${athlete.usag_id}][${TRA}]"]').val(${traMapped})`);
          if (dmtMapped) instructions.push(`$('select[name="Apparatus[${athlete.usag_id}][${DMT}]"]').val(${dmtMapped})`);
          if (tumMapped) instructions.push(`$('select[name="Apparatus[${athlete.usag_id}][${TUM}]"]').val(${tumMapped})`);
        }
      });

      return instructions;
    },

    athleteIds() {
      const ids = this.$store.getters.selectedAthletes.map(athlete => String(athlete.usag_id));

      return JSON.stringify(ids);
    },
  },

  methods: {

    levelMap(level, age) {
      const levels = {
        '': '',
        1: '73',
        2: '74',
        3: '75',
        4: '76',
        5: '77',
        6: '78',
        7: '79',
        8: '80',
        9: '81',
        10: '82',
        YE: () => {
          if (age >= 11 && age <= 12) {
            return '134';
          } else if (age >= 13 && age <= 14) {
            return '131';
          }
          return '';
        },
        'youth-11-12': '134',
        'youth-13-14': '131',
        JR: '99',
        OE: '101',
        SR: '100',
      };

      if (Object.prototype.hasOwnProperty.call(levels, level)) {
        return (typeof levels[level] !== 'function') ? levels[level] : levels[level]();
      }

      return '';
    },
  },
};
</script>
