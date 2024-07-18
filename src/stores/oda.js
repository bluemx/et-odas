import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import odas from './odaslist.js'
import { useRoute, useRouter } from 'vue-router'

export const useOda = defineStore('oda', () => {
    const route = useRoute()
    const router = useRouter()

    const info = ref(null)
    const id = ref(null)
    const step = ref(0)
    const time = ref(0)
    const data = ref([])

    const dataEval = ref([])

    const timerinvertval = ref()
    
    const getODA = () => {
       
        if(route.params.id){
            id.value = route.params.id
            info.value = odas.list[id.value]
        }

    }

    const stepPrev = () => { 
        if(step.value){
            step.value -= 1
        }
    }

    const stepNext = () => { 
        step.value += 1
        //FINISHI
        if(step.value == data.value.length){
            isFinish()
        }
    }

    const isFinish = () => {
        clearInterval(timerinvertval.value)
        router.push('/'+id.value+'/finish')
        dataEval.value = data.value.filter(item => item?.eval === true)
        finishPostMessage()
    }

    const formattedTime = computed(() => {
        const minutes = Math.floor(time.value / 60)
        const seconds = time.value % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })


    const finishPostMessage = () => {
        const message = {
            oda_id: id.value,
            oda_info: info.value,
            user_time: time.value,
            user_data: dataEval.value,
            odaevent: 'finished'
        }
        console.log(message)
        window.parent.postMessage(JSON.parse(JSON.stringify(message)), '*')
    }

    return {
        id,
        info,
        step,
        time,
        data,
        dataEval,
        timerinvertval,
        getODA,
        stepNext,
        stepPrev,
        formattedTime
    }
})