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

    <small style="margin-top: 100px">Nakon što vam je dodijeljen projekt, kontaktirajte poslodavca koristeći jedan od navedenih kontakata te popunite prijavnicu</small>
</div>
</template>

<script>
import ProjectCard from '@/components/project_card';
import { Auth, Projects } from "@/services/index.js";

export default {
    components: {ProjectCard},
    data(){
        return{
            project_info: false,
            user_data: Auth.state.user_data
        }
    },
    methods:{
        async getApprovedProject(){
            if(this.user_data.approved_project) return;

            this.project_info = await Projects.getApprovedProject(this.user_data._id);
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