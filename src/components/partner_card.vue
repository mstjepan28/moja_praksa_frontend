<template>
<div class="partner_card row h-100 mb-5">
    <div class="col-md-4" style="padding: 0">
        <img v-if="info.logo" v-bind:src="info.logo.imgUrl" alt="Profilna slika partnera" class="partner_display_image">
        <img v-else src="@/assets/Default.png" alt="Defaultna slika partnea" class="partner_display_image">
    </div>

    <div class="col-md-8 right_col my-auto">
        <div class="row mt-2">
            <h2>{{info.company}}</h2>
        </div>

        <div class="row partner_description mt-2 mb-2">
            <p>{{info.about_us}}</p>
        </div>

        <div class="row mb-1">
            <router-link v-bind:to="'/PartnersInfo/' + info.id" class="button_design custom_button">Detalji</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['info']
}
</script>

<style>
/*-- Card level--*/
.partner_display_image{
    width: 100%;
    height: auto;
    max-height: 300px;
    
    clip-path: polygon(0 0, 100% 0%, 65% 100%, 0% 100%);
}
@media only screen and (max-width: 767px) {
    .partner_card{
        margin: 0 1rem;
    }
    .partner_display_image{
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
}

.partner_card{
    text-align: center;

    overflow: hidden;
    border: 2px solid #636466
}

.right_col{
    padding: 0 20px;
    text-align: left;
}
.right_col > *{
    margin: 0 auto;
    display: inline-block;
}
.right_col > .row{
    width: 100%;
    text-align: center;
}

.partner_description{
    max-height: 120px;
    height: auto;

    margin-top: 2%;

    overflow: hidden;
}
.custom_button{
    width: 80%;
    
    margin-top: 2%;
    margin-bottom: 4%;

    color: white;
}
.custom_button:hover{color:white}
</style>