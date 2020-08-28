<template>
<div>
    <div class="row table_row">
        <div v-if="account_type == 'Admin'" class="col">{{info.name}}</div>
        <div v-if="account_type == 'Admin'" class="col">{{info.surname}}</div>
        <div class="col">{{info.jmbag}}</div>
        <div class="col">{{info.year}}</div>

        <div class="col" v-if="info.application">{{info.application.company}}</div>
        <div class="col" v-else> - </div>
    </div>
</div>
</template>

<script>

import { Auth } from "@/services/index.js";

export default {
    props: ['info'],
    data(){
        return{
            account_type: Auth.state.account_type
        }
    }
}
</script>

<style>
.table_row > .col{
    padding: 6px;
    font-size: 13px;
    border: 1px solid hsl(202,10%,88%);
}
</style>