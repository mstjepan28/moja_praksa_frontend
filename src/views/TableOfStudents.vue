<template>
<div>
    <h2 class="mt-5 subtitles">Tablica studenata</h2>
    
    <div v-if="student_list">
        <TableRow :key="student.id" :info="student" v-for="student in student_list"/>
    </div>
</div>
</template>

<script>
import TableRow from '@/components/table_row';
import {Auth, Students} from "@/services/index.js";

import store from '@/store.js';
export default {
    components:{ TableRow },
    data(){
        return{
            store,
            student_list: false,

        }
    },
    methods:{
		async getStudents(){
			if(!this.store.student_list) this.store.student_list = await Students.getStudents();
			this.student_list = this.store.student_list;
        },
    },
    mounted(){
        const user_type = Auth.state.account_type;
        if(!(user_type == "Student" || user_type == "Admin")) this.$router.push({ name: 'Home' });
        this.getStudents();
    }
}
</script>

<style>

</style>