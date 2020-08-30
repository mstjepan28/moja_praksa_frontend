<template>
<div>
    <vue-flux
        class="row"
        :options="store.vfOptions"
        :images="store.vfImages_partners"
        :transitions="store.vfTransitions"
        ref="slider"
    >
        <template v-slot:preloader> <flux-preloader /> </template>
    </vue-flux>

    <form v-on:submit.prevent="addProject">
        <div v-if="user_data.account_type == 'Admin' && partner_list" class="row mt-4 d-flex justify-content-center">
            <div class="col text-center my-auto"> Pridodajte projekt poslodavcu: </div>

            <select v-model="project_info.company" class="button_design my-auto col ml-2 mr-2" required>
                <option disabled value="Poslodavac"> Poslodavac </option>
                <option :key="partner.id" :value="partner.company" v-for="partner in partner_list"> {{partner.company}} </option>
            </select><hr>
        </div>

        <div class="row d-flex justify-content-center mt-3">
            <h1 class="title">
                <input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="project_info.company" style="text-align: center; width: 100%;" disabled>
            </h1><br>
            
            <textarea placeholder="Kratak opis projekta..." v-model="project_info.project_description" style="text-align: center" required></textarea>

            <div class="mt-3" style="text-align: center;">
                Broj studenata potrebnih za projekt: 
                <input type="number" class="input_wrapper" placeholder="Broj studenata..." v-model="list_size" required>
            </div>
        </div>

        <div class="row">
            <h4 class="subtitles">Kontakt:</h4> 
            <input type="text" class="input_wrapper" placeholder="Kontakt odgovorne osobe za projekt..." v-model="project_info.contact" required>

            <h4 class="subtitles">Tehnologije:</h4> 
            <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="project_info.technologies" required>

            <h4 class="subtitles">Preference:</h4> 
            <input type="text" class="input_wrapper" placeholder="Preference za osobe koje bi obavljale projekt..." v-model="project_info.preferences" required>

            <h4 class="subtitles">Potrebno imati:</h4> 
            <input type="text" class="input_wrapper" placeholder="Potrebno znannje ili oprema za izvršavanje projekta..." v-model="project_info.requirements" required>

            <h4 class="subtitles">Trajanje:</h4> 
            <input type="text" class="input_wrapper" placeholder="Vremensko trajanje projekta..." v-model="project_info.duration" required>

            <h4 class="subtitles">Lokacija:</h4> 
            <input type="text" class="input_wrapper" placeholder="Lokacija za izvršavanje projekta..." v-model="project_info.location" required>

            <h4 class="subtitles">Napomena:</h4> 
            <textarea placeholder="Napomena vezana za projekt..." v-model="project_info.note"></textarea>
        </div>

        <div class="row mt-3 d-flex justify-content-center">
            <div class="col-md-2 col-sm-0"></div>
            <button type="submit" class="button_design col ml-2 mr-2"> Dodaj projekt </button>
            <div class="col-md-2 col-sm-0"></div>
        </div>
    </form>

</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';
import { Projects, Partners, Auth } from '@/services'
import store from '@/store.js';

export default {
	components: { VueFlux, FluxPreloader},
	data(){
		return{
			store,
            user_data: Auth.state.user_data, 

            selectedPartner: undefined,
            partnerId: undefined,
            partner_list: false,

            list_size:  undefined,
            project_info: { company: undefined },
		}
    },
    methods:{
        // Stvori polje u koje ce se pohranjivati id alociranog studenta te pohrani projekt u bazu
        async uploadProject(){
            this.project_info.allocated_to = new Array(parseInt(this.list_size)).fill(false);
            return await Projects.AddProject(this.project_info, this.partnerId);
        },
        getPartnerId(){
             this.partnerId = this.partner_list.filter(partner => partner.company == this.project_info.company)[0].id;
             this.project_info.created_by_admin = true;
        },
        // Dodaj projekt u bazu te ako je uspješno dodan izbriši unesene podatke i update-aj lokalnu listu projekata
        async addProject(){
            if(!this.partnerId) this.getPartnerId();
            const result = await this.uploadProject();

            console.log(result);

            if(!result) return;
            
            this.project_info = { company: undefined },
            this.store.project_list = await Projects.getProjects();
            
            this.$router.push({ name: 'Projects' });
            
        },

        // Dohvati sve podslodavce koje je stvorio admin da bi im se dodijelio novi projekt
        async getPartners(){
			if(!this.store.partner_list) this.store.partner_list = await Partners.getPartners();
			this.partner_list = this.store.partner_list.filter(partner => partner.created_by_admin);
        },
        setProjectInfoAdmin(){
            console.log(123, this.partnerId)
        },

        // Postavi id i ime poslodavca ukoliko on dodaje projekt
        setProjectInfo(){
            this.project_info.company = this.user_data.company;
            this.partnerId = this.user_data._id;
        }
    },
    // Samo admin i poslodavac imaju pristup, ovisno o prijavljenoj osobi poziva se funkcija
    mounted(){
        const account = this.user_data.account_type;
        if(!(account == "Poslodavac" || account == "Admin")) this.$router.push({ name: 'Home' });

        if(account == "Admin") 
            this.getPartners();
        else if(account == 'Poslodavac') 
            this.setInfo()
    }

}
</script>

<style>
.selectPartner{ margin-top: 1rem }
.selectPartner > select{ 
    width: 50%;
}
.selectPartner > select > option{
    padding: 6px;
    margin-top: 10px;
    font-size: 13px;
}
</style>