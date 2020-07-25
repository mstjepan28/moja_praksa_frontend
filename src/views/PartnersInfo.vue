<template>
<div v-if="partners_info">
	<vue-flux
		class="row"
		:options="store.vfOptions"
		:images="store.vfImages_partners"
		:transitions="store.vfTransitions"
		ref="slider"
	>
		<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>

    <div class="row description">
      <h1 class="title">{{partners_info.name}}</h1><br>
      <p class="description_text">{{partners_info.description}}</p>
    </div><hr>

	<div class="row">
		<h4>Tehnologije:</h4><br>
		{{partners_info.technology}}
	</div><hr>

	<section style="text-align: center;">
		<vue-horizontal-list :items="project_list" :options="store.carousel_options">
			<template v-slot:default="{item}">
				<router-link v-bind:to="'/ProjectInfo/' + item.id" class="card project">
					<img class="card-img-top" v-bind:src="item.img" alt="Card image cap" >
					
					<div class="card-body">
						<h5 class="card-title">{{item.project_name}}</h5>
						<p class="card-text">{{item.project_description}}</p>
					</div>
				</router-link>
			</template>
		</vue-horizontal-list>
	</section><hr>

	<div class="row">
		<h4>Adresa:</h4><br>{{partners_info.adress}}
	</div><hr>

	<div class="row">
		<h5>Kontakt broj:</h5>{{partners_info.telephone_number}}
	</div>
	<div class="row mt-3">
		<h5>Kontakt email:</h5>{{partners_info.telephone_number}}
	</div><hr>

	<div class="row" style="text-align: center">
		<div class="contacts">
			<a v-if="partners_info.twitter" v-bind:href="partners_info.twitter" target="_blank" class="button_design contact_buttons"><i class="fab fa-twitter"></i> Twitter</a>
			<a v-if="partners_info.facebook" v-bind:href="partners_info.facebook" target="_blank" class="button_design contact_buttons"><i class="fab fa-facebook-f"></i> Facebook</a>
			<a v-if="partners_info.website" v-bind:href="partners_info.website" target="_blank" class="button_design contact_buttons"><i class="fas fa-link"></i> Website</a>
		</div>
	</div>
</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';
import { VueFlux, FluxPreloader } from 'vue-flux';

import { Partners, /*Projects*/ } from '@/services'
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,
		VueHorizontalList
	},
	data(){
		return{
			store,

			id: this.$route.params.id,
			partners_info: false,
			project_list: false
		}
	},
	methods:{
		async get_partner_info(){
			//this.project_info = await Partners.getOnePartner(); // Treba backend ruta

			// Privremeno
			const partners = await Partners.getPartners(); 
			this.partners_info = partners.filter(partners => partners.id == this.id)[0]	
		},
		async get_projects(){
			//this.project_list = await Projects.getPartnerProjects(this.partners_info.project_list);

			this.project_list = this.store.project_list//await Projects.getProjects();
		}

	},
	mounted(){
		this.get_partner_info();
		this.get_projects();
	}
}
</script>

<style>
.contacts{
	width: 100%;
	margin: 0 auto;
	display: inline-block;
}

.contact_buttons{
	padding: 0.5% 1%;
	margin: 0 2%;
}

.contact_buttons > .fas{color: white}
.contact_buttons > .fas, .fab{padding: 0 3px;}
</style>