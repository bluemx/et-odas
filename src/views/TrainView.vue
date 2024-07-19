<template>
    <div class="w-full h-full box-border py-5">

        <!-- //////////////////////////////////// -->
        
        <div class="bg-light text-center grow flex flex-col min-h-full justify-center  mx-auto p-2 md:p-5 w-full box-border" id="trainbox">
            
            
            <section class="max-w-[1200px] w-full md:w-/10 mx-auto my-5 text-left my-auto ">
                <TimerClock />
                
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
                    <div class="">
                        <div class="font-bold text-6">Question {{ 1+index }}</div>
                        <reactive :step="1+index" :data="item" nextbtn></reactive>
                    </div>
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
        eval: true
    },
    {
        audio: 'U1L1-q2.mp3',
        question: '',
        options: ['','',''],
        optionk: 'a',
        optionw: 'Para responder esta pregunta, es necesario conocer que la palabra “name” se refiere a nombre y que “mom\'s” es el posesivo “tu mamá”, así que se cuestiona “el nombre de tu mamá”.',
        eval: true
    },
    {
        audio: 'U1L1-q3.mp3',
        question: '',
        options: ['','',''],
        optionk: 'c',
        optionw: 'Para responder esta pregunta, debemos considerar que la frase “Do you like…” corresponde a “¿Te gusta…?” y esta es una respuesta cerrada: “sí” o “no”, por lo tanto HAY una única respuesta correcta.',
        eval: true
    },
    {
        audio: 'U1L1-q4.mp3',
        question: '',
        options: ['','',''],
        optionk: 'a',
        optionw: 'Nos encontramos de nuevo con la palabra de pregunta “Where”, la cual se refiere a lugar. La única respuesta correcta la  podemos saber porque estamos usando una preposición de lugar.',
        eval: true
    },
    {
        audio: 'U1L1-q5.mp3',
        question: '',
        options: ['','',''],
        optionk: 'b',
        optionw: 'En esta pregunta, puede ser confuso escuchar la palabra “dinner” tanto en la pregunta como en la respuesta, así que debemos prestar atención a la pregunta “What do you want” que significa “qué quieres” y aquí la respuesta debe ser algo relacionado con comida.',
        eval: true
    },
    {
        audio: 'U1L1-q6.mp3',
        question: '',
        options: ['','',''],
        optionk: 'c',
        optionw: 'En esta pregunta, la palabra clave es “When”, que significa “Cuando”, por lo tanto, la única respuesta posible es la que se refiere a una fecha o a un marcador de tiempo.',
        eval: true
    },
    {
        audio: 'U1L1-q7.mp3',
        question: '',
        options: ['','',''],
        optionk: 'c',
        optionw: 'Ahora regresamos a la palabra “name” en la pregunta, pero ahora con el posesivo “you”, así que está preguntando tu nombre, la única respuesta correcta sería el único nombre propio en las opciones.',
        eval: true
    },
    {
        audio: 'U1L1-q8.mp3',
        question: '',
        options: ['','',''],
        optionk: 'a',
        optionw: 'La palabra “Whose” puede ser complicada en español porque es “De quien…” para preguntar a quién pertenece cierto objeto. Así que debemos buscar la respuesta que nos de un posesivo.',
        eval: true
    },
    {
        audio: 'U1L1-q9.mp3',
        question: '',
        options: ['','',''],
        optionk: 'b',
        optionw: 'En esta pregunta, la clave es la palabra “drink”, “tomar o beber”. Se puede confundir por la palabra “What” o “qué”, por lo tanto, nuestra clave es “drink”, y la respuesta sería lo único que se puede “tomar o beber”.',
        eval: true
    },
    {
        audio: 'U1L1-q10.mp3',
        question: '',
        options: ['','',''],
        optionk: 'a',
        optionw: 'Regresamos a la palabra de pregunta “where”, o sea, “dónde”, que muchas veces se puede confundir con “when” por la pronunciación. La respuesta correcta sería aquella donde estamos utilizando la preposición de lugar y además da un lugar probable para una persona.',
        eval: true
    }
];
    
    
</script>