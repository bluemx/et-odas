<template>
<div class="flex gap-1 text-et-silver justify-center items-center">
    <div class="i-mynaui-clock-octagon"></div>
    {{oda.formattedTime}}
</div>
</template>

<script setup>
    import { useOda } from '@/stores/oda';
    const oda = useOda()
    oda.timerinvertval = setInterval(()=>{
        oda.time += 1;
    }, 1000)
</script>