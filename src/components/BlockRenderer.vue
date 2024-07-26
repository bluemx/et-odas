<template>
    
    <template v-for="(item, index) in data">
        <!-- CONTAINER -->
        <template v-if="item?.content">
            <div :class="item?.class">
            <BlockRenderer :data="item.content" :step="step" :blockid="blockid+'-'+index" />
        </div>
        </template>

        <!-- TEXT -->
        <template v-else-if="item.text">
            <div :class="item?.class" v-html="item.text"></div>
        </template>

        <!-- AUDIOPLAYER -->
        <template v-else-if="item?.audioplayer">
            <audioplayer :file="item.audioplayer" :blockid="blockid+'-'+index" />
        </template>

        <!-- REACTIVE -->
        <template v-else-if="item?.optionk">
            <reactive :step="step" :data="item" :nextbtn="item.nextbtn" :blockid="blockid+'-'+index" />
        </template>

        <!-- ButtonNav -->
         <template v-else-if="item?.buttonnav=='next'">
            <ButtonNav next></ButtonNav>
         </template>
         <template v-else-if="item?.buttonnav=='prev'">
            <ButtonNav prev></ButtonNav>
         </template>

    </template>


</template>

<script setup>
const props = defineProps({
    data: Object,
    step: [Number, String],
    blockid: String
})
</script>