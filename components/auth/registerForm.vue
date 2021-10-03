<template>
  <div>
    <b-card class="center">
    <b-form @submit.prevent="onRegister()" >
      <div>
        <label>Username</label>
        <b-form-input v-model="register.userName" :state="validateState('userName')" type="text" />
        <b-form-invalid-feedback v-if="!$v.register.userName.required">
            User name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.register.userName.minLength">
            User name must have at least {{$v.register.userName.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>Password</label>
        <b-form-input v-model="register.password" type="password" :state="validateState('password')" />
        <b-form-invalid-feedback v-if="!$v.register.password.required">
            Type password *
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.register.password.minLength">
            Password must have at least {{$v.register.password.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>E-mail</label>
        <b-form-input v-model="register.emailId" type="text" :state="validateState('emailId')" />
        <b-form-invalid-feedback v-if="!$v.register.emailId.required">
            E-mail must be provided *
        </b-form-invalid-feedback>
      </div>
      <div>
        <label>Contact No</label>
        <b-form-input v-model="register.contactNo" type="text" />
      </div>
      <div>
        <label>Country</label>
        <b-form-input v-model="register.country" type="text" />
      </div>
      <br><br>
      <div>
        <b-button type="submit" variant="success">Register</b-button> 
        <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
      </div>
    </b-form>
      </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default Vue.extend({
    mixins: [validationMixin],
    validations: {
        register: {
            userName: {
                required,
                minLength: minLength(3)
            },
            password: {
                required,
                minLength: minLength(3)
            },
            emailId: {
                required
            }
        },
    },
    data() {
        return {
            register: {
                userName: '',
                password: '',
                emailId: '',
                contactNo: '',
                country: ''
            }
        }
    },
    methods: {
    async onRegister() {
        this.$v.register.$touch();
        if (this.$v.register.$anyError) {
            return;
        }
        await this.$axios.$post(`${process.env.BASE_URL}/users/create`, (this as any).register)
            .then((res) => {
                console.log(res);
                 (this as any).toastMessage('success', 'Registration is successful..'); 
                 (this as any).onReset();
                })
            .catch((error) => {
                console.log(error);
                (this as any).toastMessage('danger', 'Failed to register');
            });
    },
    validateState(name: any) {
      const data = this.$v.register[name];
      return data?.$dirty ? data?.$error === false : null;
    },
    /* touchUserName(value){
        this.register.userName = value
        this.$v.register.userName.$touch()
    }, */
    onReset(){
       (this as any).register.userName = '';
       (this as any).register.password = '';
       (this as any).register.emailId = '';
       (this as any).register.contactNo = '';
       (this as any).register.country = '';
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