<template>
<div>
    <div v-if="state == 'write'">
        <div class="row d-flex justify-content-center">
            <h4 class="col mt-3 "> Napšite vaše dojmove sa prakse: </h4>
        </div>

        <div class="row text-center">
            <textarea v-model="review" class="col mt-3" style="height: 10rem; padding: 6px" placeholder="Ukratno opišite svoje doživljaje tijekom obavljanja prakse"></textarea>
        </div>

        <div class="row d-flex justify-content-center">
            <div v-if="review" class="col mt-3 ml-2 mr-2 alert_button" v-on:click="sendReview">Pošalji</div>
            <div v-else class="col mt-3 ml-2 mr-2 disabled_button">Pošalji</div>

            <div class="col mt-3 ml-2 mr-2 button_design" v-on:click="$emit('closeReview')">Preskoći</div>
            
        </div>
    </div>

    <div v-if="state == 'sent'">
        <div>
            <h4 class="col mt-3 ">Vaši dojmovi su zabilježeni</h4>
            dojmove ostalih studenata pročitajte<button class="ModalGoto" v-on:click="$emit('gotoTable')">ovdje</button>            
        </div>

        <div class="row mt-3">
            <button type="button" class="col ml-5 mr-5 d-flex justify-content-center button_design" v-on:click="$emit('closeReview')"> Uredu </button>
        </div>
    </div>
</div>
</template>

<script>

import {Auth, App} from "@/services/index.js";

export default {
    data(){
        return{
            review: undefined,
            state: 'write',
        }
    },
    methods:{
        async sendReview(){
            let user = Auth.state.user_data;
            user.review = this.review;

            const result = await App.updateUser(user, true);
            console.log(result);

            this.state = 'sent';
        }
    }
}
</script>