<template>
<div>
    <div class="modal fade" id="asignProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="text-align: center">
            <div class="modal-content">
                <h4 class="modal-body">
                    Jeste li sigurni da želite projekt dodijeliti odabranom studentu?
                </h4>
                <div class="modal-footer" style="display: inline-block; margin: 0 auto;">
                    <button type="button" v-on:click="asignProject" class="alert_button" data-dismiss="modal" data-toggle="modal" data-target="#selection_sent">Odobri projekt</button>
                    <button type="button" class="disabled_button" data-dismiss="modal">Odustani</button>
                </div>
            </div>
        </div>
    </div>

    <section v-if="project_list" style="text-align: center;">
        <vue-horizontal-list :items="project_list" :options="store.carousel_options" >
            <template v-slot:default="{item}">
                <div class="card project div_button" v-on:click="showStudents(item.id)">
                    <img class="card-img-top" :src="item.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{item.company}}</h5>
                        <p class="card-text">{{item.project_description}}</p>
                    </div>
                </div>
            </template>
        </vue-horizontal-list>
    </section><hr>

    <div v-if="selectedProject && student_list">
        <div class="row text-center h-100">
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector div_button" :class="{ active: isActive == 1 }" v-on:click="showSelection(1)"> Prvi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector div_button" :class="{ active: isActive == 2 }" v-on:click="showSelection(2)"> Drugi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector div_button" :class="{ active: isActive == 3 }" v-on:click="showSelection(3)"> Treči izbor </div>
            </div>
        </div><hr>

        <div class="row text-center">
            <div class="col">
                <small>Broj studenata potrebnih za ovaj projekt: {{getEmptyPlaces()}}</small>
            </div>
        </div><hr>

        <div v-if="isActive == 1">
            <h4 class="subtitle  mt-3">Prvi izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.first_choice || true" class="col">
                    <StudentCardSmall v-on:select_student="confrimAssignment" v-bind:key="student.id" v-bind:info="student" v-for="student in student_list"/>
                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao prvi izbor
                </div>
            </div>
        </div>
        <div v-if="isActive == 2">
            <h4 class="subtitle mt-3">Drugi izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.second_choice" class="col">
                    <StudentCardSmall v-on:select_student="confrimAssignment" v-bind:key="student.id" v-bind:info="student" v-for="student in student_list.second_choice"/>
                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao drugi izbor
                </div>
            </div>
        </div>
        <div v-if="isActive == 3">
            <h4 class="subtitle mt-3">Treči izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.third_choice" class="col">
                    <StudentCardSmall v-on:select_student="confrimAssignment" v-bind:key="student.id" v-bind:info="student" v-for="student in student_list.third_choice"/>
                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao treči izbor
                </div>
            </div>
        </div>    
    </div>

</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';

import StudentCardSmall from '@/components/student_card_small';

import { Auth, Projects, Students } from '@/services';
import store from '@/store.js';

export default {
    name:"AllocateStudent",
    components: { 
        VueHorizontalList,
        StudentCardSmall
    }, 
    data(){
        return{
            store,
            project_list: false,
            student_list: false,

            isActive: 1,

            selectedProject: false,
            selectedStudent: false,
        }
    },
    methods:{
		async getProject(){
            if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
            this.project_list = this.store.project_list.filter(project => project.allocated_to.includes(false))
        },
        async showStudents(id){
            this.selectedProject = id;
            this.getStudents();
            //TEST//this.student_list = await Projects.getProjectStudents(id);
        },
        //TEST
		async getStudents(){
            if(!this.store.student_list) this.store.student_list = await Students.getStudents();
			this.student_list = this.store.student_list
        },
        showSelection(selection){
            this.isActive = selection;
        },

        // --- Odobravanje projekta --- //
        confrimAssignment(id){
            this.selectedStudent = id;
            $('#asignProject').modal('show')
        },
        async asignProject(){
            const project = this.updateLocalProjects();

            const result = await Projects.UpdateProject(project, project.id, 'true');
			console.log(result);

            this.selectedProject = this.selectedStudent = false;
        },
        updateLocalProjects(){
            const project_index = this.store.project_list.findIndex(project => project.id == this.selectedProject);
            const project = this.store.project_list[project_index]

            project.allocated_to[project.allocated_to.indexOf(false)] = this.selectedStudent;

            this.store.project_list[project_index] = project;
            this.getProject();

            return project
        },
        getEmptyPlaces(){
            const project = this.project_list.filter(project => project.id == this.selectedProject)[0];
            return project.allocated_to.filter(element => element == false).length;
        }
    },
    async mounted(){
		/*
        if(Auth.state.account_type != "Admin") this.$router.push({ name: 'Home' });
        else this.getProject();
		
		*/
        //TEST
        console.log(Auth.a)
        this.getProject();
    }
}
</script>

<style>
.priority_selector{
    color: #6DD0F6;
    margin: 0 5px;
}
.active{
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
}
</style>