<template>
    <div class="flex flex-col gap-10 my-2 relative p-2">
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
                    <reactiveBtn :freeze="okReactive" :letter="ids[index]" @clicked="clicked(item, index)" :current="item?.id == oda.data[props.step]?.id" :text="item.txt" :ok="item?.ok"></reactiveBtn>
                </template>
            </div>
        </template>
        
        <reactiveMessage v-if="okReactive===false" @tryagain="reset()" :message="data.optionw" ></reactiveMessage>


        <template v-if="okReactive && nextbtn">
            <ButtonNav next></ButtonNav>
        </template>

    </div>
</template>

<script setup>
import { useOda } from '@/stores/oda';
const oda = useOda()
const okReactive = ref(null)
const emit = defineEmits(['okreactive'])
const props = defineProps({
    data: Object,
    step: Number,
    nextbtn: Boolean
})

const ids = ['a', 'b', 'c', 'd', 'e'];

const optionsList = props.data.options.map((option, index) => { return { id: ids[index], txt: option, eval: props.data.eval }; });
//Set ok
optionsList.find(option => option.id === props.data.optionk.toLowerCase()).ok = true;
//Is eval
if(props.data?.noneval){
    optionsList
}



const optionsRender = ref()
const optionsEmpty = optionsList.every(item => item.txt === '')


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


const isAlreadyOk = () => {
    return oda.data[props.step] && oda.data[props.step]?.ok
}


const clicked = (item,index) => {
    oda.data[props.step] = item
    if(isAlreadyOk()){
        okReactive.value=true
        emit('okreactive')
    } else {
        shuffleTextOptions()
        okReactive.value= false
    }
}


const reset = () => {
    oda.data[props.step] = null
    okReactive.value = null
    shuffleTextOptions()
}

shuffleTextOptions()
isAlreadyOk()


onMounted(()=>{
    if(oda.data[props.step]!==undefined && oda.data[props.step]!== null){
        if(isAlreadyOk()){okReactive.value=true}
    }
})


</script>