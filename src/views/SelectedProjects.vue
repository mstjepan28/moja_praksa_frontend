<template>
<div>
    <div v-if="project_list" class="row mt-5" style="text-align: center;">
        <div style="width: 100%"><ProjectCard v-bind:key="partner.id" v-bind:info="partner" v-for="partner in project_list" style="margin: 0 3% 3% 3%"/></div>
        <router-link v-if="project_list.length == 3" to="/Projects" class="alert_button" style="margin: 0 auto;">Potvrdi odabir</router-link>
    </div>

    <div v-else class="row mt-5" style="text-align: center">
        <div class="col-12 no_info_message">
            Nemate odabranih projekata!<br>
        </div>
        <div class="col-12 mt-3">
            Odaberite projekt <router-link to="/Projects" class="projects_link">ovdje!</router-link>
        </div>
    </div>
</div>
</template>

<script>
import ProjectCard from '@/components/project_card';
import store from '@/store.js';

export default {
    components: { ProjectCard },
    name: 'SelectedProjects',
    data(){
        return{
            store,

            project_list: false,
        }
    },
    methods:{
        get_projects(){
            const result =  JSON.parse(localStorage.getItem('selected_projects'));

            if(result && result.length >= 1) this.project_list = result;
            else this.project_list = false; 
        },
    },
    mounted(){
        this.get_projects();
    }

}
</script>

<style>

</style>