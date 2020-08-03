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
                    <img class="card-img-top" v-bind:src="first_choice.img" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text">{{first_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Prvi odabir</span>

                <div class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('first_choice', first_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive"><i class="fas fa-chevron-right"></i></button>                    
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
                    <img class="card-img-top" v-bind:src="second_choice.img" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text">{{second_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Drugi odabir</span>

                <div class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('second_choice', second_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive"><i class="fas fa-chevron-right"></i></button>                    
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
                    <img class="card-img-top" v-bind:src="third_choice.img" alt="Card image cap" >
                    
                    <div class="card-body">
                        <p class="card-text">{{third_choice.project_description}}</p>
                    </div>
                </router-link>

                <br><span class="active_subtitle">Treći odabir</span>

                <div class="selected_project_options">
                    <button type="button" v-on:click="shift_priority_negative"><i class="fas fa-chevron-left"></i></button>
                    <button type="button" class="button_design" v-on:click="unselect_project('third_choice', third_choice.id)">Ukloni odabir</button>
                    <button type="button" v-on:click="shift_priority_positive"><i class="fas fa-chevron-right"></i></button>                    
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

    <div class="row mt-5" style="text-align: center">
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

            first_choice: false,
            second_choice: false,
            third_choice: false
        }
    },
    methods:{
        async send_project_selection(){
            const selection = {firstPriority: this.first_choice.id, secondPriority: this.second_choice.id, thirdPrioirity: this.third_choice.id};
            const result = await Projects.submit_projects(selection);
            console.log("Project selection result: ", result)
        },
        adjust_priority(){
            let result = JSON.parse(localStorage.getItem('selected_projects'));
            if(!(result && result.length >= 1)) return;

            result.sort(function (a, b){return a.priority - b.priority})

            localStorage.setItem('selected_projects', JSON.stringify(result));
        },
        get_projects(){
            const result = JSON.parse(localStorage.getItem('selected_projects'));
            if(!(result && result.length >= 1)) return;
            
            this.first_choice = result[0];
            this.second_choice = result[1];
            this.third_choice = result[2];
        },

		unselect_project(choice, project_id){
			let selected_projects = JSON.parse(localStorage.getItem('selected_projects'));
            selected_projects = selected_projects.filter(project => project.id != project_id);
            
            selected_projects.map((project, index) => project.priority = index+1)
            localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
            
            if(choice == 'first_choice') this.first_choice = false;
            else if(choice == 'second_choice') this.second_choice = false;
            else if(choice == 'third_choice') this.third_choice = false;
        },
        
        shift_priority_positive(){
            let selected_projects = JSON.parse(localStorage.getItem('selected_projects'));

            selected_projects.map(project => {
                if(project.priority == 3 || selected_projects.length == project.priority) project.priority = 1;
                else project.priority++
            });
            selected_projects.sort(function (a, b){return a.priority - b.priority})
            
            localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
            this.get_projects();
        },
        shift_priority_negative(){
            let selected_projects = JSON.parse(localStorage.getItem('selected_projects'));

            selected_projects.map(project => {
                if(project.priority == 1) project.priority = selected_projects.length;
                else project.priority--
            });
            selected_projects.sort(function (a, b){return a.priority - b.priority})
            
            localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
            this.get_projects();
        },
    },
    mounted(){
        if(!Auth.isStudent()){
            console.log("no access");
            this.$router.push({ name: 'Home' });
        }
        this.adjust_priority();
        this.get_projects();
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