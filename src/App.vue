<template>
  <div class="container">
    <div v-if="check_route">
      <div class="row mt-3" style="position: relative; top: 10px">
        <div v-if="auth.authenticated" class="col-12 text-right">

          <span class="login_form" v-if="auth.account_type == 'Student'">
            <router-link to="UserInfo"> {{auth.user_data.name + " " + auth.user_data.surname}} <i class="fas fa-user"></i> </router-link>
          </span>

          <span class="login_form" v-if="auth.account_type == 'Poslodavac'">
            <router-link v-bind:to="'/PartnersInfo/' + auth.user_data._id"> {{auth.user_data.company}} <i class="fas fa-user"></i> </router-link>
          </span>

          <span class="login_form" v-if="auth.account_type == 'Admin'">
           Admin <i class="fas fa-user"></i>
          </span>

          <span class="login_form ml-3" v-on:click="logout"> Odjava <i class="fas fa-sign-in-alt" aria-hidden="true"></i> </span>
        </div>        

        <div v-else class="col-12 text-right">
          <router-link to="/Login"  class="login_form"> Prijava <i class="fas fa-sign-in-alt" aria-hidden="true"></i> </router-link>
          <router-link to="/Signup" class="login_form"> Registracija <i class="fas fa-user-plus"  aria-hidden="true"></i> </router-link>
        </div>

      </div>
      
      <div class="row mb-3">
        <router-link to="/"><img src="@/../public/fipu_hr.png" class="responsive_image" style="max-height: 110px;"></router-link>
      </div>

      <nav class="row navbar navbar-expand-lg navbar-light">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav d-flex justify-content-center text-center">
            <!-- General -->
            <li class="nav-item">
              <router-link to="/">Naslovnica</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Projects">Projekti</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Partners">Partneri</router-link>
            </li>

            <!-- Poslodavac -->
            <li class="nav-item" v-if="auth.account_type == 'Poslodavac'">
              <router-link to="/AddProject">Dodaj projekt</router-link>
            </li>

            <!-- Admin -->
            <li class="nav-item dropdown" v-if="auth.account_type == 'Admin'">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding: 0; color: white">
                Studenti
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="border: 1px solid white; background: #6DD0F6">
                <router-link class="dropdown-item" to="/AllocateStudent">Alokacija studenata</router-link>
                <router-link class="dropdown-item" to="/Students">Popis studenata</router-link>
                <router-link class="dropdown-item" to="/TableOfStudents">Tablica studenata</router-link>
              </div>
            </li>

            <li class="nav-item dropdown" v-if="auth.account_type == 'Admin'">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding: 0; color: white">
                Dodaj
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="border: 1px solid white; background: #6DD0F6">
                <router-link class="dropdown-item" to="/">Dodaj poslodavca</router-link>
                <router-link class="dropdown-item" to="/AddProject">Dodaj projekt</router-link>
              </div>
            </li>

            <li class="nav-item" v-if="auth.account_type == 'Admin'">
              <router-link to="/Instructions">Upute</router-link>
            </li>

            <!-- Student -->
            <li class="nav-item dropdown" v-if="auth.account_type == 'Student'">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding: 0; color: white">
                Izvršavanje prakse
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="border: 1px solid white; background: #6DD0F6">
                <router-link class="dropdown-item" to="/SelectedProjects">Odabrani projekti</router-link>
                <router-link class="dropdown-item" to="/ApprovedProject">Dodijeljeni projekt</router-link>
                <router-link class="dropdown-item" to="/TableOfStudents">Tablica projekata</router-link>
                <router-link class="dropdown-item" to="/Instructions">Upute</router-link>
              </div>
            </li>

            <li class="nav-item" v-if="!auth.account_type">
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
button:focus{ outline: none }
.footer{
  margin-top: 3%;
  color: white;
  text-align: center;

  background: #767778
}
footer{
  padding: 1%;
  display: inline-block;
  margin: 0 auto;
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
.nav-item > a:hover{ text-decoration: underline }

.dropdown-item{
  color: white;
}
.dropdown-item:hover{
  color: white;
  background: #A0E0F6;
}

@media only screen and (max-width: 991px) {
  .nav-item{
    margin: 0.5rem 0;
    text-decoration: underline;
  }
}
</style>
