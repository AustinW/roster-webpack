<template>
    <div>
        <div class="table-responsive">
            <table v-if="roster" class="table table-striped">
                <thead>
                <tr>
                    <th><label><input type="checkbox" v-model="checkAll"/></label></th>
                    <th>#</th>
                    <th v-for="key in columns"
                        :key="key"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key }">
                        {{ key | title }}
                        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <filter-bar></filter-bar>
                <athlete :columns="columns"
                        :data="entry"
                        :index="$index"
                        :key="entry.id"
                         v-for="(entry, $index) in rowData"
                        v-show="entry.visible"
                        v-if="entry">
                </athlete>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Athlete from '../components/Athlete.vue';
import FilterBar from '../components/Filters/FilterBar.vue';

export default {
  name: 'roster',

  props: {
    columns: Array,
    filterKey: String,
  },

  computed: {

    ...mapGetters(['roster']),

    checkAll: {
      get() {
        return this.$store.state.checkAll;
      },

      set(value) {
        this.$store.dispatch('checkAll', value);
      },
    },

    rowData() {
      const { sortKey } = this;
      const order = this.sortOrders[sortKey] || 1;
      let data = this.$store.getters.filteredData;

      if (sortKey) {
        data = data.slice().sort((a, b) => {
          const columnA = a[sortKey];
          const columnB = b[sortKey];
          const secondaryComparison = (columnA > columnB) ? 1 : -1;
          return (columnA === columnB) ? 0 : secondaryComparison * order;
        });
      }

      return data;
    },
  },

  filters: {
    title(value) {
      const titles = {
        active: 'Active',
        usag_id: 'USAG #',
        first_name: 'First',
        last_name: 'Last',
        gender: 'Gender',
        birthdate: 'Birthdate',
        age: 'Age',
        tra_level: 'TRA',
        dmt_level: 'DMT',
        tum_level: 'TUM',
      };

      return titles[value];
    },
  },

  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
  },

  data() {
    const sortOrders = {};

    this.columns.forEach((key) => {
      sortOrders[key] = 1;
    });

    return {
      sortKey: '',
      sortOrders,
    };
  },

  mounted() {
    this.$store.dispatch('loadRoster', { table: this.$refs.vuetable });
  },

  components: { Athlete, FilterBar },
};
</script>

<style scoped>
table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

td {
    background-color: #f9f9f9;
}

th, td {
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}

.column-controls .fa-sort {
    opacity: 0.4;
}
</style>
