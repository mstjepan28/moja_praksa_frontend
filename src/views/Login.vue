<template>
  <div class="login">
		<h1 class="mt-5"><router-link to="/" class="title" style="color: black; text-decoration: none">Moja Praksa</router-link></h1>
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

			<div class="row d-flex justify-content-center" v-if="error_message">
				<small style="color: red">{{error_message}}</small><br>
			</div>
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
import _ from 'lodash';
import {Auth} from "@/services/index.js";
import store from '@/store.js';

export default {
	data(){
		return{
			store,

			email: null,
			password: null,

			error_message: false
		}
	},
	methods:{
		async login(){
			const result = await Auth.login({'email': this.email, 'password': this.password});
			
			if(result){
				this.email = null;
				this.password = null;
				
				this.$router.push({ name: 'Home'});
			}
			else this.error_message = "Neuspjeli pokušaj prijave u sustav, molimo provjerite unesene podatke!";
		}
	},
	watch:{
		"error_message": _.debounce(function(){this.error_message = false}, 10000)
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