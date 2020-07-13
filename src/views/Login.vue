<template>
  <div class="login">
		<h1 class="title">Moja Praksa</h1>
		<h2 class="mt-4">Prijava</h2>
		
		<div class="row">
			<div class="col-md-3 col-sm-0"></div>
			
			<div class="col-md-6 col-sm-12">
				<form v-on:submit.prevent="login" class="mt-4 form-inline d-flex justify-content-end md-form form-sm active-cyan-2">
					<div class="input_form mt-3">
						<span><i class="fas fa-envelope"></i></span>
						<input v-model="email" type="email" placeholder="Email..." required/>
					</div>

					<div class="input_form mt-3">
						<span><i class="fas fa-key"></i></span>
						<input v-model="password" type="password" placeholder="Lozinka..." required/>
					</div>

					<div class="options">
						<div class="mt-3">Nemate korisnički račun? <router-link to="/Signup" class="sign_up">Registrirajte se</router-link></div>
						<button type="submit" class="login_button mt-3"> Prijava </button>
					</div>
				</form>	
			</div>
			
			<div class="col-md-3 col-sm-0"></div>
		</div>

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
h1, h2{
	margin: 0;
}
.sign_up{
	color: #6DD0F6;
}
.sign_up:hover{
	color: #6DD0F6;
	text-decoration: underline;
}

form{
	text-align: center;
}
.options{
	display: inline-block;
	margin: 0 auto
}

.login_button{
	padding: 1% 2%;

	display: inline-block;

	font-size: 16px;
	font-weight: bold;
	color: white;

	border: 2px solid #A0E0F6;
	border-radius: 10px;

	background: #6DD0F6
}
.login_button:hover{
	border: 2px solid #6DD0F6;
	background: #A0E0F6;
}

input{
	border: none;
	border-bottom: 2px solid #A0E0F6;
}
input:focus{
	border: none;
	border-bottom: 2px solid #6DD0F6;
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

.title{
	color: black;
	margin: 0;
}
.login{
	text-align: center;
	margin: 0 auto;
	margin-top: 15%;
}
</style>