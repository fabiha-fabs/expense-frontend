<template>
    <main>
        <header-menu />
        <b-container>
            <b-row class="mt-5">
                <b-col md="4"></b-col>
                <b-col md="4">
                    <h5>Create Group Form</h5>
                    <b-card class="center" >
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
                                <b-button type="submit" variant="success" size="sm">Create</b-button> 
                                <b-button type="reset" variant="danger" size="sm" @click="onReset" >Reset</b-button>
                            </div>
                        </b-form>
                    </b-card>
            </b-col>
            <b-col md="4"></b-col>
            </b-row>
        </b-container>
    </main>
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
    created(){},
    methods: {
        async onCreateGroup() {
                await this.$axios.$post(`${process.env.BASE_URL}/group/create`, (this as any).createGroup)
                .then((res) => {
                    console.log(res);
                    (this as any).okMessage('success', 'Group creation is successful..'); 
                    (this as any).onReset();
                    })
                .catch((error) => {
                    console.log(error);
                    (this as any).okMessage('danger', 'Failed to create group');
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
    okMessage( v: string , msg: string) {
         (this as any).$bvModal.msgBoxOk(msg , {
          title: `Action`,
          variant: v,
          size: 'sm',
          buttonSize: 'sm',
          okVariant: v,
          solid: true
        })
      }
    },
})
</script>
<style lang="scss" scoped>

</style>