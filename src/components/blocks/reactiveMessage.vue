<template>
    <div class="reactiveMessage">
        <div class="absolute inset-1 rounded-md backdrop-blur-md bg-dark-100/30 flex justify-center items-center z-20 flex flex-col p-2 gap-2 md:gap-10 ">
            <div class="bg-white rounded p-4 font-bold animated animated-fade-in md:max-w-[80%] leading-5" v-html="message"></div>
            <button @click="emit('tryagain')" class="et-button et-cyan no-underline font-bold text-6 cursor-pointer">Try Again</button>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['tryagain'])
const props = defineProps({
    message: String
})

</script>