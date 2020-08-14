<template>
<div class="journal mt-4">
    <div class="row"> <h2>Predajte popunjeni dnevnik prakse</h2> </div>
    
    <div class="mt-4">
        <file-pond
            class="filepond"
            name="test"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
            v-bind:files="myFiles"
        />
    </div>
    <small v-if="file_error == 'size_error'" style="color: red"> Predana datoteka smije najviše imati 10MB </small>


    <div class="row mt-4">
        <div class="col-md-3 col-sm-0"></div>
        
        <div class="col-md-6 col-sm-12 buttons">
            <button v-if="template" type="button" class="button_design" v-on:click="download_file">Preuzmi predložak dnevnika prakse</button>
            <button v-else type="button" class="disabled_button" disabled>Preuzmi predložak dnevnika prakse</button>

            <button v-if="auth.account_type == 'Student'" type="button" class="button_design mt-3" v-on:click="create_file">Predaj dnevnik prakse</button>
            <button v-if="auth.account_type == 'Admin'" type="button" class="button_design mt-3" v-on:click="create_file">Postavi predložak dnevnika prakse</button>
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

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
)

import {Auth, App, Content} from "@/services/index.js";

export default {
    components: { FilePond },
    data(){
        return { 
            myFiles: [],
            file_data: false,
            file_error: false,
            template: false,

            auth: Auth.state,
        }
    },
    methods: {
        create_file(){
            this.file_error = false;
            const file = this.$refs.pond.getFiles()[0]

            if(!file) return;
            else if(file.fileSize > 10000000){
                this.$refs.pond.removeFiles();
                this.file_error = 'size_error'
                return;
            }

            this.file_data = {
                fileSize: file.fileSize,
                fileName: file.filename,
                fileExtention: file.fileExtension,
                filenameWithoutExtension: file.filenameWithoutExtension,
                fileData: file.getFileEncodeDataURL()
            }

            if(this.auth.account_type == 'Student') this.upload_journal();
            else if(this.auth.account_type == 'Admin') this.upload_template()
        },

        async upload_journal(){
            const response = await App.upload_journal(this.file_data);
            console.log(response)
        },

        async upload_template(){
            const response = await App.upload_template(this.file_data);
            console.log(response)
        },

        async get_template(){
            const result = await Content.get_journal_template();
            if(result) this.template = 0//result
        },

        download_file(){
            // Hanamichi Sakuragi, Morioh.com, 'Download Files with Axios and Vue' https://morioh.com/p/f4d331b62cda
            const fileLink = document.createElement('a');

            fileLink.href = this.template.fileData;
            fileLink.setAttribute('download', this.template.fileName);
            document.body.appendChild(fileLink);

            fileLink.click();
        },
    },
    mounted(){
        this.get_template();
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
