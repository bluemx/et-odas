<template>
    <div class="w-full h-full box-border py-5">

        <!-- //////////////////////////////////// -->
        
        <div class="bg-light text-center grow flex flex-col min-h-full justify-center  mx-auto p-2 md:p-5 w-full box-border" id="trainbox">
            
            
            <section class="max-w-[1200px] w-full md:w-/10 mx-auto my-5 text-left my-auto ">
                <template v-for="(item, index) in oda.odajson">
                    <TrainScene :step="index" v-if="item.block=='scene'" :data="item">
                        <TimerClock :step="index" />                
                        <BlockRenderer :data="item.content" :step="index" :blockid="index.toString()" />
                    </TrainScene>
                </template>

            </section>

            <!--
            <pre class="whitespace-pre-wrap	text-left"><code class="whitespace-pre-wrap">
                {{ JSON.stringify(oda.postmessagedata, null, 2) }}
            </code></pre>
            -->
        </div>

        <TestingBtn></TestingBtn>
        <ContinueLater></ContinueLater>
    </div>
</template>

<script setup>
    import {useOda} from '@/stores/oda'
    const oda = useOda()
    oda.getODA()

    


    async function getOdaData() {

        try {
            const response = await fetch(`ODAS/${oda.id}/oda.json`);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            oda.odajson = json
        } catch (error) {
            console.error(error.message);
        }
    }
    getOdaData()



    
</script>