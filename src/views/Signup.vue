<template>
	<div class="registration">
			<h1 class="title">Moja Praksa</h1>
			<h2 class="mt-4">Registracija</h2>

			<form v-on:submit.prevent="signup" class="row mt-3 form-inline d-flex justify-content-end md-form form-sm active-cyan-2">
				<div class="col-md-2 col-sm-0"></div>
				<div class="col-md-4 col-sm-12">
					<div class="input_form mt-3">
						<span><i class="fas fa-user"></i></span>
						<input v-model="new_user.name" type="text" placeholder="Ime..." required/>
					</div>

					<div class="input_form mt-3">
						<span><i class="fas fa-key"></i></span>
						<input v-model="new_user.password" type="password" placeholder="Lozinka..." required/>
					</div>

					<div class="input_form mt-3">
						<span><i class="fas fa-envelope"></i></span>
						<input v-model="new_user.email" type="email" placeholder="Email..." required/>
					</div>									
				</div>
				
				<div class="col-md-4 col-sm-12">
					<div class="input_form mt-3">
						<span><i class="fas fa-user"></i></span>
						<input v-model="new_user.surname" type="text" placeholder="Prezime..." required/>
					</div>

					<div class="input_form mt-3">
						<span><i class="fas fa-lock"></i></span>
						<input v-model="confirm_password" type="password" placeholder="Ponovite lozinku..." required/>
					</div>
					
					<div class="input_form mt-3">
						<span><i class="fas fa-users"></i></span>
						<select v-model="new_user.account_type" class="custom_select" required>
							<option disabled value="">Vrsta računa</option>
							<option>Student</option>
							<option>Poslodavac</option>
						</select>
					</div>
				</div>
				<div class="col-md-2 col-sm-0"></div>
				
				<div class="options mt-3">
					<div class="mt-3">Več imate korisnički račun? <router-link to="/Login" class="login_form">Prijavite se</router-link></div>
					<button v-if="confirm_password_check" type="submit" class="button_design mt-3"> Registrirajte se </button>
					<button v-else type="button" class="disabled_button mt-3" disabled> Registrirajte se </button>
				</div>
			</form>
	</div>
</template>

<script>
import {Auth} from "@/services/index.js";

export default {
	data(){
		return{
			new_user : {},
			confirm_password: null
		}
	},
	methods:{
		async signup() {
			let res = await Auth.register(this.new_user);
			
			if(res){
				console.log("success");

				this.new_user = {};
				this.confirm_password = undefined;
			}
			else console.log('fail');
		}
	},
	computed:{
		confirm_password_check(){
			if(this.new_user.password == this.confirm_password){
				console.log(true);
				return true;
			}
			console.log(false)
			return false;
		}
	}
}
</script>

<style>
.input_form > span > i{
	width: 10%;
}
.input_form > select, input{
	width: 89%;
}
.custom_select{
	width: 100%;
}

input, .custom_select{
	border: none;
	border-bottom: 2px solid #A0E0F6;
}

.registration{
	text-align: center;
	margin: 0 auto;
	margin-top: 10%;
}
.options{
	display: inline-block;
	margin: 0 auto
}

.fas{
	position: relative;
	top: 2px;
	margin-right: 1%;
	font-size: 1.2rem;
}
.input_form{
	display: inline-block;
	width: 100%;
}
</style>