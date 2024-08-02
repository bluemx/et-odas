<template>
    <div v-show="oda.istesting ? true : oda.step == step" class="overflow-hidden animated animated-fade-in py-20">
      <div class="bg-white p-4 md:p-10 my-5 rounded-md flex flex-col gap-5">
        <slot></slot>
      </div>      
      <template v-if="data.allokbtn">
            <ButtonNav next :disabled="!allOk"></ButtonNav>
      </template>
      <template v-if="data.navigation">
          <div class="w-full flex justify-between">
            <ButtonNav prev></ButtonNav>
            <ButtonNav next></ButtonNav>
          </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useOda } from '@/stores/oda';
  import { useEventBus } from '@vueuse/core';
  import { ref, onMounted, watch, computed } from 'vue';
  
  const oda = useOda();
  const reactivesList = ref({});
  
  const bus = useEventBus<string>('reactives');
  
  const props = defineProps<{
    step: number;
    data: Object;
  }>();
  
  oda.stepcount += 1;

  const allOk =  computed(() => {
    return Object.values(reactivesList.value).every(value => value === true);
  });
  
  function listener(event: any) {
    if (event.step == props.step) {
      reactivesList.value[event.blockid] = event.isok || null;

    }
  }
  
  bus.on(listener);
  
  

  

  </script>