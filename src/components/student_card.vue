<template>
<div class="row h-100 mt-5 mr-5 ml-5 card_body">
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

    <div class="w-100"></div>

    <div class="col-md-4 col-sm-12 mb-3 d-flex justify-content-center">
        <button v-if="info.selected_projects" class="button_design"> Odabrani projekti </button>
        <button v-else class="disabled_button" disabled> Odabrani projekti </button>
    </div>
    <div class="col-md-4 col-sm-12 mb-3 d-flex justify-content-center">
        <button v-if="info.application" class="button_design"> Prijavnica </button>
        <button v-else class="disabled_button" disabled> Prijavnica </button>
    </div>
    <div class="col-md-4 col-sm-12 mb-3 d-flex justify-content-center">
        <button v-if="info.journal" class="button_design"> Dnevnik prakse </button>
        <button v-else class="disabled_button" disabled> Dnevnik prakse </button>
    </div>
</div>
</template>

<script>
export default {
    props: ['info'],
    data(){
        return{

        }
    },
    mounted(){

    }
}
</script>

<style>
.card_body{
    padding-top: 5%;
    border: 2px solid #6DD0F6;
}
</style>