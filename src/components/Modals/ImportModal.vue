<template>
    <b-modal id="import" title="Import Athletes" @ok="handleOk" ref="modal">
        <b-form>
            <b-form-row>
                <b-form-group label="Import Athletes" label-for="importer" class="col-md-12">
                    <b-form-file
                            id="importer"
                            v-model="importer"
                            ref="importer"
                            @change="readFile"
                            required>
                    </b-form-file>
                </b-form-group>
            </b-form-row>

            <b-form-row>
                <b-form-checkbox v-model="clear" id="clear">
                    Erase all athletes and replace with imported roster?
                </b-form-checkbox>
            </b-form-row>

            <div v-if="fileLoaded">
                <div class="mt-3 mb-3"><strong>Header Assignment (?)</strong></div>
                <b-form-row v-for="header in headers" :key="header">
                    <div class="col-md-3">
                        <b-form-checkbox v-model="form[header].import" id="clear">
                            {{ header }}
                        </b-form-checkbox>
                    </div>


                    <b-form-group class="col-md-6">
                        <b-form-input
                                id="first_name"
                                v-model="form[header].csvField"
                                required
                                placeholder="First Name">
                        </b-form-input>
                    </b-form-group>
                </b-form-row>
            </div>
        </b-form>
    </b-modal>
</template>

<script>

import Papa from 'papaparse';
import GuessHeaders from '../../GuessHeaders';

export default {
  name: 'ImportModal',

  data() {
    return {
      importer: null,
      clear: null,
      fileLoaded: null,
      guessedHeaders: null,
      headers: null,
      form: null,
    };
  },

  created() {
    this.form = {};
  },

  methods: {
    readFile(event) {
      const reader = new FileReader();

      const that = this;

      reader.onload = (fileLoadedEvent) => {
        Papa.parse(fileLoadedEvent.target.result, {
          header: true,
          complete(parser) {
            const guessHeaders = new GuessHeaders(parser);
            const guessedHeaders = guessHeaders.guess();
            that.headers = Object.keys(guessHeaders.fieldMap);

            that.headers.forEach((header) => {
              const headerMapped = (Object.prototype.hasOwnProperty.call(guessedHeaders, header));
              that.form[header] = {};
              that.form[header].csvField =
                (headerMapped) ? guessedHeaders[header] : '';
            });

            that.fileLoaded = true;
          },
        });
      };

      reader.readAsText(event.target.files[0]);
    },

    handleOk(event) {
      event.preventDefault();

      this.$store.dispatch('ImportForm/import').then(() => {
        this.$refs.modal.hide();
      }).catch((response) => {
        console.error(response);
      });
    },

    formGetter(field) {
      return this.$store.getters['ImportForm/form'][field];
    },

    formSetter(field, value) {
      this.$store.dispatch('ImportForm/updateFormField', { field, value });
    },
  },
};
</script>

<style scoped>

</style>
