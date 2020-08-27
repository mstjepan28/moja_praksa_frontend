<template>
<div class="journal">
    <h3> Vaše slike </h3><hr>
    
    <div class="row">
        <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'logo' }" v-on:click="isActive = 'logo'"> Vaš logo </div>
    </div>
    <div class="row mt-md-3">
        <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'header' }" v-on:click="isActive = 'header'"> Dodaj novu sliku</div> 
        <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'gallery' }" v-on:click="isActive = 'gallery'"> Pregled postojećih slika</div>
    </div><hr>

    <div v-if="isActive == 'logo'">
        <file-pond
            class="filepond"
            name="test"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"

            image-crop-aspect-ratio="1"
            allowImageCrop="true"
            allowImageTransform="true"

            :files="myFiles"
            :allow-multiple="false"

            labelMaxFileSizeExceeded="Premašena dozvoljena veličina slike!"
            labelMaxFileSize="Maksimalna veličina iznosi 5MB"
            maxFileSize="5MB"
        />
        <div v-if="error_message">
            <small  style="color: red"> {{error_message}} </small><br>
        </div>
        <button type="button" class="button_design" v-on:click="uploadFiles"> createFiles </button>
    </div>

    <div v-else-if="isActive == 'header'" class="mt-4">
        <file-pond
            class="filepond"
            name="test"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"

            image-crop-aspect-ratio="16:9"
            allowImageCrop="true"
            allowImageTransform="true"
            
            :files="myFiles"
            :allow-multiple="true"
            max-files="4"

            labelMaxTotalFileSizeExceeded="'Premašena dozvoljena veličina slike!'"
            labelMaxTotalFileSize="'Maksimalna veličina iznosi 15MB'"
            maxTotalFileSize="15MB"
        />
        <div v-if="error_message">
            <small  style="color: red"> {{error_message}} </small><br>
        </div>
        <button type="button" class="button_design" v-on:click="uploadFiles"> createFiles </button>
    </div>
    
    <div v-else-if="isActive == 'gallery'">
        <div class="row" :key="img" :info="img" v-for="img in store.vfImages_partners"  style="margin: .5rem 0;">
            <img :src="img" class="col card-img-top border-top" style="padding: 0.1px">

            <div class="w-100"></div>

            <button type="button" class="col alert_button border-bottom"> Ukloni</button>
        </div><br>
    </div>

    
</div>
</template>

<script>

import store from '@/store.js';

import _ from 'lodash';

// FilePond https://pqina.nl/filepond/docs/patterns/frameworks/vue/
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,

    FilePondPluginFileEncode,

    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
)

export default {
    components: { FilePond },
    data(){
        return {
            store,
            myFiles: [],
            error_message: false,

            isActive: 'logo',

            response_message: null,
        }
    },
    methods: {
        createFiles(rawFiles){
            if(!rawFiles) return [];
            
            return rawFiles.map(file => { 
                return{
                    fileSize: file.fileSize,
                    fileName: file.filename,
                    fileExtention: file.fileExtension,
                    filenameWithoutExtension: file.filenameWithoutExtension,
                    fileData: file.getFileEncodeDataURL()
                }
            });
        },
        uploadFiles(){
            const processedFiles = this.createFiles(this.$refs.pond.getFiles());
            console.log(processedFiles)

            /*
            processedFiles.forEach(file => {
                const fileLink = document.createElement('a');

                fileLink.href = file.fileData;
                fileLink.setAttribute('download', file.fileName);
                document.body.appendChild(fileLink);

                fileLink.click();
            })
            */
        }
    },
	watch:{
		"error_message": _.debounce(function(){this.error_message = false}, 10000)
	},
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

.border-top{
    border-radius: 10px 10px 0 0;
}
.border-bottom{
    border-radius: 0 0 10px 10px;
}
</style>
