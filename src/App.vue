

<template>
  <div class="wrapper bg-gradient h-full flex justify-center items-center w-full">

    <div  class="relative z-10 w-full h-full">
      <RouterView />
    </div>
    
    <div class="et-conectores" :style="'background-image: url('+connector+') ;' " ></div>
  </div>
</template>


<style scoped></style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

import connector from './assets/connector.svg'



</script>