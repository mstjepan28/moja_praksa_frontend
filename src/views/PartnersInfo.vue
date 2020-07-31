<template>
<div v-if="partners_info && authenticated">
	<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modal title</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<p>Modal body text goes here.</p>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary">Save changes</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<p>Nastavite s brisanjem?</p>
				</div>

				<div class="modal-footer">
					<button type="button" class="alert_button">Izbriši</button>
					<button type="button" class="button_design" data-dismiss="modal">Odustani</button>
				</div>
			</div>
		</div>
	</div>

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
		<div class="row option_buttons mt-3">
			<div class="col-md-8"></div>
			<div class="col-md-4">
				<button type="button" class="button_design" v-on:click="switch_edit"> Pohrani promjene </button>
				<button type="button" class="disabled_button" v-on:click="switch_edit"> Odustani </button>
			</div>
		</div>

		<div class="row description">
			<h1 class="title">
				<input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="partners_info.name" style="text-align: center; width: 100%;">
			</h1><br>
			<textarea placeholder="Kratak opis projekta..." v-model="partners_info.description" style="text-align: center"></textarea>
		</div>

		<div class="row">
			<h4 class="subtitles">Tehnologije:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.technology">
		</div>
		
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
			<h4 class="subtitles">Adresa:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.adress">
			<h4 class="subtitles">Kontakt broj:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.telephone_number">
			<h4 class="subtitles">Kontakt email:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.contact_email">
		</div>

		<div class="row contact_buttons">
			<h4 class="subtitles">Kontakt poveznice:</h4>

			<div class="input_wrapper button_design col-md-4 col-sm-12 mt-3">
				<span class="col-6"><i class="fab fa-twitter"></i> Twitter: </span>
				<input type="text" class="col-6" placeholder="http://twitter.com/..." v-model="partners_info.twitter">
			</div>
			<div class="input_wrapper button_design col-md-4 col-sm-12 mt-3">
				<span class="col-6"><i class="fab fa-facebook-f "></i> Facebook: </span>
				<input type="text" class="col-6" placeholder="http://facebook.com/..." v-model="partners_info.facebook">
			</div>
			<div class="input_wrapper button_design col-md-4 col-sm-12 mt-3">
				<span class="col-6"><i class="fas fa-link" style="color: white;"></i> Website: </span>
				<input type="text" class="col-6" placeholder="http://mojastranica.com/..." v-model="partners_info.website">
			</div>
		</div>
	</div>

	<div v-else>
		<div class="row option_buttons mt-3">
			<div class="col-md-8"></div>
			<div class="col-md-4">
				<button type="button" class="button_design" v-on:click="switch_edit"> Uredi </button>
			</div>
		</div>

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
			<h5>Kontakt email:</h5>{{partners_info.contact_email}}
		</div><hr>

		<div class="row" style="text-align: center">
			<div class="contacts">
				<a v-if="partners_info.twitter" v-bind:href="partners_info.twitter" target="_blank" class="button_design contact_buttons"><i class="fab fa-twitter"></i> Twitter</a>
				<a v-if="partners_info.facebook" v-bind:href="partners_info.facebook" target="_blank" class="button_design contact_buttons"><i class="fab fa-facebook-f"></i> Facebook</a>
				<a v-if="partners_info.website" v-bind:href="partners_info.website" target="_blank" class="button_design contact_buttons"><i class="fas fa-link"></i> Website</a>
			</div>
		</div>
	</div>


</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';
import { VueFlux, FluxPreloader } from 'vue-flux';

import { Partners, Projects } from '@/services'
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
			project_list: false,
			edit_enabled: false
		}
	},
	methods:{
		async get_partner_info(){
			const result = await Partners.getOnePartner(this.$route.params.id);
			this.partners_info = result[0]
		},
		async get_projects(){
			this.project_list = await Projects.getPartnerProjects(this.$route.params.id);
			console.log(this.project_list)
		},
		switch_edit(){
			if(this.edit_enabled) this.edit_enabled = false;
			else this.edit_enabled = true
		},
		authenticated(){
			const a = false
			if(a) this.$router.push({ name: 'Login' })
		}
	},
	mounted(){
		this.authenticated();
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
</style>