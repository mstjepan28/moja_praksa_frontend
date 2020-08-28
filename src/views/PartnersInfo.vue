<template>
<div v-if="partners_info">
    <div class="modal fade" id="deletePartner" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Upišite vašu lozinku za potvrdu brisanja</h5>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="form-group application_form_element">
                            <input v-model="current_password" type="password" placeholder="Upišite lozinku..." class="application_input" required>
                        </div>
                    </form>

                </div>

                <div class="modal-footer">
                    <button type="button" class="disabled_button" data-dismiss="modal">Zatvori</button>
                    <button v-on:click="delete_partner" type="button" class="alert_button" data-dismiss="modal"> Izbriši moj račun </button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="galleryEditorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">
					<GalleyEditor :info="partners_info" v-on:close_gallery="close_gallery" v-on:updateHeaders="get_partner_info"/>
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
				<input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="partners_info.company" style="text-align: center; width: 100%;">
			</h1><br>
			<textarea placeholder="Kratak opis poduzeća..." v-model="partners_info.about_us" style="text-align: center"></textarea>
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
							<img class="card-img-top" v-bind:src="item.img_url" alt="Card image cap" >
							
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
			<h4 class="subtitles">Adresa:</h4> <input type="text" class="input_wrapper" placeholder="Mjesto gdje će student obavljati praksu..." v-model="partners_info.adress">
			<h4 class="subtitles">Broj telefona:</h4> <input type="text" class="input_wrapper" placeholder="Na koji vas student može kontaktirati..." v-model="partners_info.telephone_number">
			<h4 class="subtitles">Email adresa:</h4> <input type="text" class="input_wrapper" placeholder="Na koju će vas student kontaktirati..." v-model="partners_info.contact_email">
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
		</div><hr>

        <div class="mt-3 d-flex justify-content-center">
            <button style="color: #6DD0F6; font-weight: bold" data-toggle="modal" data-target="#change_password_modal"> Promjeni lozniku </button>
            <button style="color: red; font-weight: bold" data-toggle="modal" data-target="#deletePartner"> Izbriši moj račun </button>
        </div>
	</div>

	<div v-else>
		<div v-if="canEdit" class="row option_buttons mt-3">
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
		
		<div class="row">
			<div class="col-md-6 col-sm-12 text-center"><h5>Broj telefona: {{partners_info.telephone_number}}</h5></div>
			<div class="col-md-6 col-sm-12 text-center"><h5>Email adresa: {{partners_info.contact_email}}</h5></div>
		</div><hr>

		<div class="row" style="text-align: center">
			<div class="contacts">
				<a v-if="partners_info.twitter" v-bind:href="partners_info.twitter" target="_blank" class="button_design contact_buttons"><i class="fab fa-twitter"></i> Twitter</a>
				<a v-if="partners_info.facebook" v-bind:href="partners_info.facebook" target="_blank" class="button_design contact_buttons"><i class="fab fa-facebook-f"></i> Facebook</a>
				<a v-if="partners_info.website" v-bind:href="partners_info.website" target="_blank" class="button_design contact_buttons"><i class="fas fa-link" style="color: white;"></i> Website</a>
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

            current_password: undefined,
            new_password: undefined,
            confirm_password: undefined,
		}
	},
	methods:{
		async get_partner_info(){
			if(this.store.partner_list){
				const partner_index = this.store.partner_list.findIndex(partner => partner.id == this.id);

				this.store.partner_list[partner_index].views = this.add_view_local(this.store.partner_list[partner_index].views) 
				this.store.partner_list[partner_index].views++;

				this.partners_info = this.store.partner_list[partner_index];
			}
			else{
				const result = await Partners.getOnePartner(this.id);
				this.partners_info = result[0]

				this.partners_info.views = this.add_view_local(this.partners_info.views);
				this.partners_info.views++;	
			}

			this.add_view();
			this.getHeaders();
		},
		// TEMP
		add_view_local(views){
			if(views == undefined) return 0;
			return views;
		},
		async add_view(){
			await Partners.addPartnerView({
				'_id': this.id,
				'views': this.partners_info.views,
				'collectionName' : 'partners'
			});
		},

		async get_projects(){
			this.project_list = await Projects.getPartnerProjects(this.id);
		},
		
		async update_partner(){
			console.log('pozivam se')
			const response = Partners.UpdatePartner(this.partners_info, this.$route.params.id, 'true');

			if(response){
				const partner_index = this.store.partner_list.findIndex(partner => partner.id == this.id);
				this.store.partner_list[partner_index] = this.partners_info;
				this.edit_enabled = false;
			}
		},

		async delete_partner(){
			if(Auth.state.account_type == 'Admin') this.current_password = true;

			const response = Partners.DeletePartner({'_id': this.id, 'password': this.current_password}, 'false');
			if(!response) return;

			this.store.partner_list = this.store.partner_list.filter(partner => partner.id != this.id);
			
			if(Auth.state.account_type == "Poslodavac"){
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

		getHeaders(){
			if(!this.partners_info.headers) this.partner_headers = this.store.vfImages_partners;
			else this.partner_headers = this.partners_info.headers.map(img => img.imgUrl)
		},
		
		close_gallery(){
			$('#galleryEditorModal').modal('hide');
		}
	},
	computed:{
		canEdit(){
			const user_data = Auth.state.user_data;
			if(user_data._id == this.id) return true;
			
			return false;
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
.contact_buttons{
	user-select: none;
	white-space: nowrap;
}
.no_projects_message{
	text-align: center;

	margin: 2%;
	padding: 5% 0; 

	border: solid 2px #6DD0F6;
	background: rgb(245, 245, 245);
}
</style>