<template>
  <div>
      <header-menu />
      <b-row class="mt-5">
          <b-col md="4"></b-col>
          <b-col md="4">
    <b-card class="center">
        <b-form @submit.prevent="onCreateGroup()" >
            <div>
                <label>Group Name</label>
                <b-form-input v-model="createGroup.groupName" type="text" />
            </div>
            <div>
                <label>Description</label>
                <b-form-input v-model="createGroup.description" type="text" />
            </div>
            <div>
                <label>Status</label>
                <b-form-checkbox v-model="createGroup.isActive" name="check-button" switch>
                    Status <b>(is Active: {{ createGroup.isActive }})</b>
                </b-form-checkbox>
            </div>
            <br>
            <div>
                <b-button type="submit" variant="success">Create</b-button> 
                <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
            </div>
        </b-form>
    </b-card>
          </b-col>
          <b-col md="4"></b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import headerMenu from '../../components/common/headerMenu.vue';

export default Vue.extend({
    components: { headerMenu },
    mixins: [validationMixin],
    validations: {
        createGroup: {
            groupName: {
                required,
                minLength: minLength(3)
            },
            description: {
                required,
                minLength: minLength(3)
            },
            isActive: {
                required
            }
        },
    },
    data() {
        return {
            createGroup: {
                groupName: '',
                description: '',
                isActive: true
            }
        }
    },
    methods: {
    async onCreateGroup() {
        /* this.$v.register.$touch();
        if (this.$v.register.$anyError) {
            return;
        } */
        await this.$axios.$post(`${process.env.BASE_URL}/group/create`, (this as any).createGroup)
            .then((res) => {
                console.log(res);
                 (this as any).toastMessage('success', 'Create Group is successful..'); 
                 (this as any).onReset();
                })
            .catch((error) => {
                console.log(error);
                (this as any).toastMessage('danger', 'Failed to create');
            });
    },
    validateState(name: any) {
      const data = this.$v.createGroup[name];
      return data?.$dirty ? data?.$error === false : null;
    },
    onReset(){
       (this as any).createGroup.groupName = '';
       (this as any).createGroup.description = '';
       (this as any).createGroup.isActive = true;
    },
    toastMessage( v: string , msg: string) {
         (this as any).$bvToast.toast(msg , {
          title: `Action`,
          variant: v,
          solid: true
        })
      } 
  },
})
</script>