<template>
  <div class="login">
		<h1 class="title">Moja Praksa</h1>
		<h2 class="mt-4">Prijava</h2>

		<form v-on:submit.prevent="login" class="mt-4">
			<div class="row">
				<div class="col-md-4 col-sm-0"></div>
				<div class="col-md-4 col-sm-12">
					<div class="input_wrapper input_form_margin">
						<span><i class="fas fa-envelope"></i></span>
						<input v-model="email" type="email" placeholder="Email..." required/>
					</div>
					<div class="input_wrapper input_form_margin">
						<span><i class="fas fa-key"></i></span>
						<input v-model="password" type="password" placeholder="Lozinka..." required/>
					</div>				
				</div>
				<div class="col-md-4 col-sm-0"></div>
			</div>

			<div class="row" style="text-align: center"> 
				<div class="col">
					<span style="margin: 0 auto">Nemate korisnički račun? <router-link to="/Signup" class="sign_up">Registrirajte se</router-link></span>
					<button type="submit" class="button_design button_design mt-3"> Prijava </button>
				</div>
			</div>

		</form>	
	</div>
</template>

<script>
/*
				<div class="options">s

				</div>
*/
import {Auth} from "@/services/index.js";

export default {
	data(){
		return{
			email: null,
			password: null,

			login_fail: false
		}
	},
	methods:{
		async login(){
			let res = await Auth.login({'email': this.email, 'password': this.password});
			
			if(res){
				console.log("success");
				
				this.email = null;
				this.password = null;
			}
			else console.log('fail');
		}
	},
	name:"Login"
}
</script>

<style>
.input_form_margin{
	margin: 5%;
}
.login{
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