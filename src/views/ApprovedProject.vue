<template>
<div style="text-align: center">
    <div v-if="project_info">
        <ProjectCard v-bind:info="project_info"/>
    </div>   
    <div v-else>
        <router-link to="/Projects" class="card project" style="background: #636466">
            <img class="card-img-top" src="@/assets/no_alocated_project.png" alt="Card image cap" >
            
            <div class="card-body">
                <p class="card-text" style="color: #6DD0F6; text-decoration: underline">Pregledajte dostupne projekte ovdje</p>
            </div>
        </router-link>
    </div>
    <small>Nakon što vam je dodijeljen projekt, kontaktirajte poslodavca koristeći jedan od navedenih kontakata te popunite prijavnicu</small><br>
    <router-link to="/FillApplicationForm" class="button_design mt-3 mr-1 ml-1"> Popuni prijavnicu </router-link>
    <router-link to="/Journal" type="button" class="button_design mt-3 mr-1 ml-1"> Dnevnik Prakse </router-link>
</div>
</template>

<script>
import ProjectCard from '@/components/project_card';
import { Auth, Projects } from "@/services/index.js";
import store from '@/store.js';

export default {
    components: {ProjectCard},
    data(){
        return{
            store,
            auth: Auth.state,
            project_info: false
        }
    },
    methods:{
        async getApprovedProject(){
            const user_data = Auth.getUser();
            if(user_data.approved_project) return;

            if(!this.store.approved_project) this.store.approved_project = await Projects.getApprovedProject();
            this.project_info = this.store.project_list[0]
            //this.project_info = this.store.approved_project
        }
    },
    mounted(){
        const user_type = this.auth.account_type;
        if(!(user_type == "Student" || user_type == "Admin")) console.log("No access")//this.$router.push({ name: 'Home' });
        else if(user_type == "Student") this.getApprovedProject();
    }
}
</script>

<style>

</style>