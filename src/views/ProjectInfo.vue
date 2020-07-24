<template>
<div v-if="project_info">
	<vue-flux
		class="row"
		:options="store.vfOptions"
		:images="store.vfImages_partners"
		:transitions="store.vfTransitions"
		ref="slider"
	>
		<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>
	
	<h4 class="subtitles">Opis projekta:</h4> {{project_info.project_description}}
	
	<!--
	<h4 class="subtitles">Naziv poduzeća:</h4> {{project_info.company}}
	
	<h4 class="subtitles">Kontakt osoba:</h4> {{project_info}}
	
	<h4 class="subtitles">Opis projekta:</h4> {{project_info.project_description}}

	<h4 class="subtitles">Tehnologije</h4> {{project_info}}

	<h4 class="subtitles">Preference</h4> {{project_info}}

	<h4 class="subtitles">Potrebno imati:</h4> {{project_info}}

	<h4 class="subtitles">Trajanje:</h4> {{project_info}}

	<h4 class="subtitles">Lokacija:</h4> {{project_info}}

	<h4 class="subtitles">Napomena:</h4> {{project_info}}
	-->
</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';
import { Projects } from '@/services'
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,
	},
	data(){
		return{
			store,

			id: this.$route.params.id,
			project_info: false
		}
	},
	methods:{
		async get_project_info(){
			//this.project_info = await Projects.getOneProject(); // Treba backend ruta

			// Privremeno
			const projects = await Projects.getProjects(); 
			this.project_info = projects.filter(project => project.id == this.id)[0]	
		}

	},
	mounted(){
		this.get_project_info()
	}
}
</script>

<style>
</style>