<template>
<div>
    <div class="row h-100 mt-5">
        <div class="col-md-3 col-sm-12 my-auto">
            <img v-if="user_data.avatar" class="profile_img" :src="user_data.avatar"/>
            <img v-else class="profile_img img-fluid" src="@/assets/Default.png" alt="Your profile picture"/>
        </div>
        <div class="col-md-9 col-sm-12 my-auto">
            <h5>{{user_data.name + " " + user_data.surname}}</h5>
            <h6>{{user_data.JMBAG}}</h6>
        </div>
    </div>
</div>
</template>

<script>
import {Auth} from "@/services/index.js";
import store from '@/store.js';

export default {
    data(){
        return {
            store,
            user_data: Auth.state.user_data
        }
    }
}
</script>

<style>
.profile_img{ border-radius: 100% }
</style>