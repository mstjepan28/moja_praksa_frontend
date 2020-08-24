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
        <div class="row d-flex justify-content-center mt-3">
            <h1 class="title">
                <input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="project_info.company" style="text-align: center; width: 100%;" required>
            </h1><br>
            
            <textarea placeholder="Kratak opis projekta..." v-model="project_info.project_description" style="text-align: center" required></textarea>

            <div class="mt-3" style="text-align: center;">Broj studenata potrebnih za projekt: <input type="number" class="input_wrapper" placeholder="Broj studenata..." v-model="list_size" required></div>
        </div>

        <div class="row">
            <h4 class="subtitles">Kontakt:</h4> <input type="text" class="input_wrapper" placeholder="Kontakt odgovorne osobe za projekt..." v-model="project_info.contact" required>

            <h4 class="subtitles">Tehnologije:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="project_info.technologies" required>

            <h4 class="subtitles">Preference:</h4> <input type="text" class="input_wrapper" placeholder="Preference za osobe koje bi obavljale projekt..." v-model="project_info.preferences" required>

            <h4 class="subtitles">Potrebno imati:</h4> <input type="text" class="input_wrapper" placeholder="Potrebno znannje ili oprema za izvršavanje projekta..." v-model="project_info.requirements" required>

            <h4 class="subtitles">Trajanje:</h4> <input type="text" class="input_wrapper" placeholder="Vremensko trajanje projekta..." v-model="project_info.duration" required>

            <h4 class="subtitles">Lokacija:</h4> <input type="text" class="input_wrapper" placeholder="Lokacija za izvršavanje projekta..." v-model="project_info.location" required>

            <h4 class="subtitles">Napomena:</h4> <textarea placeholder="Napomena vezana za projekt..." v-model="project_info.note"></textarea>
        </div>

        <div class="row mt-3" style="text-align: center">
            <button type="submit" class="button_design" style="display: inline-block; margin: 0 auto;"> Dodaj projekt </button>
        </div>    
    </form>

</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';
import { Projects, Auth } from '@/services'
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,
	},
	data(){
		return{
			store,
            auth: Auth.state, 
            
            project_info: {},
            list_size:  null,
		}
    },
    methods:{
        createList(){
            this.project_info.allocated_to = new Array(parseInt(this.list_size)).fill(false);
        },
		async updateLocal(){
            if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
            this.store.project_list.push(this.project_info);
		},
        async addProject(){
            this.createList();
            const user_data = Auth.getUser();
            const result = await Projects.AddProject(this.project_info, user_data._id);
            console.log(result);

            if(result){
                this.updateLocal();
                this.project_info = {}
                this.$router.push({ name: 'Projects' });
            }
        },
    },
    mounted(){
        const user_type = this.auth.account_type;
        if(!(user_type == "Company" || user_type == "Admin")) console.log("No access")//this.$router.push({ name: 'Home' });
    }

}
</script>

<style>

</style>