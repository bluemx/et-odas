<template>
<div v-if="!oda.odajson[oda.step]?.nocounter" class="flex gap-1 text-et-silve justify-center items-center bg-et-silver/50 text-white w-fit rounded ml-auto">
    <div class="bg-et-silver/40 p-1 -my-1 rounded-l text-4">
        <div class="i-mynaui-clock-octagon"></div>
    </div>
    <div class="pr-2 pl-1 font-bold" >
        {{oda.formattedTime}}
    </div>
</div>

<!-- TIMELIMIT -->
<div v-if="oda.odajson[oda.step]?.timelimit" class="fixed top-0 w-full left-0">
    <div class="bg-et-pink w-fit py-2 font-bold text-white text-xl mx-auto rounded-b transition-all duration-300" :class="timeprogress==0?'pt-20':''">
        <div class="px-10  flex gap-2 justify-center items-center ">
            <div class="i-mynaui-clock-octagon"></div>
            <div>
                {{oda.timeFormat( timelimit - timestep)}}
            </div>
        </div>
        <div class=" rounded bg-white mx-1 p-0.5 border-white">
            <div :style="'width:'+timeprogress+'%;'" class="bg-et-cyan h-2 rounded-sm"></div>
        </div>
        <div v-if="timeprogress==0" class="text-sm p-1 mx-1 mt-5 rounded-sm text-et-pink bg-white  text-center animate-bounce">
            Tiempo concluído
        </div>
    </div>
</div>

</template>

<script setup>
    import { useOda } from '@/stores/oda';
    const oda = useOda()

    const props = defineProps({
        step: Number
    })

    if(!oda.timers[props.step]) {
        oda.timers[props.step] = 0
    }

    const timelimit = computed(()=>{
        return oda.odajson[oda.step]?.timelimit
    })
    const timestep = computed(()=>{
        return oda.timers[props.step]
    })

    const timeprogress = computed (() => {
        return Math.round(((timelimit.value - timestep.value) / timelimit.value) * 100)
    })

    const finishtimer = () => {
        setTimeout(()=>{
            oda.stepNext()
        }, 4000)
    }
    oda.timerinvertval = setInterval(()=>{
        if(props.step == oda.step){
            
            // Timelimit counter
            if(oda.odajson[oda.step]?.timelimit && timeprogress.value > 0){
                oda.timers[props.step] += 1
                if(oda.odajson[oda.step].timelimit == oda.timers[props.step]){
                    finishtimer()
                }
            }
            
            // Normal counter
            if(!oda.odajson[oda.step]?.nocounter){ 
                oda.time += 1;
             }

        }    
    }, 1000)
</script>