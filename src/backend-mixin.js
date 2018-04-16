const BackendMixin = {
  data() {
    return {
      changeableData: null,
      editing: false,
      temporaryData: null,
    };
  },

  props: {
    initialData: null,
    field: null,
    id: null,
  },

  created() {
    this.temporaryData = this.initialData;
    this.changeableData = this.initialData;
  },

  methods: {
    toggleEditing() {
      this.editing = !this.editing;
    },

    save() {
      this.$store.dispatch('save', {
        id: this.id,
        field: this.field,
        value: this.temporaryData,
      }).then(() => { this.changeableData = this.temporaryData; });

      this.editing = false;
    },

    cancel() {
      this.temporaryData = this.initialData;
      this.changeableData = this.initialData;

      this.editing = false;
    },
  },
};

export default BackendMixin;
