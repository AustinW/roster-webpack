/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

import _ from 'lodash';
import moment from 'moment';

import athleteStore from './assets/athletes.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    roster: null,

    checkAll: true,

    filters: {},

    fieldOptions: {
      active: [
        { key: '0', value: 'No' },
        { key: '1', value: 'Yes' },
      ],
      gender: [
        { key: 'F', value: 'F' },
        { key: 'M', value: 'M' },
      ],
      level: [
        { key: null, value: 'X' },
        { key: '1', value: 'Level 1' },
        { key: '2', value: 'Level 2' },
        { key: '3', value: 'Level 3' },
        { key: '4', value: 'Level 4' },
        { key: '5', value: 'Level 5' },
        { key: '6', value: 'Level 6' },
        { key: '7', value: 'Level 7' },
        { key: '8', value: 'Level 8' },
        { key: '9', value: 'Level 9' },
        { key: '10', value: 'Level 10' },
        { key: 'ye-11-12', value: 'YE 11-12' },
        { key: 'ye-13-14', value: 'YE 13-14' },
        { key: 'jr', value: 'Junior Elite' },
        { key: 'sr', value: 'Senior Elite' },
      ],
    },
  },

  getters: {
    rosterLoaded(state) {
      return state.roster && Object.prototype.hasOwnProperty.call(state.roster, 'data');
    },

    roster(state) {
      return state.roster;
    },

    fieldOptions(state) {
      return state.fieldOptions;
    },

    athleteChecked(state) {
      return athleteId => state.roster.data.find(athlete => athlete.id === athleteId).checked;
    },

    selectedAthletes(state) {
      return state.roster.data.filter(athlete => athlete.checked && athlete.visible);
    },

    filteredData(state) {
      const allFilters = _.values(state.filters);

      return state.roster.data.map((data) => {
        const athlete = data;
        athlete.visible = allFilters.every(filter => filter(athlete));

        return athlete;
      });
    },

    allLevels(state) {
      return state.fieldOptions.level;
    },
  },

  actions: {
    async loadRoster(context) {
      const roster = await Promise.resolve(athleteStore);
      console.log(roster);
      context.commit('hydrateRoster', roster);
    },

    async save(context, payload) {
      context.commit('updateAthlete', payload);
    },

    checkAll(context, payload) {
      context.commit('checkAll', payload);
      context.commit('checkAllBoxes', payload);
    },

    removeFilter(context, key) {
      context.commit('setFilter', { key });
    },

    addFilter(context, payload) {
      context.commit('setFilter', payload);
    },
  },

  mutations: {
    hydrateRoster(state, payload) {
      payload.data = payload.data.map((athlete) => {
        athlete.checked = state.checkAll;
        athlete.visible = true;
        return athlete;
      });

      state.roster = payload;
    },

    updateAthlete(state, payload) {
      state.roster.data = state.roster.data.map((athlete) => {
        if (athlete.id === payload.id) {
          athlete[payload.field] = payload.value;
        }

        return athlete;
      });
    },

    checkAthlete(state, { athleteId, checked }) {
      state.roster.data = state.roster.data.map((athlete) => {
        if (athlete.id === athleteId) {
          athlete.checked = checked;
        }

        return athlete;
      });
    },

    checkAll(state, payload) {
      state.checkAll = payload;
    },

    checkAllBoxes(state, payload) {
      state.roster.data = state.roster.data.map((athlete) => {
        if (athlete.visible) {
          athlete.checked = payload;
        }
        return athlete;
      });
    },

    setFilter(state, { key, reducer }) {
      if (!reducer) {
        Vue.delete(state.filters, key);
      } else {
        Vue.set(state.filters, key, reducer);
      }
    },

    addAthlete(state, payload) {
      const athlete = payload;

      const momentBirthdate = moment(athlete.birthdate, 'MM/DD/YYYY');

      athlete.active = '1';
      athlete.visible = true;
      athlete.checked = true;
      athlete.birthdate = momentBirthdate.format('YYYY-MM-DD 00:00:00');
      athlete.competitive_age = moment().endOf('year').diff(momentBirthdate, 'years');
      state.roster.data.push(athlete);
    },
  },

  modules: {
    AddAthleteForm: {
      namespaced: true,

      state: {
        form: {
          first_name: null,
          last_name: null,
          usag_id: null,
          gender: null,
          birthdate: null,
          tra_level: null,
          dmt_level: null,
          tum_level: null,
        },
      },
      getters: {
        form(state) {
          return state.form;
        },
        name(state) {
          if (state.form.first_name || state.form.last_name) {
            return `${state.form.first_name || ''} ${state.form.last_name || ''}`;
          }

          return null;
        },
      },
      actions: {
        updateFormField({ commit }, payload) {
          commit('setFormField', payload);
        },

        addAthlete({ commit, getters }) {
          commit('addAthlete', getters.form, { root: true });
        },
      },
      mutations: {
        setFormField(state, { field, value }) {
          Vue.set(state.form, field, value);
        },
      },
    },
  },
});

export default store;
