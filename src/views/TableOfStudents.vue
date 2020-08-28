<template>
<div>
    <h2 class="mt-5 subtitles">Tablica studenata</h2>
    <div style="overflow: auto">
        <div class="table">
            <div class="row flex-nowrap mt-1 table_header">
                <div v-if="account_type == 'Admin'" class="col"> Ime </div>
                <div v-if="account_type == 'Admin'" class="col"> Prezime </div>
                <div class="col"> JMBAG </div>
                <div class="col"> Godina studija </div>

                <div class="col"> Praksa </div>
                <div class="col"> Status </div>

                <div class="col"> Prijavnica </div>
                <div class="col"> Dnevnik Prakse </div>
            </div>

            <div v-if="student_list">
                <TableRow :key="student.id" :info="student" v-for="student in student_list"/>
            </div>
        </div>
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
            account_type: Auth.state.account_type,
        }
    },
    methods:{
		async getStudents(){
			if(!this.store.student_list) this.store.student_list = await Students.getStudents();
			this.student_list = this.store.student_list;
        },
    },
    mounted(){
        if(!(this.account_type == "Student" || this.account_type == "Admin")) this.$router.push({ name: 'Home' });
        this.getStudents();
    }
}
</script>

<style>
.table{
    display: table;
    margin-left: 15px;
    overflow: scroll;
}
.table_header{
    background: #F8F8F8;
}
.table_header > .col{
    color: #333333;
    min-width: 6rem;
    padding: 6px;
    border: 1px solid hsl(202,10%,88%);
}

</style>