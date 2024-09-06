<template>
<div class="text-center text-2xl my-2 text-white p-2 rounded bg-et-pink font-bold">
    Tu nivel de inglés es 
    <span class="bg-white text-et-pink p-2 block">{{ level }} {{ lv[level].title }}</span>
</div>
<div class="my-5 text-left flex flex-col gap-2">
    <div class="text-center text-2xl text-et-dark">
        Esto significa que tú puedes: 
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Comprensión Auditiva</div>
        <div class="text-base col-span-3">{{ lv[level].listening }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Uso del Lenguaje</div>
        <div class="text-base col-span-3">{{ lv[level].language }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Comprensión Lectora</div>
        <div class="text-base col-span-3">{{ lv[level].reading }}</div>
    </div>

    <div class="text-center text-2xl mt-2 text-et-dark">
       Te recomendamos:
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Comprensión Auditiva</div>
        <div class="text-base col-span-3">{{ lv[level].listeningStudy }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Uso del Lenguaje</div>
        <div class="text-base col-span-3">{{ lv[level].languageStudy }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Comprensión Lectora</div>
        <div class="text-base col-span-3">{{ lv[level].readingStudy }}</div>
    </div>
    
</div>

</template>


<script setup>
const props = defineProps({
    level: String
})

const lv = {
    "A1": {
        title: "(Básico)",
        listening: "Seguir una conversación simple que contenga preguntas y oraciones sencillas. Reconocer vocabulario semejante(cognados) a la lengua materna (L1).  Reconocer información concreta como números, lugares, días de la semana y temas cotidianos.		",
        language:"Utilizar estructuras gramaticales sencillas, en específico el presente simple. Utilizar artículos y adjetivos determinativos para combinar palabras en oraciones cortas.",
        reading: "Localizar información básica en textos cortos y materiales auténticos. Utilizar aproximadamente 50 palabras distintas para relatar  situaciones cotidianas, información personal y familiar.",
        study: "Level Easy",
        listeningStudy: "Esucuchar atentamente las conversaciones inluidas en la plataforma y tomar notas que te ayuden a identificar el vocabulario y las estructuras que desconoces, de esta forma podrás buscar información que te permita avanzar  en tu aprendizaje		",
        languageStudy:"Estudiar las estructuras simples del lenguaje: presente y pasado simple, conectores del lenguaje comunes, adjetivos determinativos y conectores del lenguaje.		",
        readingStudy:"Leer con atención los textos que se encuentran en la plataforma e identificar las palabras que no comprendes del todo, de manera que puedas distinguir distintos contextos en los que la palabra puede usarse."
    },
    "A2": {
        title: "(Básico Avanzado)",
        listening: "Comprender frases, expresiones y pequeñas conversaciones  acerca de temas relevantes:  información sobre ti mismo,  la escuela, el trabajo, la familia, ocupaciones y lugares.",
        language:"Utilizar las estructuras gramaticales básicas para hacer peticiones,  dar información y hacer preguntas binarias.  Reconocer situacione en las cuales puede utilizarse el futuro con ”will” y ”going to”. Estructurar oraciones acerca de sus necesidades  más inmediatas, así como temas de su interés utilizando  distintas categorias de adjectivos determinativos.",
        reading: "Comprender información básica e ideas principales en audios sencillos de no más de 150 palabras que incluyan situaciones y temas con las que estes familiarizado: horarios, instrucciones, anuncios, entre otros.		",
        study: "Level Medium",
        listeningStudy: "Escuchar varias veces los audios incluidos en la plataforma y tomar nota acerca de los puntos claves. Practicar la repetición simúltanea de lo escuchado, para familiarizarte con vocabulario y estructura.",
        languageStudy:"Estudiar a detalles las siguientes estructuras gramaticales: presente simple, pasado simple y futuro utilizando ”will” y ”going to” en oraciones cortas y simples.",
        readingStudy:"Leer atentamente los textos en la plataforma e identificar palabras y frases que pueden ser usados en distintos contextos."
    },
    "B1": {
        title: "(Intermedio)",
        listening: "Entender los puntos principales y algunos detalles en una conversación acerca de temas conocidos en distintos contextos sociales y personales de su interés.",
        language:"Utilizar distintas estructiras gramaticales como: adjetivos, adverbios, presente continuo, oraciones acerca del futuro. Combinar estos elementos para dar una opinión , expresar deseos y aspiraciones.",
        reading: "Encontrar información específica, identificar ideas principales, diferenciar entre hechos y opiniones. Formarse una opinión acerca de un texto  en distintos contextos y situaciones.",
        study: "Level Medium-Difficult",
        listeningStudy: "Escuchar varias veces los audios incluidos en la plataforma y tomar nota acerca de los puntos claves. Practicar la repetición simúltanea de lo escuchado, prestando atención a la entonación.",
        languageStudy:"Intenta utilizar vocabulario y estructuras gramaticales que encuentres difíciles e intenta relacionarlos con actividades cotidianas o conocidas utilizando patrones del lenguaje.",
        readingStudy:"Resume lo leído en tus propias palabras para reforzar tu entendimiento de un texto. Estudia patrones que puedan ser utiles en distintos contextos e intenta relacionarlo con situaciones relevantes en tu vida cotidiana."
    },
    "B2": {
        title: "(Intermedio avanzado)",
        listening: "Comprender distintos patrones conversacionales, tanto en contextos conocidos como aquellos con los que no estas tan familiarizado.  Comprender ideas principales y detalladas en conversaciones sobre temas concretos y abstractos.",
        language:"Utilizar estructuras gramaticales con precisión: tiempos perfectos, colocación de modificadores, estilo indirecto, y el uso de conectores y transiciones para construir argumentos y opiniones complejas. Comprende y estructura oraciones combinando tres o cuatro de ellas en oraciones más complejas, asegurando una precisión gramatical razonable y utilizando un número limitado de conectores cohesivos.",
        reading: "Comprender varios textos y propósitos:  prosa narrativa convencional, artículos de noticias, textos argumentativos y discurso expositivo, sobre temas concretos y abstractos ya sean o no conocidos. Entender vocabulario menos común relacionado con la mayoría de los temas generales, campos de interés específicos y expresiones idiomáticas comunes presentadas en contexto",
        study: "Level Difficult",
        listeningStudy: "Utiliza los audios en este nivel para participar en ejercicios de escucha activa donde puedas predecir el contenido, identificar ideas principales e infeir el significado de una conversación larga.",
        languageStudy:"Concéntrate en dominar estructuras gramaticales avanzadas como los condicionales, la voz pasiva y las oraciones complejas. Practica escribir ensayos, informes y artículos de opinión, prestando atención a la coherencia y cohesión.",
        readingStudy:"Lee detenidamente los textos en la plataforma. Úsalos para discutir lo que has leído con otros, con el fin de profundizar tu comprensión y obtener diferentes perspectivas."
    }
}

</script>