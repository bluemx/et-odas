<template>
    <div class="flex flex-col justify-center gap-10 my-2 relative p-2 min-h-[300px]">
        <div v-if="data.title" class="font-bold text-6 text-et-silver">{{ data.title }}</div>
        <!--audio-->
        <template v-if="data.audio">
            <audioplayer :file="data.audio" :blockid="blockid+'-reactive'"></audioplayer>
        </template>
        <!--question-->
        <template v-if="data.type!=='listening'">
            <strong class="text-xl">{{ data.question }}</strong>
        </template>
        <!--options-->
        <template v-if="data.options && data.optionk">
            <div class="flex gap-5 flex-wrap" :class=" data.type=='listening' ? 'justify-center' : 'flex-col'">
                <template v-for="(item,index) in optionsRender">
                    <template v-if="data.type=='listening'">
                        <reactiveBtn :freeze="okReactive" :letter="ids[index]" @clicked="clicked(item, index)" :current="okReactive && item.ok" :ok="item?.ok"></reactiveBtn>
                    </template>
                    <template v-else>
                        <reactiveBtn :freeze="okReactive" :letter="ids[index]" @clicked="clicked(item, index)" :current="okReactive && item.ok" :text="item.answertext" :ok="item?.ok"></reactiveBtn>
                    </template>
                </template>
            </div>
        </template>
        
        <reactiveMessage v-if="okReactive===false" @tryagain="reset()" :message="data.optionw" ></reactiveMessage>

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

const oda = useOda()
const okReactive = ref(null)
const emit = defineEmits(['okreactive'])
const props = defineProps({
    data: Object,
    step: Number,
    blockid: String
})


const selected = ref(null)

const ids = ['a', 'b', 'c', 'd', 'e'];

const optionsList = props.data.options.map((option, index) => { 
    return { 
        answerid: ids[index],
        answertext: option,
        ok:(ids[index] == props.data.optionk.toLowerCase()) ? ids[index] : false,
        correct: (ids[index] == props.data.optionk.toLowerCase()),
        questionid: props.blockid,
        questiontext: props.data.question,
    };
});


const optionsRender = ref()
const optionsEmpty = optionsList.every(item => item.answertext === '')


const shuffleTextOptions = () => {
    if(props.data.type == 'listening'){
        optionsRender.value = optionsList
    } else {
        var array = optionsList
        for (let i = optionsList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        optionsRender.value = array;
    }
};





const clicked = (item,index) => {
    
    selected.value = item
    if(selected.value?.ok){
        okReactive.value=true
        emit('okreactive')
        snapok.play()
    } else {
        shuffleTextOptions()
        okReactive.value= false
        snap.play()
    }

    bus.emit({
        step:props.step,
        blockid: props.blockid,
        isok: okReactive.value
    })
}


const reset = () => {
    selected.value = null
    okReactive.value = null
    shuffleTextOptions()
}

shuffleTextOptions()




onMounted(()=>{
    

    // Exists
    if(oda.data[props.step]){
        selected.value = oda.data[props.step]
        okReactive.value=true
    } else {
        // New
        if(props.data.eval){
            oda.data[props.step] = {
                answerid: null,
                answertext: null,
                ok: null,
                correct: null,
                questionid: props.blockid,
                questiontext: props.data.question,
            }
            watch(selected, (newValue) => {
                if(newValue?.ok){
                    oda.data[props.step] = newValue
                }
            })
        }
    }


    bus.emit({
        step:props.step,
        blockid: props.blockid,
        isok: okReactive.value
    })

})


</script>