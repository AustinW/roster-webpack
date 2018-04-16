<template>
    <b-navbar toggleable="md" type="light" variant="light">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="/">Athlete Roster</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item v-b-modal.addAthlete>Add Athlete</b-nav-item>
                <b-nav-item v-b-modal.importAthletes>Import Athletes</b-nav-item>
                <b-nav-item v-b-modal.deleteAthletes>Delete Athletes</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>

        <add-athlete-modal></add-athlete-modal>
    </b-navbar>
</template>

<script>

import AddAthleteModal from './Modals/AddAthleteModal.vue';

export default {
  data() {
    return {};
  },

  mounted() {

  },

  props: {},

  computed: {},

  methods: {},

  components: { AddAthleteModal },
};
</script>
