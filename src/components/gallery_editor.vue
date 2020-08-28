<template>
<div>
    <div v-if="uploaded" class="text-center finished" :style="{'background-image': 'url(' + imgUrl + ')'}">
        <h2 style="background-color: rgba(0, 0, 0, 0.7)">Dodana nova slika!</h2>

        <button class="row col button_design mt-5" v-on:click="closeGallery"> Uredu </button>
    </div>

    <div v-else-if="deleted" class="text-center finished">
        <h2 style="background-color: rgba(0, 0, 0, 0.7)">Slika izbrisana!</h2>

        <button class="row col button_design mt-5" v-on:click="closeGallery"> Uredu </button>
    </div>

    <div v-else-if="user_data.account_type == 'Poslodavac'" class="journal">
        <h3> Vaše slike </h3><hr>
        
        <div class="row">
            <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'gallery' }" v-on:click="isActive = 'gallery'"> Galerija </div>
            
        </div>
        <div class="row mt-md-3">
            <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'logo' }" v-on:click="isActive = 'logo'"> Logo </div>
            <div class="div_button" style="color: #6DD0F6" :class="{ active: isActive == 'header' }" v-on:click="isActive = 'header'"> Dodaj novu sliku</div> 
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
            <button type="button" class="button_design" v-on:click="uploadFile"> Dodaj sliku </button>
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
                :allow-multiple="false"

                labelMaxTotalFileSizeExceeded="'Premašena dozvoljena veličina slike!'"
                labelMaxTotalFileSize="'Maksimalna veličina iznosi 15MB'"
                maxTotalFileSize="15MB"
            />
            <button type="button" class="button_design" v-on:click="uploadFile"> Dodaj sliku </button>
        </div>
        
        <div v-else-if="isActive == 'gallery'">
            <div v-if="user_data.headers">
                <div class="row" :key="img.name" :info="img.imgUrl" v-for="img in user_data.headers"  style="margin: .5rem 0;">
                    <img :src="img.imgUrl" class="col card-img-top border-top" style="padding: 0.1px">
                    <div class="w-100"></div>

                    <button type="button" class="col alert_button border-bottom" v-on:click="deleteImage(img.name)"> Ukloni</button>
                </div>
            </div>
            <div v-else>
                <span class="no_info_message"> Slike koje dodate će se prikazivati ovdje</span>
            </div><br>
        </div>
    </div>

    <div v-else-if="user_data.account_type == 'Student'" class="journal">
        <div v-if="isActive = 'logo'">
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
                maxFileSize="10MB"
            />
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10 button_design div_button" v-on:click="uploadFile"> Postavi sliku profila </div>
                <div class="col-1"></div>
            </div>
        </div>
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

/* global firebase */ //ESLint, bez toga firebase je undefined posto je globalna varijabla
import { Auth, Partners, App } from '@/services'
import store from '@/store.js';

export default {
    components: { FilePond },
    props: ['info'],
    data(){
        return {
            store,
            user_data: false,
            myFiles: [],

            uploaded: false,
            deleted: false,

            isActive: 'gallery',
            imgUrl: false
        }
    },
    methods: {
        async uploadFile(){
            const file = this.$refs.pond.getFiles()[0]
            if(!file) return;

            let fileName = '';
            if(this.isActive == 'logo') fileName = this.isActive + '_' + this.user_data.email + '.png';
            else fileName = this.isActive + '_' + Date.now() + '.png';

            console.log(fileName)            

            const result = await firebase.storage().ref(fileName).putString(file.getFileEncodeDataURL(), 'data_url');
            const imgUrl = await result.ref.getDownloadURL();

            this.updateUser({ name: fileName, imgUrl: imgUrl});
        },
        updateUser(newImage){
            let update_user = {
                user: false,

                get Poslodavac_logo(){
                    this.user.logo = newImage;
                    this.updatePartner();

                    return true
                },
                get Poslodavac_header(){
                    if(!this.user.headers) this.user.headers = []
                    this.user.headers.push(newImage);

                    this.updatePartner();
                    return true
                },
                get Student_logo(){
                    this.user.logo = newImage;

                    localStorage.setItem('user', JSON.stringify(this.user));
                    App.updateUser(this.user, 'true');

                    return true
                },

                async updatePartner(){
                    await Partners.UpdatePartner(this.user, this.user.id, 'true');
                    this.store.partner_list = await Partners.getPartners();
                }
            }

            update_user.user = this.user_data;
            update_user.store = this.store;

            update_user[this.user_data.account_type + "_" + this.isActive];

            this.imgUrl = newImage.imgUrl;
            this.uploaded = true;

            this.$emit('updateHeaders');
        },
        async deleteImage(image_name){
            await firebase.storage().ref(image_name).delete();
            
            this.user_data.headers = this.user_data.headers.filter(image => image.name != image_name);
            if(!this.user_data.headers.length) this.user_data.headers = false;

            await Partners.UpdatePartner(this.user_data, this.user_data.id, 'true');
            this.store.partner_list = await Partners.getPartners();

            this.deleted = true;
            this.$emit('updateHeaders');
        },
        closeGallery(){
            this.uploaded = false;
            this.deleted = false;

            this.$emit('close_gallery');
        }
    },
    mounted(){
        if(Auth.state.account_type == "Student") this.user_data = Auth.state.user_data;
        else this.user_data = this.info;
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

.border-top{
    border-radius: 10px 10px 0 0;
}
.border-bottom{
    border-radius: 0 0 10px 10px;
}

.finished{
    padding: 1.5rem 1rem;

    color: white;

    border-radius: 10px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
