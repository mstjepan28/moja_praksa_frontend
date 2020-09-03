<template>
<div class="registration">
	<h1 class="mt-5"><router-link to="/" class="title" style="color: black; text-decoration: none">Moja Praksa</router-link></h1>
	<h2>Registracija</h2><hr>

	<form v-on:submit.prevent="signup">
		<div class="row"><div class="col"><h4>Odaberite tip korisnika</h4></div></div>
		
		<!-- Account type -->
		<div class="row">
			<div class="col-md-2 col-sm-0"></div>

			<div class="col-md-4 col-sm-12">
				<label for="Student">Student</label><br>
				<input type="radio" v-model="new_user.account_type" v-on:click="new_user = {}" name="account_type" value="Student">
			</div>
			<div class="col-md-4 col-sm-12">
				<label for="Poslodavac">Poslodavac</label><br>
				<input type="radio" v-model="new_user.account_type" v-on:click="new_user = {}" name="account_type" value="Poslodavac">
			</div>

			<div class="col-md-2 col-sm-0"></div>	
		</div><hr>
		<!-- Account type end -->

		<!-- Student -->
		<div v-if="new_user.account_type == 'Student'" class="row">
			<div class="col-md-2 col-sm-0"></div>
			<div class="col-md-4 col-sm-12">

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-user"></i></span>
					<input v-model="new_user.name" type="text" placeholder="Ime..." required/>
				</div>
				
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-key"></i></span>
					<input v-model="new_user.password" type="password" placeholder="Lozinka..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-envelope"></i></span>
					<input v-model="new_user.email" type="email" placeholder="Email..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-code-branch"></i></span>
					<input v-model="new_user.technology" type="text" placeholder="Tehnologije..." required/>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-user"></i></span>
					<input v-model="new_user.surname" type="text" placeholder="Prezime..." required/>
				</div>

				<div v-if="confirm_password_check" class="input_wrapper input_form_margin">
					<span><i class="fas fa-lock"></i></span>
					<input v-model="confirm_password" type="password" placeholder="Ponovite lozinku..." required/>
				</div>
				<div v-else class="input_wrapper input_form_margin unmatced_passwords">
					<span><i class="fas fa-lock" style="color: red"></i></span>
					<input v-model="confirm_password" type="password" placeholder="Ponovite lozinku..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-id-badge"></i></span>
					<input v-model="new_user.jmbag" type="number" placeholder="JMBAG..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-graduation-cap"></i></span>
					<input v-model="new_user.year" type="number" placeholder="Godina studija..." min=1 max=5 required/>
				</div>
			</div>
			<div class="col-md-2 col-sm-0"></div>	
		</div>

		<!-- Poslodavac -->
		<div v-if="new_user.account_type == 'Poslodavac'" class="row">
			<div class="col-md-2 col-sm-0"></div>
			<div class="col-md-4 col-sm-12">
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-user"></i></span>
					<input v-model="new_user.name" type="text" placeholder="Naziv poduzeća..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-key"></i></span>
					<input v-model="new_user.password" type="password" placeholder="Lozinka..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-code-branch"></i></span>
					<input v-model="new_user.technology" type="text" placeholder="Tehnologije..." required/>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-envelope"></i></span>
					<input v-model="new_user.email" type="email" placeholder="Email..." required/>
				</div>

				<div v-if="confirm_password_check" class="input_wrapper input_form_margin">
					<span><i class="fas fa-lock"></i></span>
					<input v-model="confirm_password" type="password" placeholder="Ponovite lozinku..." required/>
				</div>
				<div v-else class="input_wrapper input_form_margin unmatced_passwords">
					<span><i class="fas fa-lock" style="color: red"></i></span>
					<input v-model="confirm_password" type="password" placeholder="Ponovite lozinku..." required/>
				</div>

				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-map-marker-alt"></i></span>
					<input v-model="new_user.adress" type="text" placeholder="Adresa..." />
				</div>
			</div>
			<div class="col-md-2 col-sm-0"></div><div class="w-100"></div>

			<div class="col-md-2 col-sm-0"></div>
			<div class="col-md-8 col-sm-12">
				<textarea v-model="new_user.about_us" class="about_us" placeholder="Opišite vaše poduzeće u nekoliko rečenica..."></textarea>
			</div>
			<div class="col-md-2 col-sm-0"></div><div class="w-100"></div>

			<div class="col-md-2 col-sm-0"></div>
			<div class="col-md-4 col-sm-12">
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-at"></i></span>
					<input v-model="new_user.contact_email" type="email" placeholder="Kontakt email..." />
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="input_wrapper input_form_margin">
					<span><i class="fas fa-phone"></i></span>
					<input v-model="new_user.telephone_number" type="tel" placeholder="Broj telefona..." />
				</div>
			</div>
			<div class="col-md-2 col-sm-0"></div>
		</div>

		<!-- No selection -->
		<div v-if="!new_user.account_type" class="row" style="text-align: center">
			<span class="no_info_message">Odaberite tip korisničkog računa</span>
		</div>
		<hr>

		<div v-if="new_user.account_type" class="d-flex justify-content-center">
			<div class="input_wrapper"> <input v-model="registrationCode" type="password" placeholder="Kod za registraciju" required> </div>
		</div><hr>

		<div class="row d-flex justify-content-center" v-if="error_message">
			<small style="color: red">{{error_message}}</small><br>
		</div>

		<div class="row">
			<span class="col text-center">Več imate korisnički račun? <router-link to="/Login" class="login_form">Prijavite se</router-link></span>
		</div>

		<div class="row mt-1 mb-3">
			<div class="col text-center">
				<button type="submit" class="button_design"> Registriraj se! </button>
			</div>
		</div>

	</form>
</div>
</template>

<script>
import _ from 'lodash';
import {Auth} from "@/services/index.js";

export default {
	data(){
		return{
			new_user : {},
			confirm_password: null,
			
			error_message: false,
			registrationCode: undefined,
		}
	},
	methods:{
		async signup() {
			const responce = await Auth.register(this.new_user, this.registrationCode);
			
			if(responce){
				this.new_user = {};
				this.confirm_password = undefined;

				this.$router.push({ name: 'Home'});
			}
			else this.error_message = "Došlo je do greške tijekom registracije!";
		},
	},
	computed:{
		confirm_password_check(){
			if(this.new_user.password == this.confirm_password) return true;
			return false;
		}
	},
	watch:{
		"error_message": _.debounce(function(){this.error_message = false}, 10000)
	},
}
</script>

<style>
.unmatced_passwords{border-color: red;}

.about_us{
	width: 100%;
}
.input_form_margin{
	margin: 5%;
}
.registration{
	text-align: center;
	margin: 0 auto;
}

.fas{
	position: relative;
	top: 2px;
	margin-right: 1%;
	font-size: 1.2rem;
}
</style>