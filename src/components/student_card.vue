<template>
<div class="row h-100 mt-5 mb-4 mr-md-5 ml-md-5 card_body">
    <div class="col-md-1 col-sm-0"></div>
    <div class="col-md-3 col-sm-12 my-atuo">
        <img v-if="info.avatar" class="profile_img" :src="info.avatar"/>
        <img v-else class="profile_img img-fluid" src="@/assets/Default.png" alt="Your profile picture"/>
    </div>
    <div class="col-md-7 col-sm-12 my-auto student_info">
        <div class="user_info_input_wrapper"><span class="user_info_label">Ime i prezime:</span> {{info.name + " " + info.surname}}</div>
        <div class="user_info_input_wrapper"><span class="user_info_label">JMBAG:</span> {{info.jmbag}}</div>
        <div class="user_info_input_wrapper"><span class="user_info_label">E-Mail:</span> {{info.email}}</div>
        <div class="user_info_input_wrapper"><span class="user_info_label">Tehnologije:</span> {{info.technology}}</div>
        <div class="user_info_input_wrapper"><span class="user_info_label">Godina studija:</span> {{info.year}}</div>
    </div>
    <div class="col-md-1 col-sm-0"></div>

    <div class="w-100 mt-3"></div>

    <div class="col-md-4 col-sm-12 mb-3 button_width text-center">
        <div v-if="info.chosenProjects"> <router-link :to="'/AllocateStudent/' + info.id" class="button_design" style="width: 100%"> Odabrani projekti </router-link> </div>
        <div v-else class="disabled_button" disabled> Odabrani projekti </div>
    </div>
    <div class="col-md-4 col-sm-12 mb-3 button_width text-center">
        <div v-if="info.application"> <router-link :to="'/ApplicationForm/' + info.id" class="button_design" style="width: 100%">Prijavnica</router-link> </div>
        <div v-else class="disabled_button"> Prijavnica </div>
    </div>
    <div class="col-md-4 col-sm-12 mb-3 button_width text-center">
        <div v-if="info.journalID" class="button_design" v-on:click="getJournal" style="width: 100%"> Dnevnik prakse </div>
        <div v-else class="disabled_button"> Dnevnik prakse </div>
    </div>
</div>
</template>

<script>
import { Students } from "@/services/index.js";
export default {
    props: ['info'],
    data(){
        return{

        }
    },
    methods:{
        async getJournal(){
            const journal = await Students.getJournal(this.info.journalID);
            this.downloadJournal(journal);
        },
        downloadJournal(journal){
            // Hanamichi Sakuragi, Morioh.com, 'Download Files with Axios and Vue' https://morioh.com/p/f4d331b62cda
            const fileLink = document.createElement('a');

            fileLink.href = journal.fileData;
            fileLink.setAttribute('download', journal.fileName);
            document.body.appendChild(fileLink);

            fileLink.click();            
        }
    },
    mounted(){

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
</style>