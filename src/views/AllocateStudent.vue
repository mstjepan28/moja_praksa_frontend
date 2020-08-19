<template>
<div>
    <div v-if="selected_projects" class="row mt-5 d-flex justify-content-center">
        <div class="col-md-4 col-sm-12">
            <ProjectCard :info="selected_projects[0]"/>
            <button class="button_design" style="widht: 100%;"> Odaberite projekt</button>
        </div>
        <div class="col-md-4 col-sm-12">
            <ProjectCard :info="selected_projects[1]"/>
        </div>
        <div class="col-md-4 col-sm-12">
            <ProjectCard :info="selected_projects[2]"/>
        </div>
    </div>

</div>
</template>

<script>
import ProjectCard from '@/components/project_card';

import { Students, Projects } from '@/services';
import store from '@/store.js';

export default {
    components: { ProjectCard }, 
    data(){
        return{
            store,
            id: this.$route.params.id,
            selected_projects: false,
        }
    },
    methods:{
		async getStudents(){
			if(!this.store.student_list) this.store.student_list = await Students.getStudents();
            const student_info = this.store.student_list.filter(student => student.id == this.id)[0]
            
            if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
            this.selected_projects = this.store.getSelectedProjects(student_info.chosenProjects);
        },
    },
    mounted(){
        this.getStudents();
        //"5f37da990841e12e3c5ebe4c"
    }
}
</script>

<style>

</style>