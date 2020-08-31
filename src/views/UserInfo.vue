<template>
<div>
    <!--
        Modals
    -->

    <div class="modal fade" id="delete_user_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                    <button v-on:click="delete_user" type="button" class="alert_button" data-dismiss="modal"> Izbriši moj račun </button>
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

    <div class="modal fade" id="galleryEditorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">
					<GalleyEditor v-on:close_gallery="close_gallery"/>
                </div>

            </div>
        </div>
    </div>


    <!--
        User Info
    -->    

    <div v-if="edit_enabled">
        <div class="row mt-3">
            <div class="col text-right"> 
                <button class="button_design mr-3" v-on:click="update_user"> Pohrani promjene </button>
                <button class="disabled_button" v-on:click="edit_enabled = !edit_enabled"> Odustani </button>
            </div>
        </div>
        <div class="row h-100 mt-2">
            <div class="col-md-1 col-sm-0"></div>

            <div class="row col-md-3 col-sm-12 my-auto" style="margin: 0">
                <div class="col-12">
                    <img v-if="user_data.logo" class="card-img-top profile_img" :src="user_data.logo.imgUrl"/>
                    <img v-else class="card-img-top profile_img img-fluid" src="@/assets/Default.png" alt="Your profile picture"/><br>
                </div>

                <div class="w-100 mt-3"></div>

                <div class="col-12 button_design div_button text-center" data-toggle="modal" data-target="#galleryEditorModal"> Promjeni sliku </div>
            </div>

            <div class="col-md-7 col-sm-12 my-auto student_info">
                <div class="user_info_input_wrapper">Ime: <input type="text" v-model="user_data.name" class="input_wrapper user_info_input"></div>
                <div class="user_info_input_wrapper">Prezime: <input type="text" v-model="user_data.surname" class="input_wrapper user_info_input"></div>
                <div class="user_info_input_wrapper">JMBAG: <input type="text" v-model="user_data.jmbag" class="input_wrapper user_info_input"></div>
                <div class="user_info_input_wrapper">E-mail: <input type="text" v-model="user_data.email" class="input_wrapper user_info_input"></div>
                <div class="user_info_input_wrapper">Tehnologije: <input type="text" v-model="user_data.technology" class="input_wrapper user_info_input"></div>
                <div class="user_info_input_wrapper">Godina studija: <input type="text" v-model="user_data.year" class="input_wrapper user_info_input"></div>
            </div>
            <div class="col-md-1 col-sm-0"></div>
        </div><hr>

        <div class="d-flex justify-content-center">
            <button style="color: #6DD0F6; font-weight: bold" data-toggle="modal" data-target="#change_password_modal"> Promjeni lozniku </button>
            <button style="color: red; font-weight: bold" data-toggle="modal" data-target="#delete_user_modal"> Izbriši moj račun </button>
        </div>
    </div>

    <div v-else>
        <div class="row mt-3">
            <div class="col text-right"> 
                <button class="button_design" v-on:click="edit_enabled = !edit_enabled"> Uredi </button>
            </div>
        </div>
        <div class="row h-100">
            <div class="col-md-1 col-sm-0"></div>
            <div class="col-md-3 col-sm-12 my-auto">
                <img v-if="user_data.logo" class="card-img-top profile_img" :src="user_data.logo.imgUrl"/>
                <img v-else class="card-img-top profile_img img-fluid" src="@/assets/Default.png" alt="Your profile picture"/>
            </div>
            <div class="col-md-7 col-sm-12 my-auto student_info">
                <div class="user_info_input_wrapper"><span class="user_info_label">Ime i prezime:</span> {{user_data.name + " " + user_data.surname}}</div>
                <div class="user_info_input_wrapper"><span class="user_info_label">JMBAG:</span> {{user_data.jmbag}}</div>
                <div class="user_info_input_wrapper"><span class="user_info_label">E-Mail:</span> {{user_data.email}}</div>
                <div class="user_info_input_wrapper"><span class="user_info_label">Tehnologije:</span> {{user_data.technology}}</div>
                <div class="user_info_input_wrapper"><span class="user_info_label">Godina studija:</span> {{user_data.year}}</div>
            </div>
            <div class="col-md-1 col-sm-0"></div>
        </div>       
    </div>

</div>
</template>

<script>
import _ from 'lodash';

import {Auth, App} from "@/services/index.js";
import store from '@/store.js';

import GalleyEditor from '@/components/gallery_editor';

export default {
    components:{ GalleyEditor },
    data(){
        return {
            store,
            user_data: Auth.state.user_data,

            edit_enabled: false,
            error_message: false,
            modal_error: undefined,

            current_password: undefined,
            new_password: undefined,
            confirm_password: undefined,
        }
    },
    methods:{
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
        async delete_user(){
            $('#delete_user_modal').modal('hide')

            const result = await App.deleteUser({'_id': this.user_data._id, 'password': this.current_password}, false);
            this.current_password =  undefined;

            if(!result){
                this.modal_error = "Prilikom pokušaja brisanja korisničkog računa došlo je do greške!";
                $('#error_modal').modal('show')
            }
            else{
                Auth.logout();
                this.$router.push({ name: 'Login'});
            }
        },
        async update_user(){
            delete this.user_data.token;

            const result = await App.updateUser(this.user_data, true);
            if(!result){
                this.modal_error = "Prilikom pokušaja izmjene korisničkih podataka došlo je do greške";
                $('#error_modal').modal('show')
            }

            this.edit_enabled = false;
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
            this.user_data = Auth.getUser();
			$('#galleryEditorModal').modal('hide');
		}
    },
    mounted(){
        if(Auth.state.account_type != 'Student') this.$router.push({ name: 'Home'});
    },
	watch:{
		"error_message": _.debounce(function(){this.error_message = false}, 5000)
	},
}
</script>

<style>

</style>