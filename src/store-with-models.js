/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

import _ from 'lodash';
import moment from 'moment';

import athleteStore from './assets/athletes.json';

import Athlete from './athlete';
import Level from './level';

Vue.use(Vuex);

const competitiveAge = (date) => {
  if (!moment.isMoment(date)) {
    date = moment(date, ['MM/DD/YYYY', 'YYYY-MM-DD HH:mm:ss']);
  }

  return moment().endOf('year').diff(date, 'years');
};

const database = firebase.database();
const userId = firebase.auth().currentUser.uid;

const store = new Vuex.Store({
  state: {
    roster: null,

    checkAll: true,

    filters: {},
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
    async loadRoster({ commit }) {
      console.log(database.ref(`/rosters/${userId}`).get());
      const roster = await Promise.resolve(athleteStore);
      console.log(roster);
      commit('hydrateRoster', roster);
    },

    save({ commit }, payload) {
      commit('updateAthlete', payload);
    },

    removeCheckedAthletes(context) {
      Vue.swal({
        title: 'Are you sure?',
        text: 'These athletes will be removed from your roster permanently.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
        .then((willRemove) => {
          if (willRemove.value) {
            context.commit('removeAthletes', context.getters.selectedAthletes);
          }
        });
    },

    checkAll({ commit }, payload) {
      commit('checkAll', payload);
      commit('checkAllBoxes', payload);
    },

    removeFilter({ commit }, key) {
      commit('setFilter', { key });
    },

    addFilter({ commit }, payload) {
      commit('setFilter', payload);
    },

    importAthletes({ commit }, { athletes, clear }) {
      if (clear) {
        commit('eraseRoster');
      }

      commit('hydrateRoster', { data: athletes });
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
          if (payload.field === 'birthdate') {
            athlete.competitive_age = competitiveAge(payload.value);
          } else {
            athlete[payload.field] = payload.value;
          }
        }

        return athlete;
      });
    },

    removeAthletes(state, payload) {
      let removing;
      if (Array.isArray(payload)) {
        removing = payload.map(athlete => (Number.isInteger(athlete) ? athlete : athlete.id));
      } else if (typeof payload === 'object') {
        removing = [payload.id];
      } else {
        removing = [payload];
      }

      state.roster.data = state.roster.data.filter(athlete => !removing.includes(athlete.id));
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
      athlete.competitive_age = competitiveAge(momentBirthdate);
      state.roster.data.push(athlete);
    },

    eraseRoster(state) {
      Vue.set(state.roster, 'data', []);
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
          commit('resetForm');
        },
      },
      mutations: {
        setFormField(state, { field, value }) {
          Vue.set(state.form, field, value);
        },
        resetForm(state) {
          Object.keys(state.form).forEach((formKey) => {
            state.form[formKey] = null;
          });
        },
      },
    },

    ImportForm: {
      namespaced: true,

      state: {
        form: {
          importer: null,
          clear: null,
        },
      },
      getters: {},
      actions: {
        import({ commit }) {
          commit('importAthletes');
        },
      },
      mutations: {
        importAthletes(state) {
          console.log(state);
        },
      },
    },
  },
});

export { store, competitiveAge };
