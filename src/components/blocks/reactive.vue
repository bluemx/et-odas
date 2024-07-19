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
                    <reactiveBtn :freeze="okReactive" :letter="ids[index]" @clicked="clicked(item, index)" :current="okReactive && item.ok" :text="item.txt" :ok="item?.ok"></reactiveBtn>
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
        txt: option,
        ok:(ids[index] == props.data.optionk.toLowerCase()) ? ids[index] : false
    };
});


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





const clicked = (item,index) => {
    selected.value = item
    if(selected.value?.ok){
        okReactive.value=true
        emit('okreactive')
    } else {
        shuffleTextOptions()
        okReactive.value= false
    }
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