<template>
    <div class="">
        <div class="flex justify-center items-center gap-4">
            <div class="w-20 text-white text-9">
                <div class="bg-et-cyan aspect-square w-full rounded-md flex justify-center items-center cursor-pointer" @click="toggle()" v-if="!isplaying">
                    <i class="i-mynaui-play-octagon"></i>
                </div>
                <div class="bg-et-pink aspect-square w-full rounded-md flex justify-center items-center cursor-pointer" @click="toggle()" v-else>
                    <i class="i-mynaui-stop-octagon"></i>
                </div>
            </div>
            <div ref="waveform" class="w-full"></div>
        </div>
    </div>
  </template>
  
  <script setup>
  //import { onMounted, onUnmounted, ref, watch } from 'vue';
  import WaveSurfer from 'wavesurfer.js';

  const props = defineProps({
    file: {
      type: String,
      required: true
    }
  });
  
  const isplaying = ref(false)
  const waveform = ref(null);
  let wavesurfer = null;
  
  onMounted(() => {
    wavesurfer = WaveSurfer.create({
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

    wavesurfer.setVolume(0.7);


   
  
    if (props.file) {
        wavesurfer.load('audios/'+props.file);
        wavesurfer.on('click', () => {
            wavesurfer.play()
            isplaying.value = true
        })
        wavesurfer.on('finish', () => {
            isplaying.value = false
        })
    }
  });

  const toggle = () => {
    if(wavesurfer.isPlaying()){
        isplaying.value = false
        wavesurfer.stop()
    } else {
        isplaying.value = true
        wavesurfer.play()
    }

  }
  
  
  </script>
