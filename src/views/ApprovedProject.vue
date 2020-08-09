<template>
<div style="text-align: center">
    <div v-if="project_info" class="selection_place">
        <ProjectCard v-bind:info="project_info"/>
    </div>   
    <div v-else class="">
        <router-link to="/Projects" class="card project" style="background: #636466">
            <img class="card-img-top" src="@/assets/no_alocated_project.png" alt="Card image cap" >
            
            <div class="card-body">
                <p class="card-text" style="color: #6DD0F6; text-decoration: underline">Pregledajte dostupne projekte ovdje</p>
            </div>
        </router-link>
    </div>
    <small>Nakon što vam je dodijeljen projekt, kontaktirajte poslodavca koristeći jedan od navedenih kontakata te popunite prijavnicu</small><br>
    <router-link to="/ApplicationForm" class="button_design mt-3 mr-1 ml-1"> Popuni prijavnicu </router-link>
    <router-link to="/Journal" type="button" class="button_design mt-3 mr-1 ml-1"> Dnevnik Prakse </router-link>
</div>
</template>

<script>
import ProjectCard from '@/components/project_card';
export default {
    components: {ProjectCard},
    data(){
        return{
            project_info: false
        }
    },
    methods:{
        getApprovedProject(){

        }
    },
    mounted(){

    }
}
</script>

<style>

</style>