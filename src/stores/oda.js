import {ref, computed, watch} from 'vue'
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
    const data = ref({})
    const stepcount = ref(0)

    const postmessagedata = ref(null)
    const audiops = ref({})
    const isplaying = ref({})


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
    }

    const isFinish = () => {
        clearInterval(timerinvertval.value)
        router.push('/'+id.value+'/finish')
    }

    const formattedTime = computed(() => {
        const minutes = Math.floor(time.value / 60)
        const seconds = time.value % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })


    // EXPORT IMPORT CONVERTIONS 
    // *    *   *   *   *   *   *   *   *   
    
    const convertObjectToArray = obj => Object.keys(obj).sort((a, b) => a - b).map(key => {
        let { ok, ...rest } = obj[key] || {};
        return obj[key] ? rest : null;
    });

    const arrayToObject = arr => arr.reduce((obj, item) => {
        if (item) {
            obj[item.questionid] = { ...item, ok: item.answerid };
        }
        return obj;
    }, {});
    const findBiggestKeyNotNull = obj => Math.max(...Object.keys(obj).filter(key => obj[key] !== null).map(Number));
    // *    *   *   *   *   *   *   *   *   

    // EXPORT
    const sendPMessage = (data_type, data_status) => {
        postmessagedata.value = {
            total: Object.keys(data.value).length,
            responded: Object.values(data.value).filter(item => item !== null).length,
            seconds: time.value,
            inputs: convertObjectToArray(data.value),
            oda: id.value,
            positive: Object.values(data.value).filter(item => item!==null && item.correct==true).length,
            //oda_info: info.value,
            datatype: data_type,
            status: data_status
        }

        window.parent.postMessage(JSON.parse(JSON.stringify(postmessagedata.value)), '*')
    }

    // IMPORT

    window.addEventListener('message', ({ data: messageData }) => {
        if (!messageData || messageData.datatype !== 'student_data') { return; }
        const {inputs, seconds } = messageData;
        data.value = arrayToObject(inputs)
        step.value = findBiggestKeyNotNull(data.value)+1
        time.value = seconds

    });

    // Watcher for step
    watch(step, (newValue) => {
        if(newValue==0){return false}
        if(newValue == stepcount.value){
            isFinish()
        }
        sendPMessage('student', 'progress')
        stopallaudios()
    });

    const stopallaudios = (blockid) => {
        //Stop all wavesurfers
        for(var index of Object.keys(audiops.value) ){
            if(blockid){
                if(index!==blockid){
                    audiops.value[index].stop()
                    isplaying.value[index] = false
                }
            } else {
                    audiops.value[index].stop()
                    isplaying.value[index] = false
            }
        }
       
        
    }

    return {
        id,
        info,
        step,
        time,
        data,
        audiops,
        isplaying,
        timerinvertval,
        stepcount,
        getODA,
        stepNext,
        stepPrev,
        formattedTime,
        stopallaudios,
        sendPMessage,
        convertObjectToArray,
        postmessagedata
    }
})