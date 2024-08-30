<template>
    
    <div class="p-2 w-full h-full box-border flex justify-content items-center">
        <!-- UNITS -->
        <div class="bg-light text-center rounded-md  flex-col mx-auto p-12" v-if="!oda.CEFRLevel">
            <div class="mb-6">
                <div class="font-bold text-5 text-silver" >Unit {{ oda.info.unit }} <span v-if="oda.info.lesson">> Lesson {{ oda.info.lesson }}</span></div>
                <div class="font-bold text-4 text-silver opacity-50">{{ oda.info.unitTheme }}</div>
                <div class="font-bold text-5 text-silver">{{ oda.info.theme }}</div>
            </div>
            
            <div class="font-bold text-8 text-et-cyan">¡Felicidades!</div>
            <div class="font-bold text-6 text-silver">Has concluído.</div>

            
            <div class=" px-2 rounded my-2 bg-slate-200 py-5 text-xl">
                <div class="font-bold text-et-cyan">
                    Reactivos correctos: {{ responded }}<span class="opacity-60">/{{ total }}</span> </div>
                <div class="font-bold text-et-orange">Tiempo: {{ oda.formattedTime }}</div>
            </div>

            
        </div>
        <!-- PT EXAM -->
        <div class="bg-light text-center rounded-md  flex-col mx-auto p-2 w-full md:max-w-5xl  overflow-auto h-full" v-else>
            <div class="mb-6">
                <div class="font-bold text-8 text-et-cyan">¡Felicidades!</div>
                <div class="font-bold text-5 text-silver">Has concluído tu Practice Test.</div>
            </div>
            
            

            
            <div class=" p-2 py-10 rounded my-2 bg-gray-100 text-xl border-2">
                
                <template v-if="oda.CEFRLevel!=='Pre A1'">
                    <div class="text-et-silver font-bold" >
                        ACHIEVED A TOTAL SCORE OF <strong class="text-et-orange">{{ oda.totalpoints }}</strong> ON ELASH 1 <br>EQUIVALENT TO  <strong class="text-et-orange">{{oda.CEFRLevel}} LEVEL</strong> OF THE CEFR.
                    </div>


                    <CEFRindicators :level="oda.CEFRLevel"></CEFRindicators>


                </template>
                <template v-else>
                    <div class="text-et-silver font-bold" > ACHIEVED A TOTAL SCORE OF <strong class="text-et-orange">{{ oda.totalpoints }}</strong> ON ELASH 1</div>
                    <div v-if="oda.CEFRLevel" class="text-center text-3xl my-2 text-et-pink p-2  font-bold">
                        Your level is {{ oda.CEFRLevel }} 
                    </div>
                    <div class="my-4 text-base">
                        Don't be discouraged if you haven't reached the basic level yet. Progress takes time, and every step forward is an achievement. Focus on consistent practice and seek support from teachers, peers, and language learning resources. Remember, persistence and dedication are key, and with continued effort, you'll see improvement. Keep believing in yourself and your ability to learn!				
                    </div>
                </template>
                
            </div>

          
        </div>

        
    </div>
    <!--
        <div v-for="item in oda.data" class="flex flex-col gap-5 text-xs">
            <div>{{ item }}</div>
        </div>
    -->

</template>
    
<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    oda.getODA()
    oda.sendPMessage('student', 'finish')

    const responded = Object.values(oda.data).filter(item => item && item.correct == true).length
    const total =  Object.keys(oda.data).length
</script>