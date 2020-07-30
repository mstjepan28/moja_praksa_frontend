<template>
  <div class="login">
		<h1 class="title">Moja Praksa</h1>
		<h2>Prijava</h2><hr>

		<form v-on:submit.prevent="login">
			<div class="row">
				<div class="col-md-4 col-sm-0"></div>
				<div class="col-md-4 col-sm-12">
					<div class="input_wrapper input_form_margin">
						<span><i class="fas fa-envelope"></i></span>
						<input v-model="email" type="email" placeholder="Email..." required/>
					</div>
					<div class="input_wrapper input_form_margin mt-4">
						<span><i class="fas fa-key"></i></span>
						<input v-model="password" type="password" placeholder="Lozinka..." required/>
					</div>				
				</div>
				<div class="col-md-4 col-sm-0"></div>
			</div><hr>

			<div class="row" style="text-align: center"> 
				<span style="margin: 0 auto">Nemate korisnički račun? <router-link to="/Signup" class="login_form">Registrirajte se</router-link></span>	
			</div>
			
			<div class="row mt-3" style="text-align: center">
				<button type="submit" class="button_design" style="display: inline-block; margin: 0 auto;"> Prijava </button>
			</div>

		</form>	
	</div>
</template>

<script>
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
			const result = await Auth.login({'email': this.email, 'password': this.password});
			console.log(result)
			if(result){
				this.email = null;
				this.password = null;
				
				this.$router.push({ name: 'Home'});
			}
		}
	},
	name:"Login"
}
</script>

<style>
.input_form_margin{margin: 5%;}

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