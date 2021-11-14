<template>
  <div>
      <header-menu />
      <b-row class="mt-5">
          <b-col md="4"></b-col>
          <b-col md="4">
              <h5>Edit Group</h5>
    <b-card class="center">
        <b-form @submit.prevent="onEditGroup()" >
            <div>
                <label>Group Name</label>
                <b-form-input v-model="editedGroup.groupName" type="text" />
            </div>
            <div>
                <label>Description</label>
                <b-form-input v-model="editedGroup.description" type="text" />
            </div>
            <div>
                <label>Status</label>
                <b-form-checkbox v-model="editedGroup.isActive" name="check-button" switch>
                    Status <b>(is Active: {{ editedGroup.isActive }})</b>
                </b-form-checkbox>
            </div>
            <br>
            <div>
                <b-button type="submit" variant="success">Edit</b-button> 
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
import headerMenu from '../../../components/common/headerMenu.vue';

export default Vue.extend({
    components: { headerMenu },
    mixins: [validationMixin],
    validations: {
        editedGroup: {
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
            editedGroup: {
                groupName: '',
                description: '',
                isActive: true
            }
        }
    },
    created(){
        this.fetchGroupInfos();
    },
    methods: {
        async onEditGroup() {
                await this.$axios.$put(`${process.env.BASE_URL}/group/update/${this.$route.params.editGroup}`, (this as any).editedGroup)
                .then((res) => {
                    console.log(res);
                    (this as any).okMessage('success', 'Group is successfully updated..'); 
                    this.$router.push("/groups");
                }).catch((error) => {
                    console.log(error);
                    (this as any).okMessage('danger', 'Failed to edit group infos');
                });
            
            
        },
    validateState(name: any) {
      const data = this.$v.editedGroup[name];
      return data?.$dirty ? data?.$error === false : null;
    },
    onReset(){
       (this as any).editedGroup.groupName = '';
       (this as any).editedGroup.description = '';
       (this as any).editedGroup.isActive = true;
    },
    okMessage( v: string , msg: string) {
         (this as any).$bvModal.msgBoxOk(msg , {
          title: `Action`,
          variant: v,
          size: 'sm',
          buttonSize: 'sm',
          okVariant: v,
          solid: true
        })
      },
      async fetchGroupInfos(){
          console.log(this.$route.params.id);
        await this.$axios.$get(`${process.env.BASE_URL}/group/findgroup/${this.$route.params.editGroup}`)
            .then((res) => {
                console.log(res);
                (this as any).editedGroup.groupName = res.groupName ;
                (this as any).editedGroup.description = res.description ;
                (this as any).editedGroup.isActive = res.isActive ;
            }).catch((error) => {
                console.log(error);
            });
          
      }
    },
})
</script>