<template>
    <div class="">
        <div class="flex justify-center items-center gap-4">
            <div class="w-20 text-white text-9 relative">
                <template v-if="!oda.isplaying[blockid] && (!playback || playbacktimes<playback)">
                    <div class="bg-et-cyan aspect-square w-full rounded-md flex justify-center items-center cursor-pointer" @click="toggle()">
                        <i class="i-mynaui-play-octagon"></i>
                    </div>
                </template >
                <template v-else-if="!oda.isplaying[blockid] && playback && playbacktimes>=playback">
                    <div class="bg-et-silver aspect-square w-full rounded-md flex justify-center items-center cursor-pointer">
                        <i class="i-mynaui-play-octagon"></i>
                    </div>
                </template>
                <div class="bg-et-pink aspect-square w-full rounded-md flex justify-center items-center cursor-pointer" @click="toggle()" v-else>
                    <i class="i-mynaui-stop-octagon"></i>
                </div>
                <div v-if="playback" class="absolute top-1 right-1 text-xs">{{playbacktimes}}/{{ playback }}</div>
            </div>
            <div ref="waveform" class="w-full"></div>
        </div>
    </div>
  </template>
  
  <script setup>
  import WaveSurfer from 'wavesurfer.js';

  import {useOda} from '@/stores/oda'
  const oda = useOda()
  const props = defineProps({
    file: String,
    blockid: String,
    playback: [Number, Boolean]
  });
  
  const isplaying = ref(false)
  const waveform = ref(null);

  const playbacktimes = ref(0)

  
  onMounted(() => {

    
    oda.audiops[props.blockid] = WaveSurfer.create({
        container: waveform.value,
        waveColor: '#ddd',
        progressColor: '#2b82cc',
        interact: false,
        cursorWidth: 10,
        barWidth: 6,
        barGap: 2,
        barAlign: 'bottom',
        normalize: true,
        height: 60
    });

    oda.audiops[props.blockid].setVolume(0.7);


   
  
    if (props.file) {
        oda.audiops[props.blockid].load('ODAS/'+oda.id+'/'+props.file);
        oda.audiops[props.blockid].on('click', () => {
            oda.audiops[props.blockid].play()
            oda.isplaying[props.blockid] = true
        })
        oda.audiops[props.blockid].on('finish', () => {
            oda.isplaying[props.blockid] = false
        })
    }
  });

  const toggle = () => {
    oda.stopallaudios(props.blockid)
    if(oda.isplaying[props.blockid]){
        oda.isplaying[props.blockid] = false
        oda.audiops[props.blockid].stop()
    } else {
        if(props.playback){
            playbacktimes.value += 1
        }
        oda.isplaying[props.blockid] = true
        oda.audiops[props.blockid].play()
    }
  }


  
  </script>
