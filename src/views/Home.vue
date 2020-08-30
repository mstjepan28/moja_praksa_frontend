<template>
<div>
	<vue-flux
		class="row"
		:options="store.vfOptions"
		:images="store.vfImages_home"
		:transitions="store.vfTransitions"
		ref="slider"
	>
		<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>

	<div class="row description">
		<h1 class="title">Moja Praksa</h1><br>
		<p class="description_text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
			Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
			Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
			Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
		</p>
	</div><hr>

	<div class="row h-100">
		<div class="col-md-7 col-sm-12 my-auto">
			<img v-bind:src="partner_image" class="img-fluid" alt="Responsive image" stlyle="height: 18rem;">
		</div>

		<div class="col-md-5 col-sm-12  my-auto text-center">
			<h2>Naši partneri:</h2>
			<PartnerButton v-bind:key="partner._id" v-bind:info="partner" v-for="partner in partner_list"/><br>
			<router-link to="/Partners" class="button_design" style="width: 100%">Prikaži sve</router-link>
		</div>
	</div><hr>

	<div class="row" style="text-align: center;">
		<ProjectCard v-bind:key="project.id" v-bind:info="project" v-for="project in project_list"/>
	</div>

	<div class="row">
		<div class="col-md-4 col-sm-0"></div>
		<router-link to="/Projects" class="col button_design text-center" style="widht: 75%;">Prikaži sve</router-link>
		<div class="col-md-4 col-sm-0"></div>
	</div>
	
</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';

import ProjectCard from '@/components/project_card';
import PartnerButton from '@/components/partner_button';
import store from '@/store.js';
import { Projects, Partners } from '@/services'

export default {
	components: {
		VueFlux,
		FluxPreloader,

		ProjectCard,
		PartnerButton,
	},

	data(){
		return{
			store,
			about_us: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. Praesent vel odio mauris",
			partner_image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",

			partner_list: false,
			project_list: false,
		}
	},
	methods:{
		async get_projects(){
			if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
			this.project_list = this.store.project_list.slice(0, 3)
		},

		async get_partner(){
			if(!this.store.partner_list) this.store.partner_list = await Partners.getPartners();
			this.partner_list = this.store.partner_list.slice(0, 4)   
		}
	},
	async mounted(){
		this.get_partner();
		this.get_projects();
	},
	name: 'Home'
}
</script>

<style scoped>
.col-sm-12{margin-top: 3%;}

.col-7, .col-5{padding: 0}
</style>
