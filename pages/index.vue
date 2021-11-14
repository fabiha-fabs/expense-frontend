<template>
  <div class="container">
      <h1>Expense System</h1>
        index home page
      <b-button variant="info" @click="$router.push('/login')">Login</b-button>
     <Nuxt />
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  
})
</script>
