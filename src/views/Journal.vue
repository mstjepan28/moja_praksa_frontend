<template>
<div class="journal mt-4">
    <div class="modal fade" id="response_message" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Predaja dnevnika prakse</h5>
                </div>

                <div class="modal-body">
                    <h4>{{response_message}}</h4>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="button_design" v-on:click="$router.push({ name: 'ApprovedProject' })" data-dismiss="modal">Uredu</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row"> <h2>Predajte dnevnik prakse</h2> </div>
    
    <div class="mt-4">
        <file-pond
            class="filepond"
            name="test"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"

            labelMaxFileSizeExceeded="Premašena dozvoljena veličina!"
            labelMaxFileSize="Maksimalna veličina iznosi 10MB"
            maxFileSize="10MB"

            v-bind:files="myFiles"
        />
    </div>

    <div class="row mt-4">
        <div class="col-md-3 col-sm-0"></div>
        
        <div class="col-md-6 col-sm-12 buttons">
            <button type="button" class="button_design" v-on:click="getTemplate">Preuzmi predložak dnevnika prakse</button>

            <button v-if="user_type == 'Student'" type="button" class="button_design mt-3" v-on:click="createFile">Predaj dnevnik prakse</button>
            <button v-if="user_type == 'Admin'" type="button" class="button_design mt-3" v-on:click="createFile">Postavi predložak dnevnika prakse</button>
        </div>
        <div class="col-md-3 col-sm-0"></div>
    </div>

</div>
</template>

<script>
// FilePond https://pqina.nl/filepond/docs/patterns/frameworks/vue/
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginFileEncode,
)

import {Auth, App} from "@/services/index.js";
import store from '@/store.js';

export default {
    components: { FilePond },
    data(){
        return {
            store,

            myFiles: [],
            template: false,

            response_message: null,

            user_type: Auth.state.account_type,
        }
    },
    methods: {
        async getTemplate(){
            const templateJournal = await App.get_journal_template();
            
            if(!templateJournal){
                this.response_message = "Trenutno ne postoji predložak dnevnika prakse";
                $('#response_message').modal('show')
            }
            else this.store.downloadFile(templateJournal);
        },

        createFile(){
            const file = this.$refs.pond.getFile();
            if(!file) return;

            this.UploadFile({
                fileName: file.filename,
                fileData: file.getFileEncodeDataURL()
            })
        },

        async UploadFile(newFile){
            let uploadFile = {
                get Admin(){ return App.upload_template(newFile)},
                get Student(){ return App.upload_journal(newFile)}
            }

            this.response_message = await uploadFile[this.user_type];
            $('#response_message').modal('show')
        }
    },
    mounted(){
        if(!(this.user_type == "Student" || this.user_type == "Admin")) 
            this.$router.push({ name: 'Home' });
    }
}
</script>

<style>
.journal{text-align: center;}
.journal > .row > * {
    display: inline-block;
    margin: 0 auto;
}

.buttons{text-align: center;}
.buttons > button{
    width: 100%;
    display: inline-block;
}
</style>
