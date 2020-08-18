<template>
<div>
    <div class="modal fade" id="selection_sent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="text-align: center">
            <div class="modal-content">
                <h4 class="modal-body">
                    Odabir projekata poslan!
                </h4>
                <div class="modal-footer" style="display: inline-block; margin: 0 auto;">
                    <button type="button" class="button_design" data-dismiss="modal">Uredu</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="send_selection" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="text-align: center">
            <div class="modal-content">
                <h4 class="modal-body">
                    Jeste li sigurni da želite prijaviti odabrane projekte sa danim prioritetom?
                </h4>
                <div class="modal-footer" style="display: inline-block; margin: 0 auto;">
                    <button type="button" v-on:click="send_project_selection" class="alert_button" data-dismiss="modal" data-toggle="modal" data-target="#selection_sent">Pošalji odabir</button>
                    <button type="button" class="disabled_button" data-dismiss="modal">Odustani</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5">
        <div class="selected_projects">
            <div v-if="first_choice" class="selection_place">
                <router-link v-bind:to="'/ProjectInfo/' + first_choice.id" class="card project">
                    <img class="card-img-top" v-bind:src="first_choice.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{first_choice.company}}</h5>
                        <p class="card-text">{{first_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Prvi odabir</span>

                <div v-if="!selectionConfirmed" class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative(first_choice.id)"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('first_choice', first_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive(first_choice.id)"><i class="fas fa-chevron-right"></i></button>                    
                </div>
            </div>
            <div v-else class="selection_place no_project">
                <router-link to="/Projects" class="card project">
                    <img class="card-img-top" src="@/assets/no_project.png" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text" style="color: #6DD0F6; text-decoration: underline">Pregledajte dostupne projekte ovdje</p>
                    </div>
                </router-link>

                <br><span class="inactive_subtitle">Prvi odabir</span>

                <div class="selected_project_options">
                    <button type="button"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="disabled_button">Ukloni odabir</button>
                    <button type="button"><i class="fas fa-chevron-right"></i></button>                    
                </div>       
            </div>

            <div v-if="second_choice" class="selection_place">
                <router-link v-bind:to="'/ProjectInfo/' + second_choice.id" class="card project">
                    <img class="card-img-top" v-bind:src="second_choice.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{second_choice.company}}</h5>
                        <p class="card-text">{{second_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Drugi odabir</span>

                <div v-if="!selectionConfirmed" class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative(second_choice.id)"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('second_choice', second_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive(second_choice.id)"><i class="fas fa-chevron-right"></i></button>                    
                </div>         
            </div>   
            <div v-else class="selection_place no_project">
                <router-link to="/Projects" class="card project">
                    <img class="card-img-top" src="@/assets/no_project.png" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text" style="color: #6DD0F6; text-decoration: underline">Pregledajte dostupne projekte ovdje</p>
                    </div>
                </router-link>

                <br><span class="inactive_subtitle">Drugi odabir</span>

                <div class="selected_project_options">
                    <button type="button"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="disabled_button">Ukloni odabir</button>
                    <button type="button"><i class="fas fa-chevron-right"></i></button>                    
                </div>       
            </div>

            <div v-if="third_choice" class="selection_place">
                <router-link v-bind:to="'/ProjectInfo/' + third_choice.id" class="card project">
                    <img class="card-img-top" v-bind:src="third_choice.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{third_choice.company}}</h5>
                        <p class="card-text">{{third_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Treći odabir</span>

                <div v-if="!selectionConfirmed" class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative(third_choice.id)"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('third_choice', third_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive(third_choice.id)"><i class="fas fa-chevron-right"></i></button>                    
                </div>             
            </div>
            <div v-else class="selection_place no_project">
                <router-link to="/Projects" class="card project">
                    <img class="card-img-top" src="@/assets/no_project.png" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text" style="color: #6DD0F6; text-decoration: underline">Pregledajte dostupne projekte ovdje</p>
                    </div>
                </router-link>

                <br><span class="inactive_subtitle">Treći odabir</span>

                <div class="selected_project_options">
                    <button type="button"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="disabled_button">Ukloni odabir</button>
                    <button type="button"><i class="fas fa-chevron-right"></i></button>                    
                </div>       
            </div>
        </div>
    </div>

    <div v-if="!selectionConfirmed" class="row mt-5" style="text-align: center">
        <button class="alert_button" data-toggle="modal" data-target="#send_selection" style="display: inline-block; margin: 0 auto;">Pošalji svoj odabir</button>
    </div>
</div>
</template>

<script>
import store from '@/store.js';
import { Projects, Auth } from '@/services'

export default {
    name: 'SelectedProjects',
    data(){
        return{
            store,
            auth: Auth.state,
            project_list: false,

            first_choice: false,
            second_choice: false,
            third_choice: false,
            selectionConfirmed: false,
        }
    },
    methods:{
        async send_project_selection(){
            await Projects.submit_projects([this.first_choice.id, this.second_choice.id, this.third_choice.id]);
            this.updateCurUser();
        },
        updateCurUser(){
            let user_data = this.auth.user_data;
            user_data.chosenProjects = [this.first_choice.id, this.second_choice.id, this.third_choice.id];

            localStorage.setItem('user', JSON.stringify(user_data));
            console.log(localStorage.getItem('user'))
            this.selectionConfirmed = true;
        },

        // Mijenja prioritet svakog projekta za +1
        shift_priority_positive(projectid){
            let selected_projects = this.project_list;

            const object_index = selected_projects.findIndex(project => project.id == projectid);

            let project = selected_projects[object_index];
            if(project.priority == 3 || selected_projects.length == project.priority){
                project.priority = 1;
                selected_projects[0].priority = object_index + 1
            }
            else{
                project.priority++;
                selected_projects[object_index + 1].priority = object_index + 1
            }

            this.update_projects(selected_projects)
            this.set_projects();
        },

        // Mijenja prioritet svakog projekta za -1
        shift_priority_negative(projectid){
            let selected_projects = this.project_list;

            const object_index = selected_projects.findIndex(project => project.id == projectid);

            let project = selected_projects[object_index];
            if(project.priority == 1){
                project.priority = selected_projects.length;
                selected_projects[selected_projects.length - 1].priority = object_index + 1
            }
            else{
                project.priority--;
                selected_projects[object_index - 1].priority = object_index + 1
            }
            
            this.update_projects(selected_projects)
            this.set_projects();
        },

        // Cita projekte iz localstorage i sortira ih po prioritetu
        async get_projects(){
            if(this.selectionConfirmed){
                if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
                this.project_list = this.store.getSelectedProjects(this.auth.user_data.chosenProjects);
            }
            else{
                this.project_list = JSON.parse(localStorage.getItem('selected_projects'));
                this.project_list.sort(function (a, b){return a.priority - b.priority})                
            }
        },
        // Update projekata u localstorage
        update_projects(selected_projects){
            selected_projects.sort(function (a, b){return a.priority - b.priority})
            localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
        },

        // Dohvati i postavi projekte u varijable
        async set_projects(){
            await this.get_projects();
            if(!this.project_list) return;

            this.first_choice = this.project_list[0];
            this.second_choice = this.project_list[1];
            this.third_choice = this.project_list[2];
        },

        // Ukloni projekt iz liste odabranih
		unselect_project(choice, projectid){
            this.project_list = this.project_list.filter(project => project.id != projectid);
            this.project_list.map((project, index) => project.priority = index+1);

            this.update_projects(this.project_list);
            
            if(choice == 'first_choice') this.first_choice = false;
            else if(choice == 'second_choice') this.second_choice = false;
            else if(choice == 'third_choice') this.third_choice = false;
        },
    },
    mounted(){
        const user_type = this.auth.account_type;
        
        if(!(user_type == "Student" || user_type == "Admin")) console.log("No access")//this.$router.push({ name: 'Home' });
        else if(user_type == "Student"){
            if(this.auth.user_data.chosenProjects) this.selectionConfirmed = true;
            this.set_projects();
        }
    }

}
</script>

<style>

.no_project > .project{background: #636466;}

.selected_projects{
    width: 100%;
    text-align: center;
}
.selection_place{
    display: inline-block;
    margin: 0 3%;
}

.selected_project_options{ white-space: nowrap }
.selected_project_options > *{display: inline-block; margin: 0 auto;}
.selected_project_options > button > .fas{color: #6DD0F6}
.no_project > .selected_project_options > button > .fas{color: #636466}

.active_subtitle{
    font-weight: bold;
    color: #6DD0F6;

    margin: 25px 0;
}
.inactive_subtitle{
    font-weight: bold;
    color: #636466;

    margin: 25px 0;
}
</style>