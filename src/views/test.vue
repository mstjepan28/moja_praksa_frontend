<template>
<div>
    <StudentCard :info="student_info"/>
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