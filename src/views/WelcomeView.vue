<template>
    
<div class="p-2 w-full h-full box-border flex justify-content items-center">
    <div class="bg-light text-center rounded-md  flex-col mx-auto p-12">
        <img src="@/assets/logo-ET.svg" style="max-width: 160px;" alt="ELASH TRAINER" class="mb-10 mx-auto">
        <!--<div class=" text-silver text-4 opacity-50">{{ oda.id }}</div>-->
        <div v-if="oda.id=='PT'">
            <div class="font-bold text-8 text-white rounded p-2 bg-et-carrot">{{ oda.info.name }}</div>
            <div class="my-5 text-left">
                <div class="flex gap-2 justify-between bg-slate-200/20 p-2 rounded items-center">
                    <div class="font-bold text-5 text-pink">Comprensión auditiva</div>
                    <div class="font-bold text-4 bg-et-silver text-white rounded min-w-30 text-center">25 minutos</div>
                </div>
                <div class="flex gap-2  justify-between bg-slate-300/20 p-2 rounded items-center">
                <div class="font-bold text-5 text-carrot">Uso de lengua y redacción indirecta</div>
                <div class="font-bold text-4 bg-et-silver text-white rounded min-w-30 text-center">40 minutos</div>
                </div>
                <div class="flex gap-2  justify-between bg-slate-400/20 p-2 rounded items-center">
                    <div class="font-bold text-5 text-orange">Comprensión de lectura y vocabulario</div>
                    <div class="font-bold text-4 bg-et-silver text-white rounded min-w-30 text-center">25 minutos</div>
                </div>
            </div>
        </div>
        <div v-if="oda.info">
            <div class="">
                <div v-if="oda.info.unit && oda.info.lesson" class="font-bold text-6 text-carrot">Unit {{ oda.info.unit }} > Lesson {{ oda.info.lesson }}</div>
                <div class="font-bold text-4 text-silver opacity-50">{{ oda.info.unitTheme }}</div>
                <div class="font-bold text-8 text-orange">{{ oda.info.theme }}</div>
                <div class="font-bold text-4 text-silver opacity-50">{{ oda.info.difficulty }}</div>
            </div>
            <div class="mt-10">
                <template v-if="oda.step==0">
                    <RouterLink :to="'/'+oda.id+'/train'" class="et-button et-cyan no-underline font-bold text-6 cursor-pointer animated animated-fade-in animated-delay-1s">COMENZAR</RouterLink>
                </template>
                <template v-else>
                    <RouterLink :to="'/'+oda.id+'/train'" class="et-button et-pink no-underline font-bold text-6 cursor-pointer animated animated-fade-in animated-delay-1s">CONTINUAR</RouterLink>
                    <div class="font-bold text-4 text-pink mt-2">Continuarás en la página {{ oda.step }}.</div>
                </template>
            </div>
        </div>
        <div v-else>
            <div class="font-bold text-et-silver text-6">
                Cargando<span class="animate-pulse">...</span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    oda.getODA()

    //RESET
    oda.data = {}
    oda.step = 0
    oda.time = 0
    oda.stepcount = 0
    oda.audiops = {}

</script>