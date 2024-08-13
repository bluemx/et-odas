<template>
    <div class="flex flex-col justify-center gap-10 my-2 relative p-2 min-h-[300px] reactive">
        
        <div v-if="data.title" class="font-bold text-6 text-et-silver">{{ data.title }}</div>
        <div v-if="data.lecture" v-html="data.lecture" class="bg-slate-200 text-lg p-4 rounded mt-2 mb-1"></div>


        <!--audio-->
        <template v-if="data.audio">
            <audioplayer :file="data.audio" :blockid="blockid+'-reactive'"></audioplayer>
        </template>
        <!--question-->
        <template v-if="data.type!=='listening'">
            <strong class="text-xl leading-8" v-html="data.question"></strong>
        </template>
        <!--options-->
        <div v-if="data.options && data.optionk" class="flex gap-5 flex-wrap" :class=" data.type=='listening' ? 'justify-center' : 'flex-col'">
            <div v-for="(item, index) in renderOptions">
                <ReactiveBtn :index="index" :show-ok="data.force_positive && selected?.correct" :visible-text="data.type!=='listening'" :active="item == selected " @clicked="clicked(item, index)">{{ item.text }}</ReactiveBtn>
            </div>
        </div>
  

        
        <template v-if="force_positive_message">
            <reactiveMessage @tryagain="reset()" :message="data.optionw" ></reactiveMessage>
        </template>


    </div>
</template>

<script setup lang="ts">
import { useEventBus } from '@vueuse/core'

import { useOda } from '@/stores/oda';

import UIfx from 'uifx'
import snapMp3 from '/assets/sounds/snap.mp3'
import snapOkMp3 from '/assets/sounds/snapok.mp3'

const bus = useEventBus('reactives')
const snap = new UIfx(snapMp3)
const snapok = new UIfx(snapOkMp3)
const letters = ['a', 'b', 'c', 'd', 'e'];

const emit = defineEmits(['okreactive'])
const props = defineProps({
    data: Object,
    step: Number,
    blockid: String
})

const oda = useOda()
const selected = ref(null)
const force_positive_message = ref(false)


const realOptions = ref([])
const renderOptions = ref([])


const initItem = {
    question: {
        id: props.blockid,
        text: props.data.question,
    },
    right_answer: {
        id: props.data.optionk.toLowerCase(),
        text: props.data.options[ letters.indexOf(props.data.optionk.toLowerCase()) ]
    },
}

onMounted(()=>{
    realOptions.value = props.data.options.map(( item, index) =>{
        return {
            ...initItem,
            id: letters[index],
            text: item,
            correct: props.data.optionk.toLowerCase() == letters[index]
        }
    })



    shuffleArray()



     // Exists
     if(oda.data[props.blockid]){
        selected.value = oda.data[props.blockid]

    } else {
        // New
        if(props.data.eval){
            oda.data[props.blockid] = {
                ...initItem,
                id: null,
                text: null,
                correct: null,
            }
            /*
            watch(selected, (newValue) => {
                if(newValue?.ok){
                    oda.data[props.blockid] = newValue
                }
            })
            */
        }
    }


    bus.emit({
        step:props.step,
        blockid: props.blockid,
        isok: selected.value?.correct
    })

    


})

const clicked = (item, index) => {    
    // Force Positive && Already CORRECT is selected
    if(selected.value?.correct && props.data.force_positive){ return false }
    
    // Force Positive
    if(props.data.force_positive){
        if(!item.correct){
            shuffleArray()
            force_positive_message.value = true
            return false
        } else {
            setTimeout(()=>{
                snapok.play()
            }, 200)
        }
    }
    
    // Save in selected
    selected.value = item
    // Store in oda store
    if(props.data.eval){
        oda.data[props.blockid] = selected.value
    }


    bus.emit({
        step:props.step,
        blockid: props.blockid,
        isok: selected.value?.correct
    })
    
}

const shuffleArray = () => {
    if(props.data.type == 'listening'){
        renderOptions.value = realOptions.value
    } else {
        renderOptions.value = []
        var array = [...realOptions.value]
        for (let i = realOptions.value.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        renderOptions.value = array;
    }
}



const reset = () => {
    force_positive_message.value = false
    shuffleArray()
}








</script>



