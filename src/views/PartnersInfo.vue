<template>
<div v-if="partners_info">
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
		ref="slider">
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

		<div class="row">
			<h4 class="subtitles">Projekti:</h4>
		</div>
		<div v-if="project_list">
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
		</div>
		<div v-else class="no_info_message no_projects_message">
			<span>Vaši projekti će se prikazivati ovdje</span><br>
			<router-link to="/AddProject">Dodajte novi projekt ovdje</router-link>
		</div>


		<div class="row">
			<h4 class="subtitles">Adresa:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.adress">
			<h4 class="subtitles">Broj telefona:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.telephone_number">
			<h4 class="subtitles">Email adresa:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.contact_email">
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
			<h1 class="title">{{partners_info.company}}</h1><br>
			<p class="description_text">{{partners_info.about_us}}</p>
		</div><hr>

		<div class="row">
			<h4 class="subtitles">Tehnologije: {{partners_info.technology}}</h4>
		</div>
		
		<div class="row">
			<h4 class="subtitles">Projekti:</h4>
		</div>
		<div v-if="project_list">
			<section style="text-align: center;">
				<vue-horizontal-list :items="project_list" :options="store.carousel_options">
					<template v-slot:default="{item}">
						<router-link v-bind:to="'/ProjectInfo/' + item.id" class="card project">
							<img class="card-img-top" v-bind:src="item.img_url" alt="Card image cap" >
							
							<div class="card-body">
								<h5 class="card-title">{{item.company}}</h5>
								<p class="card-text">{{item.project_description}}</p>
							</div>
						</router-link>
					</template>
				</vue-horizontal-list>
			</section><hr>			
		</div>
		<div v-else class="no_info_message no_projects_message">
			<span>Vaši projekti će se prikazivati ovdje</span><br>
			<router-link to="/AddProject">Dodajte novi projekt ovdje</router-link>
		</div>

		<div class="row">
			<h4 class="subtitles">Adresa: {{partners_info.adress}}</h4>
		</div>

		<div class="row">
			<h4 class="subtitles">Kontakti:</h4>
		</div>
		
		<div class="row" style="text-align: center">
			<div class="col"><h5>Broj telefona: {{partners_info.telephone_number}}</h5></div>
			<div class="col"><h5>Email adresa: {{partners_info.contact_email}}</h5></div>
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

import { Partners, Projects, Auth } from '@/services'
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
			if(this.store.partner_list)
				this.partners_info = this.store.partner_list.filter(partner => partner.id == this.id)[0];
			else{
				const result = await Partners.getOnePartner(this.id);
				this.partners_info = result[0]		
				console.log(this.partners_info)		
			}
		},
		async get_projects(){
			this.project_list = await Projects.getPartnerProjects(this.id);
		},
		switch_edit(){
			if(this.edit_enabled) this.edit_enabled = false;
			else this.edit_enabled = true
		}
	},
	mounted(){
		if(Auth.isAuthenticated()){
			this.get_partner_info();
			this.get_projects();			
		}
		else this.$router.push({ name: 'Login' })
	}
}
</script>

<style>
.contacts{
	width: 100%;
	margin: 0 auto;
	display: inline-block;
}
.no_projects_message{
	text-align: center;

	margin: 2%;
	padding: 5% 0; 

	border: solid 2px #6DD0F6;
	background: rgb(245, 245, 245);
}
</style>