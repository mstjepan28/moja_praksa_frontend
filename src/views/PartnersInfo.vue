<template>
<div v-if="partners_info">
    <div class="modal fade" id="deletePartner" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <form class="modal-content" v-on:submit.prevent="delete_partner">
            
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Upišite vašu lozinku za potvrdu brisanja</h5>
                </div>

                <div class="modal-body text-center">
					<input v-model="current_password" type="password" placeholder="Upišite lozinku..." class="application_input" required>
					<small style="color: red">Ako izbrišete nastavite sa brisanjem, izbrisat će se svi vezani projekti!</small>
                </div>

                <div class="modal-footer">
                    <button type="button" class="disabled_button" data-dismiss="modal">Zatvori</button>
                    <button type="submit" class="alert_button"> Izbriši moj račun </button>
                </div>

            </form>
        </div>
    </div>

    <div class="modal fade" id="galleryEditorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">
					<GalleyEditor :info="partners_info" v-on:close_gallery="close_gallery" v-on:updateHeaders="getPartnerInfo"/>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="change_password_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Promjena lozinke</h5>
                </div>
                <form v-on:submit.prevent="change_password">
                    <div class="modal-body">
                        <input v-model="current_password"  type="password" placeholder="Dosadašnja lozinka..." class="application_input" required><hr>

                        <input v-model="new_password" type="password" placeholder="Nova lozinka..." class="application_input" required>
                        <input v-model="confirm_password" type="password" placeholder="Potvrite novu lozinku..." class="application_input mt-2" required>
                    </div>

                    <div class="d-flex justify-content-center" style="widht: 100%">
                        <small v-if="error_message" style="color: red">{{error_message}}</small>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="disabled_button" data-dismiss="modal">Zatvori</button>
                        <button type="submit" class="button_design" > Promjeni lozinku </button>
                    </div>
                </form>

            </div>
        </div>
    </div>

    <div class="modal fade" id="error_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Došlo je do greške!</h5>
                </div>

                <div class="modal-body">
                    <h4>{{modal_error}}</h4>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="button_design" data-dismiss="modal">Uredu</button>
                </div>
            </div>
        </div>
    </div>

	<vue-flux
		class="row"
		:options="store.vfOptions"
		:images="partner_headers" 
		:transitions="store.vfTransitions"
		ref="slider">
		<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>

	<div v-if="edit_enabled">
		<div class="row option_buttons mt-3">
			<div class="col text-right">
				<button type="button" class="disabled_button mr-3" v-on:click="edit_enabled = !edit_enabled"> Odustani </button>
				<button type="button" class="button_design mr-3" data-toggle="modal" data-target="#galleryEditorModal"> Galerija </button>
				<button type="button" class="alert_button" v-on:click="update_partner"> Pohrani promjene </button>
			</div>
		</div>

		<div class="row text-center">
			<h1 class="title">
				<input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="partners_info.company" style="text-align: center; width: 100%;" required>
			</h1><br>
			<textarea placeholder="Kratak opis poduzeća..." v-model="partners_info.about_us" style="text-align: center" required></textarea>
		</div>

		<div class="row">
			<h4 class="subtitles">Tehnologije:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="partners_info.technology">
		</div>

		<div class="row">
			<h4 class="subtitles">Projekti:</h4>
		</div>
		<div v-if="project_list">
			<section class="text-center">
				<vue-horizontal-list :items="project_list" :options="store.carousel_options">
					<template v-slot:default="{item}">
						<router-link v-bind:to="'/ProjectInfo/' + item.id" class="card project">
							<img v-if="item.logo" class="card-img-top" :src="item.logo.imgUrl" alt="Card image cap" >
							<img v-else class="card-img-top" src="../assets/fallBackProject.jpg" alt="Card image cap" >
							
							<div class="card-body">
								<h5 class="card-title">{{item.project_company}}</h5>
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
			<h4 class="subtitles">Adresa:</h4> 
			<input type="text" class="input_wrapper" placeholder="Mjesto gdje će student obavljati praksu..." v-model="partners_info.adress" required>
			
			<h4 class="subtitles">Broj telefona:</h4> 
			<input type="text" class="input_wrapper" placeholder="Na koji vas student može kontaktirati..." v-model="partners_info.telephone_number" required>
			
			<h4 class="subtitles">Email adresa:</h4> 
			<input type="text" class="input_wrapper" placeholder="Na koju će vas student kontaktirati..." v-model="partners_info.contact_email" required>
		</div>

		<div class="row">
			<h4 class="subtitles">Kontakt poveznice:</h4>

			<div class="col-md-2 col-sm-0"></div>
			<div class="col-md-8 col-sm-12">

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

        <div class="mt-3 d-flex justify-content-center">
            <button v-if="user_data.account_type != 'Admin'" style="color: #6DD0F6; font-weight: bold" data-toggle="modal" data-target="#change_password_modal"> Promjeni lozniku </button>
            <button style="color: red; font-weight: bold" data-toggle="modal" data-target="#deletePartner"> Izbriši moj račun </button>
        </div>
	</div>

	<div v-else>
		<div v-if="isOwner" class="row option_buttons mt-3">
			<div class="col text-right">
				<button type="button" class="button_design mr-3" v-on:click="edit_enabled = !edit_enabled"> Uredi </button>
			</div>
		</div>

		<div class="row text-center">
			<h1 class="title" style="margin-top: 0">{{partners_info.company}}</h1><br>
			<p class="description_text">{{partners_info.about_us}}</p>
		</div><hr>

		<div class="row">
			<small class="col text-center views"><i class="fas fa-eye"></i> Posjećenost: {{partners_info.views}}</small> 
		</div><hr>

		<div class="row">
			<h4 class="subtitles">Tehnologije: {{partners_info.technology}}</h4>
		</div>
		
		<div class="row">
			<h4 class="subtitles">Projekti:</h4>
		</div>

		<div v-if="project_list">
			<section class="text-center">
				<vue-horizontal-list :items="project_list" :options="store.carousel_options">
					<template v-slot:default="{item}">
						<router-link v-bind:to="'/ProjectInfo/' + item._id" class="card project">
							<img v-if="item.logo" class="card-img-top" :src="item.logo.imgUrl" alt="Card image cap" >
							<img v-else class="card-img-top" src="../assets/fallBackProject.jpg" alt="Card image cap" >
							
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
			<span> {{partners_info.company}} trenutno nema projekata </span>
		</div>

		<div class="row">
			<h4 class="subtitles">Adresa: {{partners_info.adress}}</h4>
		</div>

		<div class="row">
			<h4 class="subtitles">Kontakti:</h4>
		</div>
		
		<div class="row">
			<div class="col-md-6 col-sm-12 text-center"><h5>Broj telefona: {{partners_info.telephone_number}}</h5></div>
			<div class="col-md-6 col-sm-12 text-center"><h5>Email adresa: {{partners_info.contact_email}}</h5></div>
		</div><hr>

		<div class="row col text-center">
			<div class="col">
				<a v-if="partners_info.twitter" :href="partners_info.twitter" target="_blank" class="mt-2 mr-2 ml-2 button_design" style="white-space: nowrap;">
					<i class="fab fa-twitter"></i> Twitter
				</a>

				<a v-if="partners_info.facebook" :href="partners_info.facebook" target="_blank" class="mt-2 mr-2 ml-2 button_design" style="white-space: nowrap;">
					<i class="fab fa-facebook-f"></i> Facebook
				</a>

				<a v-if="partners_info.website" :href="partners_info.website" target="_blank" class="mt-2 mr-2 ml-2 button_design" style="white-space: nowrap;">
					<i class="fas fa-link" style="color: white;"></i> Website
				</a>
			</div>
		</div>
	</div>


