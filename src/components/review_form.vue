<template>
<div>
    <div v-if="state == 'write'">
        <div class="row d-flex justify-content-center">
            <h4 class="col mt-3 "> Napšite vaše dojmove sa prakse: </h4>
        </div>

        <div class="row text-center">
            <textarea v-model="review" class="col mt-3" style="height: 10rem"></textarea>
        </div>

        <div class="row d-flex justify-content-center">
            <div v-if="review" class="col mt-3 ml-2 mr-2 alert_button" v-on:click="state = 'confirm'">Pošalji</div>
            <div v-else class="col mt-3 ml-2 mr-2 disabled_button">Pošalji</div>

            <div class="col mt-3 ml-2 mr-2 button_design" data-dismiss="modal">Preskoći</div>
        </div>
    </div>
    <div v-if="state == 'confirm'">
        <div class="row d-flex justify-content-center">
            <h4 class="col mt-3 "> Potvrdite slanje : </h4>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col mt-3 ml-2 mr-2 alert_button">Potvrdi</div>
            <div class="col mt-3 ml-2 mr-2 disabled_button" data-dismiss="modal">Odustani</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            review: undefined,
            state: 'write',

        }
    }
}
</script>

<style>

</style>