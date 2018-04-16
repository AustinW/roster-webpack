<template>
    <div>
        <input
                type="text"
                class="form-control"
                :name="field"
                v-model="temporaryData"
                v-show="editing"
        />
        <button type="button" class="btn btn-default" @click="save" v-show="editing">✔</button>
        <button type="button" class="btn btn-default" @click="cancel" v-show="editing">✖</button>
        <span @click="toggleEditing" v-show="!editing">{{ changeableData }}</span>
    </div>
</template>

<script>
import BackendMixin from '../backend-mixin';

export default {
  name: 'input-text',

  mixins: [BackendMixin],

};
</script>

<style scoped>

</style>
