<template>
  <div class="login">
    <h1>Moja Praksa</h1>
		
		<form v-on:submit.prevent="login">
			<div class="email"> 
				<i class="fa fa-envelope" aria-hidden="true"></i>
				<input type="email" v-model="email" class="form-control placeholderEmail" aria-describedby="emailHelp" placeholder=" e-mail..." required />
			</div>

			<div class="password">
				<i class="fas fa-key" aria-hidden="true"></i>
				<input type="password" v-model="password" class="form-control"  id="hidden_password" placeholder="lozinka..." required />
				<i class="fas fa-eye"></i>
			</div>
			
			<h6 v-if="login_fail" style="color:red; font-size:12px">Neuspjela prijava, provjerite unesene podatke.</h6>
			
			<small>
				<span>
					Nemate korisnički račun?<router-link to="signup" style="padding-left:3px;">Registracija</router-link>!
				</span>
			</small>

			<button type="submit" class="btn btn-primary">Prijava</button>
		</form>
  </div>
</template>

<script>
export default {
	data(){
		return{
			email: null,
			password: null,

			login_fail: false
		}
	},
	methods:{
		login(){

		}
	}
}
</script>

<style>
.login{
	text-align: center;
	margin: 0 auto;
}
</style>