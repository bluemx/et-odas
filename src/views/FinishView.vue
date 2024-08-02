<template>
    
    <div class="p-2 w-full h-full box-border flex justify-content items-center">
        <div class="bg-light text-center rounded-md  flex-col mx-auto p-12">
            
            <div class="mb-6">
                <div class="font-bold text-5 text-silver">Unit {{ oda.info.unit }} > Lesson {{ oda.info.lesson }}</div>
                <div class="font-bold text-4 text-silver opacity-50">{{ oda.info.unitTheme }}</div>
                <div class="font-bold text-5 text-silver">{{ oda.info.theme }}</div>
            </div>
            
            <div class="font-bold text-8 text-et-cyan">¡Felicidades!</div>
            <div class="font-bold text-6 text-silver">Has concluído con esta lección.</div>

            
            <div class="font-bold text-et-pink">Contestaste {{ responded }} reactivos de un total de {{ total }}</div>
            <div class="font-bold text-et-orange">en un tiempo de {{ oda.formattedTime }}.</div>

            <!--
            <div class="flex gap-10 mt-10 justify-center">
                <RouterLink :to="'/'+oda.id" class="et-button et-pink no-underline font-bold text-6 cursor-pointer">REINICIAR</RouterLink>
            </div>
            -->

        </div>

        
    </div>
    <div v-for="item in oda.data" class="flex flex-col gap-5 text-xs">
        <div>{{ item }}</div>
    </div>
</template>
    
<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    oda.getODA()
    oda.sendPMessage('student', 'finish')

    const responded = Object.values(oda.data).filter(item => item && item.correct !== null).length
    const total =  Object.keys(oda.data).length
</script>