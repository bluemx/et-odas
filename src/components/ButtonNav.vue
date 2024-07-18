<template>
    <button v-if="prev && oda.step>0" @click="oda.stepPrev()" class="et-button et-cyan no-underline font-bold cursor-pointer max-w-xs mx-auto">
        <i class="i-mynaui-chevron-left mr-5"></i>
        GO BACK
    </button>
    <button v-if="next" @click="oda.stepNext()" class="et-button et-cyan no-underline font-bold cursor-pointer max-w-xs mx-auto">
        CONTINUE 
        <i class="i-mynaui-chevron-right ml-5"></i>
    </button>
</template>
<script setup>
import { useOda } from '@/stores/oda';
const oda = useOda()
const props = defineProps({
    next: Boolean,
    prev: Boolean,
})
</script>