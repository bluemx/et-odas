<template>
<div class="flex gap-1 text-et-silver justify-center items-center bg-et-carrot text-white w-fit rounded mx-auto">
    <div class="bg-et-orange p-1 -my-1 rounded text-6">
        <div class="i-mynaui-clock-octagon"></div>
    </div>
    <div class="pr-2 pl-1 font-bold ">
        {{oda.formattedTime}}
    </div>
</div>
</template>

<script setup>
    import { useOda } from '@/stores/oda';
    const oda = useOda()
    oda.timerinvertval = setInterval(()=>{
        oda.time += 1;
    }, 1000)
</script>