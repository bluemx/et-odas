<template>
    <div class="reactiveBtn flex items-center" :class="active?'selected':''" @click="clicked">
        <div class="btn z-10">{{ letters[index] }}</div>
        <div class="text" v-if="visibleText"><slot></slot></div>

        <div class="z-10" v-if="showOk && active">
            <div class="answer flex justify-center items-center" :class="'isok'">
                <i class="i-custom-check text-6"></i>
            </div>
        </div>
    </div>
</template>
<script setup>
import UIfx from 'uifx'
import clickMp3 from '/assets/sounds/click.mp3'

const clicksound = new UIfx(clickMp3)

const emit = defineEmits(['clicked'])
const props = defineProps({
    index: Number,
    data: Object,
    letter: String,
    text: [String, Boolean],
    current: [Boolean, String],
    ok: [Boolean, String],
    freeze: Boolean,
    hideOk: Boolean,
    visibleText: Boolean,
    active: [Boolean, String],
    showOk: Boolean
})


const letters = ['A', 'B', 'C', 'D', 'E'];


const clicked = () => {
    if(props.freeze){return false}
    emit('clicked')
    clicksound.play()
}

</script>

<style scoped>
.btn{
    @apply cursor-pointer w-12 aspect-square rounded-full bg-white border-4 border-gray-500 border-solid text-et-cyan flex justify-center items-center font-bold text-6
}
.btn:hover{
    @apply scale-110
}
.text{
    @apply cursor-pointer bg-gray-100 pl-14 -ml-6 pr-5 py-2 text-et-silver font-bold z-0 rounded-xl
}
.answer{
    @apply  ml-2 w-12 aspect-square rounded-full 
}
.answer.isok{
    @apply bg-et-green
}

.selected .btn{
    @apply bg-et-golden text-et-carrot border-et-carrot
}
.selected .text {
    @apply border-b-4 border-r-2 border-et-golden
}
</style>