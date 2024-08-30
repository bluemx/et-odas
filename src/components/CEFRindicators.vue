<template>
<div class="text-center text-2xl my-2 text-white p-2 rounded bg-et-pink font-bold">
    Your level is 
    <span class="bg-white text-et-pink p-2 block">{{ level }} {{ lv[level].title }}</span>
</div>
<div class="my-5 text-left flex flex-col gap-2">
    <div class="text-center text-2xl text-et-dark">
        This means you can:
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Listening Comprehension</div>
        <div class="text-base col-span-3">{{ lv[level].listening }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Language Use</div>
        <div class="text-base col-span-3">{{ lv[level].language }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-carrot">Reading Comprehension</div>
        <div class="text-base col-span-3">{{ lv[level].reading }}</div>
    </div>

    <div class="text-center text-2xl mt-2 text-et-dark">
        We recommend you to study: 
    </div>
    <div class="text-et-silver text-center text-lg">{{ lv[level].study }}</div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Listening Comprehension</div>
        <div class="text-base col-span-3">{{ lv[level].listeningStudy }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Language Use</div>
        <div class="text-base col-span-3">{{ lv[level].languageStudy }}</div>
    </div>
    <div class="grid grid-cols1 md:grid-cols-4 gap-10 bg-white p-2">
        <div class="w-1/3 font-bold text-et-orange">Reading Comprehension</div>
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
        title: "(Low Basic)",
        listening: "Follow speech containing simple questions and statements. Recognize cognates and concrete information, such as numbers, places, times, and days of the week, on familiar topics encountered in everyday life",
        language:"Use elementary grammatical structures, including simple present tense and basic determiners like “a” and “an,” in short and simple sentences about the most common everyday situations. Combine words into short sentences using elementary grammatical structures and very basic connectors like ”and”",
        reading: "Locate basic information in very short texts and authentic materials, such as labels and notices, in common everyday situations and using simple vocabulary, beginning with approximately 50 words. understand basic vocabulary presented within phrases and very short sentences about the most common everyday situations, including personal information and familiar settings.",
        study: "Level Easy",
        listeningStudy: "Listen carefully to the conversations  and try to take as much notes as you can, identify vocabulary and structures you don't know.",
        languageStudy:"Study the elementary grammar structures: Simple present and simple past, determiners and connectors.",
        readingStudy:"Read the texts provided carefully and search for words you don't understand in different contexts."
    },
    "A2": {
        title: "(High Basic)",
        listening: "Understand phrases, expressions, and short talks about important things like personal and family details, shopping, and work.",
        language:"Use basic grammar to make requests, give information, ask ”yes/no” questions, and use simple past and future tenses with ”will” and ”going to.” Talk about daily things and urgent needs in short, simple sentences. Improve basic sentences and join words into short sentences using simple connectors like ”and,” ”but,” and ”because.”",
        reading: "Find basic information and understand main ideas in short, simple texts of about 150 words with common vocabulary. These can be things like signs, labels, instructions, schedules, and notices. Understand common words in short sentences to help with basic communication in familiar situations and topics.",
        study: "Level Medium",
        listeningStudy: "Play the same audio multiple times and take notes on key points. Practice shadowing by repeating what you hear.",
        languageStudy:"Study grammar structures such as simple past and future tenses with ”will” and ”going to” in short, simple sentences.",
        readingStudy:"Read carefully the texts provided and identify words and phrases  than can be used in different contexts."
    },
    "B1": {
        title: "(Low Independent )",
        listening: "Understand the main points and some details of standard speech on familiar topics often encountered in personal, social, and academic settings, such as short stories, advertisements, and reports.",
        language:"Use different grammatical structures, like adjectives, adverbs, irregular plurals, and present progressive and future tenses, in everyday social, familiar, practical, and leisure contexts. Improve sentence structure by combining two or three short sentences into longer ones using a limited range of connectors and common grammatical patterns.",
        reading: "Find specific information, identify main ideas, tell the difference between fact and opinion, and draw conclusions in straightforward factual texts, short stories, and everyday materials of about 280 words with mostly familiar vocabulary. Understand vocabulary in context within sentences on various topics related to daily life, including personal, practical, school, and work situations.",
        study: "Level Medium-Difficult",
        listeningStudy: "Listen to the audios in detail. Practice shadowing by repeating what you hear to improve pronunciation and intonation.",
        languageStudy:"Try to use new vocabulary and grammar structures, that you may found in the units, in speaking and writing exercises. For example, write a short make predictions about your weekend plans using connectors and patterns.",
        readingStudy:"Summarize what you've read in your own words to reinforce understanding. Discuss the content with study partners can enhance comprehension. Finally, relate the material to your own experiences or interests to make it more memorable and meaningful."
    },
    "B2": {
        title: "(High Independent)",
        listening: "Comprehend standard speech in favorable listening environments on both familiar and certain unfamiliar topics commonly encountered in work-related, social, and academic settings. Grasp the main ideas and details of complex speech on both concrete and abstract topics delivered in a standard dialect, including arguments on reasonably familiar subjects, with clear direction indicated by explicit markers.",
        language:"Employ advanced grammatical structures with reasonable accuracy, such as perfect tenses, modifier placement, reported speech, and some connective devices and transitions, to construct complex sentences on a variety of topics. Enhance sentences by combining three or four of them into more complex ones, ensuring reasonable grammatical accuracy and utilizing a limited number of cohesive devices.",
        reading: "Comprehend various texts and purposes, such as conventional narrative prose, news articles, argumentative texts, and expository discourse of about 350 words, on reasonably familiar concrete and abstract topics, including academic content and vocabulary. Understand less common vocabulary related to most general topics, specific fields of interest, and common idiomatic expressions presented in context.",
        study: "Level Difficult",
        listeningStudy: "Use the audios in this level to engage in active listening exercises where you predict content, identify main ideas, and infer meaning from",
        languageStudy:"Focus on mastering advanced grammar structures such as conditionals, passive voice, and complex sentences. Practice writing essays, reports, and opinion pieces, paying attention to coherence and cohesion.",
        readingStudy:"Read carefully the texts in the platform. Use them to discuss what you've read with others to deepen your comprehension and gain different perspectives."
    }
}

</script>