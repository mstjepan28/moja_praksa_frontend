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
    
    <div v-if="project_info || true" class="row col mt-3 d-flex justify-content-center">
        <router-link to="/FillApplicationForm" class="button_design mr-1 ml-1"> Popuni prijavnicu </router-link>
        <router-link to="/Journal" class="button_design mr-1 ml-1"> Dnevnik Prakse </router-link>
    </div>
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
            project_info: false
        }
    },
    methods:{
        async getApprovedProject(){
            const user_data = Auth.getUser();
            if(user_data.approved_project) return;

            this.project_info = await Projects.getApprovedProject(user_data._id);
        }
    },
    mounted(){
        const user_type = Auth.state.account_type;

        if(user_type != "Student") 
            this.$router.push({ name: 'Home' });
        else
            this.getApprovedProject();
    }
}
</script>