<template>
    <button v-if="prev && oda.step>0" @click="oda.stepPrev()" class="et-button btnnav" :disabled="disabled"  :class="!disabled?'animated animated-head-shake':''">
        <i class="i-mynaui-chevron-left mr-5"></i>
        BACK
    </button>
    <button ref="continuebtn" v-if="next" @click="oda.stepNext()" class="et-button btnnav"  :disabled="disabled" :class="!disabled?'animated animated-head-shake':''">
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
    disabled: Boolean,
    animateallok: Boolean
})
const continuebtn = ref()

watch(()=>props.animateallok, (val)=>{
    if(val){
        continuebtn.value.scrollIntoView({
            behavior: 'smooth',
            block: 'center'      // Aligns the element to the top of the viewport
        });
    }
})

</script>

<style >
.btnnav {
    @apply  bg-et-cyan hover:text-et-cyan no-underline font-bold cursor-pointer max-w-xs mx-auto
}
.btnnav:disabled{
    @apply bg-et-silver opacity-20
}
</style>