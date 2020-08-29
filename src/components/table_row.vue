<template>
<div>
    <div class="row flex-nowrap table_row">
        <div v-if="account_type == 'Admin'" class="col">{{info.name}}</div>
        <div v-if="account_type == 'Admin'" class="col">{{info.surname}}</div>
        <div class="col">{{info.jmbag}}</div>
        <div class="col">{{info.year}}</div>

        <div class="col" v-if="info.application">{{info.application.company}}</div>
        <div class="col" v-else> - </div>

        <div class="col">{{getStudentStatus()}}</div>

        <div v-if="account_type == 'Admin'">
            <button v-if="info.application" class="col button_design" v-on:click="gotoApplicationForm"> Prijavnica </button>
            <button v-else class="col disabled_button"> Prijavnica </button>            
        </div>

        <div v-if="account_type == 'Admin'">
            <button v-if="info.journalID" class="col button_design" v-on:click="downloadJournal"> Dnevnik Prakse</button>
            <button v-else class="col disabled_button"> Dnevnik Prakse</button>            
        </div>

    </div>
</div>
</template>

<script>

import { Auth, App, Students } from "@/services/index.js";
import store from '@/store.js';

export default {
    props: ['info'],
    data(){
        return{
            store,
            account_type: Auth.state.account_type,
        }
    },
    methods:{
        getStudentStatus(){
            if(this.info.journalID) return 'Obavljena';
            if(this.info.application) return 'Dogovorena';
            if(this.getSelectedProjects()) return 'Odabrani projekti';

            return 'Nedefinirana';   
        },
        async getSelectedProjects(){
            const result = await App.getChosenProjects(this.info.id);
            if(result.length) return true;
            return false;
        },
        async downloadJournal(){
            const journal = await Students.getJournal(this.info.journalID);
            this.store.downloadFile(journal);
        },
        gotoApplicationForm(){
            this.$router.push({ path: '/ApplicationForm/' + this.info.id})
        }
    }
}
</script>

<style>
.table_row > .col,
.table_row > div > .col{
    min-width: 10rem;
    max-width: 10rem;

    padding: 6px;
    font-size: 13px;
    display: table-cell;
    border: 1px solid hsl(202,10%,88%);
}
</style>