<template>
  <div>
      <b-card class="center">
    <b-form @submit.prevent="userLogin" >
      <div>
        <label>Username</label>
        <b-form-input v-model="login.username" type="text" :state="validateState('username')" />
        <b-form-invalid-feedback v-if="!$v.login.username.required">
            User name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.login.username.minLength">
            User name must have at least {{$v.login.username.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </div>
      
      <div>
        <label>Password</label>
        <b-form-input v-model="login.password" type="password" :state="validateState('password')"  />
        <b-form-invalid-feedback v-if="!$v.login.password.required">
            Type password *
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.login.password.minLength">
            Password must have at least {{$v.login.password.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </div>
      
      <br><br>
      <div>
        <b-button type="submit" variant="success">Login</b-button> 
        <b-button type="reset" variant="danger" @click="reset">Reset</b-button>
      </div>
    </b-form>
      </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate";
import { required, minLength } from 'vuelidate/lib/validators'

export default Vue.extend({
    mixins: [validationMixin],
    validations:{
      login:{
        username: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(3)
        }
      }
    },
    data() {
        return {
            login: {
                username: '',
                password: ''
            }
        }
    },
    
    methods: {
    async userLogin() {
      try {
        this.$v.login.$touch();
        if (this.$v.login.$anyError) {
            return;
        }
        const response = await this.$auth.loginWith('local', { data: this.login })
        console.log((this as any).$auth);
         this.$router.push('/groups')
      } catch (err) {
        console.log(err)
      }
    },
    reset(){
       this.login.username = ''
       this.login.password = ''
    },
    validateState(name: any) {
      const data = this.$v.login[name];
      return data?.$dirty ? data?.$error === false : null;
    },
  }
})
</script>