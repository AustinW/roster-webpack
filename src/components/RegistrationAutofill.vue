<template>
    <pre>
        <code v-if="rosterLoaded">
            var athleteIds = {{ athleteIds }};
            $('#participantsWomen tr, #participantsMen tr').each((index, athlete) => {
                let included = athleteIds.includes($(athlete).find('td:nth-child(4)').text())
                $(athlete).find('td:nth-child(1) input').prop('checked', included);
            });
        </code>
    </pre>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'registration-autofill',

  computed: {
    ...mapGetters(['rosterLoaded']),

    athleteIds() {
      const ids = this.$store.getters.selectedAthletes.map(athlete => String(athlete.usag_id));

      return JSON.stringify(ids);
    },
  },
};
</script>
