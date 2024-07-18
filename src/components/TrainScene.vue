<template>
<div v-show="oda.step == step">
    <div class="bg-white p-4 md:p-10 my-5 rounded-md flex flex-col gap-5">
        <slot></slot>
    </div>
</div>
</template>
<script setup>
import { useOda } from '@/stores/oda';
const oda = useOda()

const props = defineProps({
    step: Number
});
if(oda.data[props.step] === undefined){
    oda.data[props.step] = null
}

</script>