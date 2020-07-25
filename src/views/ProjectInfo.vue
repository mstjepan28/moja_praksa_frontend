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


	
	<div v-if="edit_enabled">
		<div class="row option_buttons">
			<div class="col-md-8" style="background: red"></div>
			<div class="col-md-4" style="background: blue">
				<button type="button" class="button_design" v-on:click="switch_edit"> Pohrani promjene </button>
				<button type="button" class="disabled_button" v-on:click="switch_edit"> Odustani </button>
			</div>
		</div>

		<div class="row">

		</div>
	</div>

	<div v-else>
		<div class="row option_buttons">
			<div class="col-md-11"></div>
			<div class="col-md-1">
				<button type="button" class="button_design" v-on:click="switch_edit"> Uredi </button>
			</div>
		</div>

		<div class="row">
			<!--
			<h4 class="subtitles">Opis projekta:</h4> {{project_info.project_description}}

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
	</div>
	


	<!-- -->
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
			project_info: false,
			edit_enabled: false
		}
	},
	methods:{
		async get_project_info(){
			//this.project_info = await Projects.getOneProject(); // Treba backend ruta

			// Privremeno
			const projects = await Projects.getProjects(); 
			this.project_info = projects.filter(project => project.id == this.id)[0]	
		},
		switch_edit(){
			if(this.edit_enabled) this.edit_enabled = false;
			else this.edit_enabled = true
		},
		update_project(){

		}
	},
	mounted(){
		this.get_project_info()
	}
}
</script>

<style>

</style>