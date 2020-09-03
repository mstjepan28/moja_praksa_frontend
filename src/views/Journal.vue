<template>
<div class="journal mt-4">
    <div class="modal fade" id="response_message" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content text-center">

                <div class="modal-body text-center">
                    <h4>{{response_message}}</h4>

                    <div class="row mt-3">
                        <button type="button" class="col ml-5 mr-5 d-flex justify-content-center button_design" v-on:click="openReview"> Uredu </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="ReviewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <ReviewForm v-on:closeReview="closeReview" v-on:gotoTable="gotoTable"/>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="denyAccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body text-center">
					
                    <h4> Prije predaje dnevnika prijavnice morate predati prijavnicu te odraditi praksu!</h4>
                    Prijavnicu možete popuniti <button class="ModalGoto" v-on:click="gotoApplication">ovdje</button>
                    
                    <div class="row mt-3">
                        <button type="button" class="col ml-5 mr-5 d-flex justify-content-center button_design" v-on:click="denyAccess"> Uredu </button>
                    </div>
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
            <button v-if="user_type == 'Student'" type="button" class="button_design" v-on:click="createFile">Predaj dnevnik prakse</button>
            <button v-if="user_type == 'Admin'" type="button" class="button_design" v-on:click="createFile">Postavi predložak dnevnika prakse</button>

            <button type="button" class="button_design mt-3" v-on:click="getTemplate">Preuzmi predložak dnevnika prakse</button>
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

import ReviewForm from '@/components/review_form';

export default {
    components: { 
        FilePond,
        ReviewForm
    },
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
                $('#response_messatge').modal('show')
            }
            else this.store.downloadFile(templateJournal);
        },

        createFile(){
            const file = this.$refs.pond.getFile();
            if(!file) return;
            if(this.user_type == "Student"){
                this.checkAccess();
                return;
            }

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
            const result = await uploadFile[this.user_type];

            if(result){
                this.response_message = "Dnevnik Prakse uspješno predan";
                $('#response_message').modal({
                    backdrop: 'static',
                    keyboard: false,
                })               
            }
        },

        // Funkcije za otvaranje/zatvaranje bootstrap modala
        
        // Review modal handling
        openReview(){
            $('#response_message').modal('hide');

            if(this.response_message == "Trenutno ne postoji predložak dnevnika prakse") return;

            $('#ReviewModal').modal({
                backdrop: 'static',
                keyboard: false,
            })
        },
        closeReview(){
            $('#ReviewModal').modal('hide');
            this.$router.push({ name: 'Home' })
        },
        gotoTable(){
            $('#ReviewModal').modal('hide');
            this.$router.push({ name: 'TableOfStudents' })
        },


        // Check and deny access modal handling
        checkAccess(){
            const application = Auth.state.user_data.application;

            if(!application){
                $('#denyAccessModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                })
            }
        },
        denyAccess(){
            $('#denyAccessModal').modal('hide');
            this.$router.push({ name: 'Home' })
        },
        gotoApplication(){
            $('#denyAccessModal').modal('hide');
            this.$router.push({ name: 'FillApplicationForm' })
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
