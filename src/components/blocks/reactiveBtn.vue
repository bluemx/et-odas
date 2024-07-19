<template>
    <div class="reactiveBtn flex items-center" :class="current?'selected':''">
        <div class="z-10">
            <div class="btn"  @click="clicked()">
                {{ letter.toUpperCase() }}
            </div>
        </div>
        <div v-if="text" class="text" @click="clicked()">
            {{text}}
        </div>
        <div class="z-10">
            <div class="answer flex justify-center items-center" :class="current && ok?'isok':''">
                <i v-if="current" class="i-custom-check text-6"></i>
            </div>
        </div>
    </div>
</template>
<script setup>

const emit = defineEmits(['clicked'])
const props = defineProps({
    data: Object,
    letter: String,
    text: String,
    current: [Boolean, String],
    ok: [Boolean, String],
    freeze: Boolean
})

const clicked = () => {
    if(props.freeze){return false}
    emit('clicked')
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