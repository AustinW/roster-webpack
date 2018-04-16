<template>
    <td>
        <div class="form-inline">
            <div class="form-group">
                <input v-model="minAge" class="form-control" type="text" v-on:keyup="addFilter">
                <span class="mr-2 ml-2">to</span>
                <input v-model="maxAge" class="form-control" type="text" v-on:keyup="addFilter">
            </div>

        </div>

    </td>
</template>

<script>
const KEY = 'competitive_age';

export default {
  name: 'filter-age',

  props: {
    initialMinFilter: {
      type: String,
      default: '',
      required: false,
    },
    initialMaxFilter: {
      type: String,
      default: '',
      required: false,
    },
  },

  created() {
    this.minAge = this.initialMinFilter;
    this.maxAge = this.initialMaxFilter;
  },

  data() {
    return {
      minAge: null,
      maxAge: null,
    };
  },

  methods: {
    addFilter() {
      if (this.minAge || this.maxAge) {
        this.$store.dispatch('addFilter', {
          key: KEY,
          reducer: (athlete) => {
            if (this.minAge && this.maxAge) {
              return athlete.competitive_age >= this.minAge &&
                athlete.competitive_age <= this.maxAge;
            } else if (this.minAge) {
              return athlete.competitive_age >= this.minAge;
            } else if (this.maxAge) {
              return athlete.competitive_age <= this.maxAge;
            }

            return true;
          },
        });
      } else {
        this.$store.dispatch('removeFilter', KEY);
      }
    },
  },
};
</script>

<style scoped>
    td {
    }

    .form-inline {
        margin: 0 auto;
        position:relative;
    }
    input {
        width: 50px !important;
    }
</style>
