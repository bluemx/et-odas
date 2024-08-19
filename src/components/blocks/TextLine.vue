<template>

<div class="text-line bg-slate-200 [&>*:nth-child(odd)]:bg-slate-300/60 ">
    <div v-for="(item, index) in texts" class="flex gap-2 items-center leading-5 py-1 px-2">
        <div class="text-slate-400  p-1 w-10">{{ index+1 }}</div>
        <div class="text-xl">{{ item }}</div>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    texts: [Object, Array]
})
</script>