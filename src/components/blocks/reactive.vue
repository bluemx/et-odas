<template>
    <div class="flex flex-col justify-center gap-10 my-2 relative p-2 min-h-[300px]">
        <!--audio-->
        <template v-if="data.audio">
            <audioplayer :file="data.audio"></audioplayer>
        </template>
        <!--question-->
        <template v-if="data.question">
            <strong>{{ data.question }}</strong>
        </template>
        <!--options-->
        <template v-if="data.options && data.optionk">
            <div class="flex gap-5 flex-wrap" :class=" optionsEmpty ? 'justify-center' : 'flex-col'">
                <template v-for="(item,index) in optionsRender">
                    <reactiveBtn :freeze="okReactive" :letter="ids[index]" @clicked="clicked(item, index)" :current="okReactive && item.ok" :text="item.answertext" :ok="item?.ok"></reactiveBtn>
                </template>
            </div>
        </template>
        
        

        <template v-if="nextbtn">
            <ButtonNav next :disabled="!okReactive"></ButtonNav>
        </template>


        <reactiveMessage v-if="okReactive===false" @tryagain="reset()" :message="data.optionw" ></reactiveMessage>

    </div>
</template>

<script setup>

import { useOda } from '@/stores/oda';

import UIfx from 'uifx'
import snapMp3 from '/assets/sounds/snap.mp3'
import snapOkMp3 from '/assets/sounds/snapok.mp3'

const snap = new UIfx(snapMp3)
const snapok = new UIfx(snapOkMp3)

const oda = useOda()
const okReactive = ref(null)
const emit = defineEmits(['okreactive'])
const props = defineProps({
    data: Object,
    step: Number,
    nextbtn: Boolean
})


const selected = ref(null)

const ids = ['a', 'b', 'c', 'd', 'e'];

const optionsList = props.data.options.map((option, index) => { 
    return { 
        answerid: ids[index],
        answertext: option,
        ok:(ids[index] == props.data.optionk.toLowerCase()) ? ids[index] : false,
        questionid: props.step,
        questiontext: props.data.question,
    };
});


const optionsRender = ref()
const optionsEmpty = optionsList.every(item => item.answertext === '')


const shuffleTextOptions = () => {
    if(optionsEmpty){
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
}


const reset = () => {
    selected.value = null
    okReactive.value = null
    shuffleTextOptions()
}

shuffleTextOptions()




onMounted(()=>{
    
    console.log(oda.data)
    // Exists
    if(oda.data[props.step]){
        console.log('exists')
        selected.value = oda.data[props.step]
        okReactive.value=true
    } else {
        // New
        if(props.data.eval){
            oda.data[props.step] = null
            watch(selected, (newValue) => {
                if(newValue?.ok){
                    oda.data[props.step] = newValue
                }
            })
        }
    }

})


</script>