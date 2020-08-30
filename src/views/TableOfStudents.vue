<template>
<div>
    <h4 class="mt-5 subtitles">Tablica studenata</h4>
    <div style="overflow: auto; max-height: 500px">
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

                <div class="col"> Dojmovi </div>
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
export default {
    components:{ TableRow },
    data(){
        return{
            student_list: false,
            account_type: Auth.state.account_type,
        }
    },
    methods:{
		async getStudents(){
			this.student_list = await Students.getStudents();
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
    min-width: 10rem;
    max-width: 10rem;

    padding: 6px;
    font-size: 13px;
    display: table-cell;
    border: 1px solid hsl(202,10%,88%);
}

</style>