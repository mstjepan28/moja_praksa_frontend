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
            <button type="button" class="button_design" v-on:click="download_file">Preuzmi predložak dnevnika prakse</button>
            <button type="button" class="button_design mt-3" v-on:click="create_file">Predaj dnevnik prakse</button>
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

import {Auth} from "@/services/index.js";

export default {
    components: { FilePond },
    data(){
        return { 
            myFiles: [],
            file_data: false,
            file_error: false,
        }
    },
    methods: {
        create_file(){
            this.file_error = false;
            const file = this.$refs.pond.getFiles()[0]

            if(!file) return;
            else if(file.fileSize > 10000000){
                console.log(file.fileSize)
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

            this.upload_file();
        },
        async upload_file(){
            const response = await Auth.upload_journal(this.file_data);
        },
        download_file(){
            // Hanamichi Sakuragi, Morioh.com, 'Download Files with Axios and Vue' https://morioh.com/p/f4d331b62cda
            if(!this.file_data) return;

            const fileLink = document.createElement('a');

            fileLink.href = this.file_data.fileData;
            fileLink.setAttribute('download', this.file_data.fileName);
            document.body.appendChild(fileLink);

            fileLink.click();
        },
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