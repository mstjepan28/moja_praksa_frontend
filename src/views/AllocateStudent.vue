<template>
<div>
    <section v-if="project_list" style="text-align: center;">
        <vue-horizontal-list :items="project_list" :options="store.carousel_options" >
            <template v-slot:default="{item}">
                <div class="card project" v-on:click="showStudents(item.id)">
                    <img class="card-img-top" v-bind:src="item.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{item.company}}</h5>
                        <p class="card-text">{{item.project_description}}</p>
                    </div>
                </div>
            </template>
        </vue-horizontal-list>
    </section><hr>

    <div class="row d-flex justify-content-center">
        <span class="priority_selector"> Prvi izbor </span>
        <span class="priority_selector"> Drugi izbor </span>
        <span class="priority_selector"> Treči izbor </span>
    </div><hr>

    <div v-if="isSelected">
        <h4 class="subtitle">Prvi izbor:</h4>
        <div class="row" style="border: 2px solid #6DD0F6">
            <div v-if="student_list.first_choice" class="col">

            </div>
            <div v-else class="no_info_message" style="padding: 40px">
                Niti jedan student nije ovaj projekt stavio kao prvi izbor
            </div>
        </div>

        <h4 class="subtitle mt-5">Drugi izbor:</h4>
        <div class="row" style="border: 2px solid #6DD0F6">
            <div v-if="student_list.first_choice" class="col">

            </div>
            <div v-else class="no_info_message" style="padding: 40px">
                Niti jedan student nije ovaj projekt stavio kao drugi izbor
            </div>
        </div>

        <h4 class="subtitle mt-5">Treči izbor:</h4>
        <div class="row" style="border: 2px solid #6DD0F6">
            <div v-if="student_list.first_choice" class="col">

            </div>
            <div v-else class="no_info_message" style="padding: 40px">
                Niti jedan student nije ovaj projekt stavio kao treči izbor
            </div>
        </div>
    </div>

</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';

import { Auth, Projects } from '@/services';
import store from '@/store.js';

export default {
    components: { VueHorizontalList }, 
    data(){
        return{
            store,
            project_list: false,
            student_list: false,

            isSelected: false,
        }
    },
    methods:{
		async getProject(){
            if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
            this.project_list = this.store.project_list;
        },
        async showStudents(id){
            this.isSelected = true;
            this.student_list = await Projects.getProjectStudents(id);
        }
    },
    mounted(){
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
    text-decoration: underline;
}
</style>