<template>
<div>
    <section v-if="project_list" style="text-align: center;">
        <vue-horizontal-list :items="project_list" :options="store.carousel_options" >
            <template v-slot:default="{item}">
                <div class="card project" v-on:click="showStudents(item.id)">
                    <img class="card-img-top" :src="item.img_url" alt="Card image cap" >
                    
                    <div class="card-body">
                        <h5 class="card-title">{{item.company}}</h5>
                        <p class="card-text">{{item.project_description}}</p>
                    </div>
                </div>
            </template>
        </vue-horizontal-list>
    </section><hr>

    <div v-if="isSelected">
        <div class="row text-center h-100">
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector" :class="{ active: isActive == 1 }" v-on:click="showSelection(1)"> Prvi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector" :class="{ active: isActive == 2 }" v-on:click="showSelection(2)"> Drugi izbor </div>
            </div>
            <div class="col-md-4 col-sm-12 my-auto">
                <div class="priority_selector" :class="{ active: isActive == 3 }" v-on:click="showSelection(3)"> Treči izbor </div>
            </div>
        </div><hr>

        <div v-if="isActive == 1">
            <h4 class="subtitle">Prvi izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.first_choice" class="col">

                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao prvi izbor
                </div>
            </div>
        </div>
        <div v-if="isActive == 2">
            <h4 class="subtitle mt-5">Drugi izbor:</h4>
            <div class="row" style="border: 2px solid #6DD0F6">
                <div v-if="student_list.first_choice" class="col">

                </div>
                <div v-else class="no_info_message" style="padding: 40px">
                    Niti jedan student nije ovaj projekt stavio kao drugi izbor
                </div>
            </div>
        </div>
        <div v-if="isActive == 3">
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
            isActive: 1,
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
        },
        showSelection(selection){
            this.isActive = selection;
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
}
.active{
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
}
</style>