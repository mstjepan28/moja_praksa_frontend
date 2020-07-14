<template>
  <div>
    <vue-flux
      class="row"
      :options="store.vfOptions"
      :images="store.vfImages_home"
      :transitions="store.vfTransitions"
      ref="slider"
    >
      <template v-slot:preloader> <flux-preloader /> </template>
    </vue-flux>

    <div class="row description">
      <h1 class="title">Moja Praksa</h1><br>
      <p class="description_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
        Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
        Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
        Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
      </p>
    </div>

    <div class="row">
      <div class="col-md-7 col-sm-12">
        <img v-bind:src="partner_image" class="img-fluid" alt="Responsive image" stlyle="height: 18rem">
      </div>

      <div class="col-md-5 col-sm-12 partner_list">
        <h2>Naši partneri:</h2>
        <PartnerButton v-bind:key="partner.id" v-bind:info="partner" v-for="partner in partner_list"/><br>
        <router-link to="/Partners" class="show_all">Prikaži sve</router-link>
      </div>
    </div>

    <div class="row project_sample">
      <div style="width: 100%"><ProjectCard v-bind:key="partner.id" v-bind:info="partner" v-for="partner in project_list"/></div>
      <router-link to="/Projects" class="show_all" style="margin: 0 auto; padding: 1% 3%;">Prikaži sve</router-link>
    </div>

  </div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';

import ProjectCard from '@/components/project_card';
import PartnerButton from '@/components/partner_button';
import store from '@/store.js';
//import { Users } from '@/services'

export default {
  components: {
    VueFlux,
    FluxPreloader,

    ProjectCard,
    PartnerButton,
  },

  data(){
    return{
      store,
      about_us: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. Praesent vel odio mauris",
      partner_image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",

      partner_list: false,
      project_list: false
    }
  },
  methods:{
    get_projects(projects){
      this.project_list = projects.slice(0, 3)
    },
    extract_company(projects){
      //Dohvaca 4 objekta sa razlicitim company vrijednostima
      this.partner_list = [...new Map( projects.map(item => [item.company, item]) ).values()].slice(0, 4)
    }
  },
  async mounted(){
    let projects = this.store.project_list
    this.get_projects(projects);
    this.extract_company(projects);

    /*
    let proba = await fetch("http://localhost:3000/users")
    let rezultat = await Users.getUsers()
    console.log(rezultat)
    */
  },
  name: 'Home'
}
</script>

<style scoped>

.col-sm-12{
  margin-top: 3%;
}
.col-7, .col-5{
  padding: 0
}
.project_sample{
  text-align: center;
}
.show_all{
	margin-top: 5%;
	padding: 1% 2%;

	display: inline-block;

	font-size: 16px;
	font-weight: bold;
	color: white;

	border: 2px solid #A0E0F6;
	border-radius: 10px;

	background: #6DD0F6
}
.show_all:hover{
	border: 2px solid #6DD0F6;
	background: #A0E0F6;
}

.partner_list{
  text-align: center;
}
.description{
  text-align: center;
}
</style>
