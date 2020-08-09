<template>
  <div class="container">
    <div v-if="check_route">
      
      <div class="row mt-1 h-100">
        <div class="col-md-8 col-sm-12 my-auto" >
          <router-link to="/"><img src="@/../public/fipu_hr.png" class="responsive_image" style="max-height: 110px;"></router-link>
        </div>

        <div v-if="auth.authenticated" class="col-md-4 col-sm-0 right-col mt-3 my-auto">
          <span class="login_form" v-on:click="logout"> Odjava <i class="fas fa-sign-in-alt" aria-hidden="true"></i> </span>
        </div>        
        <div v-else class="col-md-4 col-sm-0 right-col mt-3 my-auto">
          <router-link to="/Login"  class="login_form" style="margin: 0 10px;"> Prijava <i class="fas fa-sign-in-alt" aria-hidden="true"></i> </router-link>
          <router-link to="/Signup" class="login_form"> Registracija <i class="fas fa-user-plus"  aria-hidden="true"></i> </router-link>
        </div>

      </div>

      <nav class="row navbar navbar-expand-lg navbar-light">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/">Naslovnica</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Projects">Projekti</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Partners">Partneri</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Poslodavac' || auth.account_type == 'Admin'">
              <router-link to="/AddProject">Dodaj projekt</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Admin'">
              <router-link to="/">Dodaj poslodavca</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Admin'">
              <router-link to="/">Studenti</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Student'">
              <router-link to="/SelectedProjects">Odabrani projekti</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Student'">
              <router-link to="/ApprovedProject">Odobreni projekti</router-link>
            </li>
            <li class="nav-item" v-if="auth.account_type == 'Student'">
              <router-link to="/Instructions">Upute</router-link>
            </li>
          </ul>
        </div>

      </nav>
      
      <div>
        <router-view/>
      </div>

      <div class="row footer">
        <footer>
          @ 2020 by Lorem Ipsum
        </footer>
      </div>
    </div>

    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
import {Auth} from "@/services/index.js";
import store from '@/store.js';

export default {
  data(){
    return{
      store,
      auth: Auth.state,
    }
  },
  methods: {
    logout(){
      Auth.logout();
      this.$router.push({ name: 'Login'});
    },
  },
  computed:{
    check_route(){
      if(this.$route.path == "/Login" || this.$route.path == "/Signup") return false
      else return true
    }
  },
}
</script>

<style lang="scss">
button:focus{
  outline: none
}
.footer{
  margin-top: 3%;
  color: white;
  text-align: center;

  background: #636466
}
footer{
  padding: 1%;
  display: inline-block;
  margin: 0 auto;
}

.right-col{
  padding-bottom: 5px;
  text-align: right;
}
.right-col > router-link{
  color: #6DD0F6;
  display: inline-block;
}
.right-col > form > input{
  border-radius: 0;
  border: #6DD0F6 2px solid;
}
.fas{ color: #6DD0F6}
.navbar{ background: #6DD0F6 }

.navbar-nav{ margin: 0 auto }
.nav-item{
  margin: 0 4% 0 0;
  white-space: nowrap;
}
.nav-item > a{
  font-size: 16px;
  color: white;
}
.nav-item > a:hover{
  text-decoration: underline;
}
</style>
