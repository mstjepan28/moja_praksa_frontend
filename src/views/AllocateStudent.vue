<template>
<div>

</div>
</template>

<script>
import { Auth, Projects } from '@/services';
import store from '@/store.js';

export default {
    data(){
        return{
            store,
            selected_projects: null,
        }
    },
    methods:{
		async getStudents(){
			//if(!this.store.student_list) this.store.student_list = await Students.getStudents();
            const student_info = Auth.state.user_data//this.store.student_list.filter(student => student._id == this.id)[0]

            this.getSelectedProjects(student_info)
        },
        async getSelectedProjects(student){
            if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
            console.log(student)

            //this.selected_projects = student.forEach()
            
            this.selected_projects = this.store.project_list.slice(0, 3);
        }
    },
    mounted(){
        this.getStudents();
    }
}
</script>

<style>

</style>