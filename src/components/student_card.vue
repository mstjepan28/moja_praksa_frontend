<template>
<div class="mt-5 mb-4 mr-md-5 ml-md-5 card_body">
    <div class="row h-100">
        <div class="col-md-1 col-sm-0"></div>

        <div class="col-md-3 col-sm-12 my-auto">
            <img v-if="info.logo" class="card-img-top profile_img" :src="info.logo.imgUrl"/>
            <img v-else class="card-img-top profile_img img-fluid" src="@/assets/Default.png" alt="Your profile picture"/>
        </div>

        <div class="col-md-7 col-sm-12 my-auto student_info">
            <div class="user_info_input_wrapper"><span class="user_info_label">Ime i prezime:</span> {{info.name + " " + info.surname}}</div>
            <div class="user_info_input_wrapper"><span class="user_info_label">JMBAG:</span> {{info.jmbag}}</div>
            <div class="user_info_input_wrapper"><span class="user_info_label">E-Mail:</span> {{info.email}}</div>
            <div class="user_info_input_wrapper"><span class="user_info_label">Tehnologije:</span> {{info.technology}}</div>
            <div class="user_info_input_wrapper"><span class="user_info_label">Godina studija:</span> {{info.year}}</div>
        </div>

        <div class="col-md-1 col-sm-0"></div>

    </div>

    <div class="w-100 mt-3"></div>

    <div class="row h-100" v-if="$route.path == '/Students'">
        <div class="col-md-1 col-sm-12"></div>

        <div class="col-md-5 col-sm-12 mb-3 button_width text-center">
            <div v-if="info.application"> <router-link :to="'/ApplicationForm/' + info.id" class="button_design" style="width: 100%">Prijavnica</router-link> </div>
            <div v-else class="disabled_button"> Prijavnica </div>
        </div>

        <div class="col-md-5 col-sm-12 mb-3 button_width text-center">
            <div v-if="info.journalID" class="button_design" v-on:click="downloadJournal" style="width: 100%"> Dnevnik prakse </div>
            <div v-else class="disabled_button"> Dnevnik prakse </div>
        </div>

        <div class="col-md-1 col-sm-12"></div>
    </div>
</div>
</template>

<script>

import { Students } from "@/services/index.js";
import store from '@/store.js';

export default {
    props: ['info'],
    data(){
        return{
            store
        }
    },
    methods:{
        async downloadJournal(){
            const journal = await Students.getJournal(this.info.journalID);
            this.store.downloadFile(journal);
        }
    }
}
</script>

<style>
.card_body{
    padding-top: 1%;
    border: 4px solid #6DD0F6;
}
.button_width > div{
    width: 100%;
}
@media only screen and (max-width: 767px) {
	.student_info{
        text-align: center;
    }
}
</style>