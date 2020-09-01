<template>
<div>
    <div v-if="show_more" class="row mb-4 mr-md-5 ml-md-5 mt-5">
        <div class="col">
            <StudentCard :info="info" class="row" style="margin: 0 !important"/>
            <div class="row mt-3">
                <div class="col text-right">
                    <div class="div_button button_design mr-md-5"  style="widht: 100%" v-on:click="show_more = !show_more"> Prikaži manje </div>
                    <div class="div_button alert_button" v-on:click="$emit('select_student', info.id)"> Dodijeli projekt </div>
                </div>
            </div>
        </div>
    </div>

    
    <div v-else class="row student_small">
        <div class="col-md-6 col-sm-12 my-auto text-center basic_student_info overflow-hidden">
            <div>{{info.name + " " + info.surname}}</div>
            <div>{{info.jmbag}}</div>
            <div>{{info.year}}. godina</div>
        </div>

        <div class="col-md-1 col-sm-0"></div>
        <div class="col-md-2 col-sm-12 div_button my-auto text-center button_design" v-on:click="show_more = !show_more"> Detalji </div>

        <div class="col-md-1 col-sm-0"></div>
        <div v-if="allocated" class="col-md-2 col-sm-12 div_button my-auto text-center disabled_button" style="white-space: nowrap"> Projekt dodijeljen </div>
        <div v-else class="col-md-2 col-sm-12 div_button my-auto text-center alert_button" v-on:click="$emit('select_student', info.id)"> Dodijeli projekt </div>
    </div>
</div>
</template>

<script>

import { Projects } from "@/services/index.js";
import StudentCard from './student_card';

export default {
    props: ['info'],
    components: { StudentCard },
    data(){
        return{
            show_more: false,
            allocated: false
        }
    },
    methods:{
        async isAllocated(){
            const result = await Projects.getApprovedProject(this.info.id);
            if(result) this.allocated = true;
        }
    },
    mounted(){
        this.isAllocated();
    }
}
</script>

<style>
.student_small{
    border: 2px solid #6DD0F6;
    border-radius: 10px;

    margin: .5rem 3rem;
    padding: .5rem 3rem;
}
.basic_student_info{
    border: 2px solid #6DD0F6;
    border-radius: 10px;
    padding: .5rem 3rem;
}
.basic_student_info > div{
    white-space: nowrap;
    display: inline;
    margin: 0 .5rem
}
@media only screen and (max-width: 767px) {
	.student_small{
        margin: .5rem 0;
        padding: .5rem
    }
    .basic_student_info > div{
        display: block;
    }
}
@media only screen and (max-width: 1199px) {
    .basic_student_info > div{
        display: block;
    }
}
</style>