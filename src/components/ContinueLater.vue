<template>
    <button class="et-button !px-4 !py-1 fixed bottom-2 left-2 !border-2 !border-solid !border-white" @click="later()">Continuar más tarde</button>
    <div class="bg-pink fixed inset-0 z-100 bye-screen flex justify-center items-center flex-col gap-5" v-if="bye">
        <template v-if="byetxt">
            <div class="font-bold text-6 text-white">Tu progreso ha sido guardado.</div>
            <div class="font-bold text-5 text-white ">Puedes salir ahora.</div>
        </template>
        <template v-else>
            <i class="i-mynaui-circle-notch animate-spin text-white text-9xl"></i>
        </template>
    </div>
</template>
<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    
    const bye = ref(false)
    const byetxt = ref(false)
    const later = () => {
        bye.value = true
        oda.sendPMessage('student', 'later')
        setTimeout(()=>{
            byetxt.value = true
        }, 2500 )
    }
</script>
<style>
.bye-screen{
    animation: byeAnimation 1s forwards;
}
@keyframes byeAnimation {
    0% { height: 0; }
    100% { height: 100%; }
    
}
</style>