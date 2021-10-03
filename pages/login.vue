<template>
<b-row class="mt-5 pt-5">
    <b-col md="4"/>
    <b-col md="4">
     <b-card no-body>
      <b-tabs small card>
        <b-tab title="Login"><login-form/></b-tab>
        <b-tab title="Register"><register-form/></b-tab>
      </b-tabs>
    </b-card>
    </b-col>
    <b-col md="4"/>
</b-row>
</template>
<script lang="ts">
import Vue from 'vue'
import loginForm from '../components/auth/loginForm.vue';
import RegisterForm from '../components/auth/registerForm.vue';

export default Vue.extend({
  components: { loginForm, RegisterForm },
    data() {
        return {
        }
    },
    methods: {
    }
})
</script>