<template>
    <div class=" w-full h-full box-border ">
        <div class="flex w-full">
            <div class="ml-auto px-5">
                <TimerClock />
            </div>

        </div>
    <!-- //////////////////////////////////// -->

        <div class="bg-light text-center  flex-col mx-auto p-2 md:p-5 w-full box-border" id="trainbox">


            <section class="max-w-[800px] mx-auto my-5 text-left">
                
                <TrainScene :step="0" >
                    <div class="instrucciones font-bold text-5 text-gradient">INSTRUCCIONES</div>
                    <audioplayer file="U1L1.mp3"></audioplayer>
                    <div>En esta parte, usted escuchará preguntas o enunciados en inglés seguidos de tres opciones, también en inglés. Las preguntas o enunciados y las opciones se dirán solo una vez.</div>
                    <div>Escuche cuidadosamente para poder entender por qué no aparece nada escrito en el folleto del examen para estos ejercicios. Seleccione la mejor opción para cada pregunta o enunciado y oscurezca el espacio de la letra correspondiente en la hoja de respuestas. </div>
                    <div class="mt-5 font-bold text-5 text-gradient">EXAMPLE</div>
                    <div class="border-4 border-solid border-et-orange p-5 rounded-md ">
                        <reactive :step="0" :data="testdata"></reactive>
                    </div>
                    <div>La respuesta correcta es la  (B), de no ser la correcta, se proporciona una explicación que te ayude a corregir. </div>
                    <ButtonNav next></ButtonNav>
                </TrainScene>

                <TrainScene v-for="(item,index) in oda_data" :key="index" :step="1+index">
                    <div class="font-bold">Question {{ 1+index }}</div>
                    <reactive :step="1+index" :data="item" nextbtn></reactive>
                </TrainScene>                
            </section>

        </div>    

    <!-- //////////////////////////////////// -->
    
    </div>
</template>

<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    oda.getODA()


    const testdata = {
        audio: 'U1L1-q0.mp3',
        question: '',
        options: ['','',''],
        optionk: 'b',
        optionw: 'Para contestar esta pregunta, es necesario entender que “How are you?” en inglés requiere una respuesta que indique el estado de ánimo o salud de la persona.',
        eval: false
    }

    var oda_data = [
        {
            audio: 'U1L1-q1.mp3',
            question: '',
            options: ['','',''],
            optionk: 'c',
            optionw: 'Para contestar esta pregunta es necesario entender que “Where” en inglés requiere un lugar como contestación. La alternativa es la única que indica un lugar: biblioteca.',
            eval:true
        },

        {
            audio: 'U1L1-q2.mp3',
            question: '',
            options: ['','',''],
            optionk: 'a',
            optionw: 'Para responder esta pregunta, es necesario conocer que la palabra “name” se refiere a nombre y que “mom\'s” es el posesivo “tu mamá”, así que se cuestiona “el nombre de tu mamá”.',
            eval:true
        },

        {
            audio: 'U1L1-q3.mp3',
            question: '',
            options: ['','',''],
            optionk: 'c',
            optionw: 'Para responder esta pregunta, debemos considerar que la frase “Do you like…” corresponde a “¿Te gusta…?” y esta es una respuesta cerrada: “sí” o “no”, por lo tanto HAY una única respuesta correcta.',
            eval:true
        }
    ]
    
    
</script>