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
                <div class="card project div_button" :class="{ activeProject: selectedProject == item.id }" v-on:click="showStudents(item.id)" >
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
                <div class="priority_selector div_button" :class="{ active: isActive == 1 }" v-on:click="isActive = 1"> Prvi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector div_button" :class="{ active: isActive == 2 }" v-on:click="isActive = 2"> Drugi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector div_button" :class="{ active: isActive == 3 }" v-on:click="isActive = 3"> Treći izbor </div>
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
                <div v-if="student_list.first_choice" class="col">
                    <StudentCardSmall v-on:select_student="confrimAssignment" v-bind:key="student.id" v-bind:info="student" v-for="student in student_list.first_choice"/>
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
            <h4 class="subtitle mt-3">Treći izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.third_choice" class="col">
                    <StudentCardSmall v-on:select_student="confrimAssignment" v-bind:key="student.id" v-bind:info="student" v-for="student in student_list.third_choice"/>
                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao treći izbor
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
        // Dohvati projekte koji su odabrani od strane studenta te koji imaju slobodnih mjesta 
        // atribut allocated_to je polje koje govori broj slobodnih mjesta, slobodno mjesto označava se sa false, 
        //  ako je mjesto zauzeto, false zamjenjuje id studenta
		async getProjects(){
            this.store.project_list = await Projects.getProjects();
            this.project_list = this.store.project_list.filter(project => project.selected_by && project.allocated_to.includes(false))
        },

        // Nakon odabira projekta, prikaži studente koji su ga odabrali
        async showStudents(id){
            this.selectedProject = id;
            const project = this.project_list.filter(project => project.id == id)[0];

            this.student_list = {
                first_choice: await this.getStudents(project.selected_by.first_priority),
                second_choice: await this.getStudents(project.selected_by.second_priority),
                third_choice: await this.getStudents(project.selected_by.third_priority)
            }
        },

        // Pretvara listu id-a studenata u objekte sa informacijama studenata
        // INPUT [id_1, id_2,...] 
        // OUTPUT [{student_info}, {student_info},...]
        async getStudents(student_ids){
            if(student_ids == undefined) return false;

            if(!this.store.student_list) this.store.student_list = await Students.getStudents();
            const students = this.store.student_list

            return student_ids.map(id => {
                return students.filter(student => student.id == id)[0];
            })
        },

        // Okida se na $emit StudentCardSmall komponente
        // Otvara bootstrap modal za potvrdivanje alokacije studenta na odabran projekt
        confrimAssignment(id){
            this.selectedStudent = id;
            $('#asignProject').modal('show')
        },
        // Nakon potvrdivanja alokacije studenta, vrsi se update projekta
        asignProject(){
            const project = this.updateLocalProjects();
            Projects.UpdateProject(project, project.id, 'true');

            this.selectedProject = this.selectedStudent = false;
        },

        // Dodajemo id alociranog studenta na prvi 'false' u atributu 'allocated_to' odabranog projekta
        // Ponovno pozivamo funkciju za dohvacanje liste projekata, ako smo popuili sva slobodna mjesta na projektu, nece se više pojavljivati
        // Vracamo projekt te se on updatea na bazi
        updateLocalProjects(){
            const project_index = this.store.project_list.findIndex(project => project.id == this.selectedProject);
            const project = this.store.project_list[project_index]

            project.allocated_to[project.allocated_to.indexOf(false)] = this.selectedStudent;

            this.store.project_list[project_index] = project;
            this.getProjects();

            return project
        },

        // Dohvaca se broj slobonih mjesta na projektu
        getEmptyPlaces(){
            const project = this.project_list.filter(project => project.id == this.selectedProject)[0];
            return project.allocated_to.filter(element => element == false).length;
        }
    },
    async mounted(){
        if(Auth.state.account_type != "Admin") 
            this.$router.push({ name: 'Home' });
        else
            this.getProjects();
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
.activeProject{
    font-size: 20px;
    width: 19rem;
    border: 4px solid #6DD0F6
}
@media only screen and (max-width: 767px) {
    .student_info{ padding: 10% 2% 0 2% }
    .activeProject{width: 12rem}
}
</style>