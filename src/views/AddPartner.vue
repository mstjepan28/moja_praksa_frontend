<template>
<form v-on:submit.prevent="addPartner">
    <div class="row text-center">
        <h1 class="title">
            <input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="partners_info.company" style="text-align: center; width: 100%;" required>
        </h1><br>
        <textarea placeholder="Kratak opis poduzeća..." v-model="partners_info.about_us" style="text-align: center" required></textarea>
    </div>

    <div class="row">
        <h4 class="subtitles">Tehnologije:</h4>
        <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.technology" required>
    </div>

    <div class="row">
        <h4 class="subtitles">Adresa:</h4> <input type="text" class="input_wrapper" placeholder="Mjesto gdje će student obavljati praksu..." v-model="partners_info.adress" required>
        <h4 class="subtitles">Broj telefona:</h4> <input type="text" class="input_wrapper" placeholder="Na koji vas student može kontaktirati..." v-model="partners_info.telephone_number" required>
        <h4 class="subtitles">Email adresa:</h4> <input type="text" class="input_wrapper" placeholder="Na koju će vas student kontaktirati..." v-model="partners_info.contact_email" required>
    </div>

    <div class="row">
        <h4 class="subtitles">Kontakt poveznice:</h4>

        <div class="col-md-2 col-sm-0"></div>
        <div class="col-md-8 col-sm-12" style="user-select: none">

            <div class="input_wrapper button_design col-12 mt-3" style="overflow: hidden">
                <span class="col-md-2"><i class="fab fa-twitter"></i> Twitter: </span>
                <input type="text" class="col-md-10" placeholder="http://twitter.com/..." v-model="partners_info.twitter">
            </div>

            <div class="input_wrapper button_design col-12 mt-3" style="overflow: hidden">
                <span class="col-md-2"><i class="fab fa-facebook-f "></i> Facebook: </span>
                <input type="text" class="col-md-10" placeholder="http://facebook.com/..." v-model="partners_info.facebook">
            </div>

            <div class="input_wrapper button_design col-12 mt-3" style="overflow: hidden">
                <span class="col-md-2"><i class="fas fa-link" style="color: white;"></i> Website: </span>
                <input type="text" class="col-md-10" placeholder="http://mojastranica.com/..." v-model="partners_info.website">
            </div>

        </div>
        <div class="col-md-2 col-sm-0"></div>
    </div><hr>

    <div class="row d-flex justify-content-center">
        <div class="col-md-2 col-sm-0"></div>
        <button type="submit" class="button_design col ml-2 mr-2"> Dodaj partnera </button>
        <div class="col-md-2 col-sm-0"></div>
    </div>
</form>
</template>

<script>
import { Auth, Partners } from '@/services/index.js';
export default {
    data(){
        return{
            partners_info: {}
        }
    },
    methods:{
        async addPartner(){
            this.partners_info.userID = Auth.state.user_data._id;
            await Partners.CreatePartner(this.partners_info);
            await Partners.getPartners();

            this.$router.push({ name: 'Partners' })
        }
    }
}
</script>