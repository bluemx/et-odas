<template>

    <template v-if="checkUrl()">
        <button  class="et-button !px-1 !text-xs !py-1 fixed bottom-2 right-36 !border-2 !border-solid !border-white" 
        @click="answer()">
            Contestar
        </button>

        <button  class="et-button !px-1 !text-xs !py-1 fixed bottom-2 right-20 !border-2 !border-solid !border-white" 
        @click="gotofinish()">
            Ir a final
        </button>


        <button  class="et-button !px-1 !text-xs !py-1 fixed bottom-2 right-2 !border-2 !border-solid !border-white" 
        :class="oda.istesting ? '!bg-et-orange': '' " 
        @click="test()">
            <template v-if="oda.istesting">Apagar test</template>
            <template v-else>Modo test</template>
        </button>
    </template>
</template>

<script setup lang="ts">
    import {useOda} from '@/stores/oda'
    import { useEventBus } from '@vueuse/core';
    const busallok = useEventBus<string>('allok');
    
    const oda = useOda()

    const test = () => {
        oda.istesting = !oda.istesting
    }
    const checkUrl = () => {
        const url = window.location.hostname;
        return url.includes("localhost") || url.includes("odas.win");
    }
    const gotofinish = () => {
        oda.step = oda.stepcount
    }
    const answer = () => {
        busallok.emit()
    }
</script>