</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';
import { VueFlux, FluxPreloader } from 'vue-flux';

import GalleyEditor from '@/components/gallery_editor';

import { Partners, Projects, Auth } from '@/services'
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,
		VueHorizontalList,

		GalleyEditor
	},
	data(){
		return{
			store,
			id: this.$route.params.id,

			partners_info: false,
			partner_headers: false,
			project_list: false,

			modal_error: false,
			error_message: false,
			edit_enabled: false,
			isOwner: false,

            current_password: undefined,
            new_password: undefined,
			confirm_password: undefined,
			
			user_data: Auth.state.user_data,
		}
	},
	methods:{
		async getPartnerInfo(){
			this.partners_info = await Partners.getOnePartner(this.id);

			this.getHeaders();
			this.getProjects();

			this.checkIfOwner();
			this.addView();
		},
		getHeaders(){
			if(!this.partners_info.headers) this.partner_headers = this.store.vfImages_partners;
			else this.partner_headers = this.partners_info.headers.map(img => img.imgUrl)
		},
		async getProjects(){
			let projects = await Projects.getPartnerProjects(this.id);

			if(projects.length == 0) projects = false;
			this.project_list = projects;
		},
		checkIfOwner(){
			if(this.user_data._id == this.id)
				this.isOwner = true;
			
			else if(this.user_data.account_type == "Admin" && this.partners_info.created_by_admin)
				this.isOwner = true;
		},
		async addView(){
			if(this.isOwner) return;

			this.partners_info.views++;

			await Partners.addPartnerView({
				'_id': this.id,
				'views': this.partners_info.views,
				'collectionName' : 'partners'
			});
		},
		

		async update_partner(){
			const response = Partners.UpdatePartner(this.partners_info, this.id, true);

			if(!response) return;

			this.store.partner_list = await Partners.getPartners();
			this.edit_enabled = false;
		},

		async delete_partner(){
			$('#deletePartner').modal('hide');
			if(this.user_data.account_type == 'Admin') this.partners_info.account_type = 'Admin'
			this.partners_info.password = this.current_password
		
			const response = await Partners.UpdatePartner(this.partners_info, this.id, false);
			
			if(!response){
				this.modal_error = "Došlo je do greške prilikom brisanja";
				$('#error_modal').modal('show');

				return;
			}

			this.store.partner_list = await Partners.getPartners();
			
			if(this.user_data.account_type == "Poslodavac"){
				Auth.logout();
				this.$router.push({ name: 'Login' });
			}
			else this.$router.push({ name: 'Partners' });
		},

        passwordCheck(){
            if(this.current_password == this.new_password){
                this.error_message = "Nova lozinka mora biti različita od dosadašnje";
                return false;
            }
            if(this.new_password != this.confirm_password){
                this.error_message = "Ponovno upisana lozinka se ne podudara";
                return false; 
            }
            return true;
		},
		
        async change_password(){
            if(!this.passwordCheck()) return;
            $('#change_password_modal').modal('hide')
            
			const result = await Auth.changePassword({'oldPassword': this.current_password, 'newPassword': this.new_password});
			
            if(!result){
                this.modal_error = "Prilikom pokušaja promjene lozinke došlo je do greške";
                $('#error_modal').modal('show')
            }

            this.current_password = this.new_password = this.confirm_password = undefined;
            this.edit_enabled = false;
		},

		close_gallery(){
			$('#galleryEditorModal').modal('hide');
		}
	},
	mounted(){
		if(Auth.isAuthenticated())
			this.getPartnerInfo();
		else 
			this.$router.push({ name: 'Login' })
	},
	watch: {
		'$route.params.id': function(id){
			if(Auth.isAuthenticated()){
				this.id = id;
				this.getPartnerInfo();
			}
			else
				this.$router.push({ name: 'Login' })
		}
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