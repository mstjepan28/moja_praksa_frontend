<template>
<div>
    <StudentCard :key="i" :info="student_info" v-for="i in [1,2,3,4,5]"/>
</div>
</template>

<script>
import StudentCard from '@/components/student_card';
import { Auth } from '@/services'
export default {
    components: {StudentCard},
    data(){
        return {
            student_info: Auth.state.user_data,
        }
    }

}
</script>

<style>

</style>