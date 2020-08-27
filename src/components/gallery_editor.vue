<template>
<div>
    <div v-if="finished">
        <h2>Dodana nova slika!</h2>
        <div class="row"><div class="col button_design div_button" v-on:click="$emit('close_galley')"> Uredu </div></div>
    </div>

    <div v-if="user_data.account_type == 'Poslodavac' && !finished" class="journal">
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
            <button type="button" class="button_design" v-on:click="uploadFile"> createFiles </button>
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
            <button type="button" class="button_design" v-on:click="uploadFile"> createFiles </button>
        </div>
        
        <div v-else-if="isActive == 'gallery'">
            <div class="row" :key="img" :info="img" v-for="img in store.vfImages_partners"  style="margin: .5rem 0;">
                <img :src="img" class="col card-img-top border-top" style="padding: 0.1px">

                <div class="w-100"></div>

                <button type="button" class="col alert_button border-bottom"> Ukloni</button>
            </div><br>
        </div>
    </div>

    <div v-if="user_data.account_type == 'Student' && !finished" class="journal">
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
                maxFileSize="5MB"
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

import store from '@/store.js';

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

export default {
    components: { FilePond },
    data(){
        return {
            store,
            user_data: Auth.state.user_data,
            myFiles: [],

            finished: false,
            isActive: 'logo',
        }
    },
    methods: {
        async uploadFile(){
            const file = this.$refs.pond.getFiles()[0]
            if(!file) return;

            const fileName = this.isActive + '_' + this.user_data._id + '.png';

            const result = await firebase.storage().ref(fileName).putString(file.getFileEncodeDataURL(), 'data_url');
            const imgUrl = await result.ref.getDownloadURL();

            this.updateUser({ name: fileName, imgUrl: imgUrl});
        },
        updateUser(newImage){

            let update_user = {
                user: false,

                get Poslodavac_logo(){
                    this.user.img_url = newImage.imgUrl;
                    this.updatePartner();

                    return this.user;
                },
                get Poslodavac_header(){
                    if(!this.user.headers) this.user.headers = []
                    this.user.headers.push(newImage);
                    
                    this.updatePartner();

                    return this.user;
                },
                get Student_logo(){
                    this.user.avatar = newImage;
                    App.updateUser(this.user, 'true');

                    return this.user;
                },
                async updatePartner(){
                    await Partners.UpdatePartner(this.user, this.user._id, 'true');
                    this.store.partner_list = await Partners.getPartners();
                }
            }
            update_user.user = this.user_data;

            const updated_user = update_user[this.user_data.account_type + "_" + this.isActive];
            localStorage.setItem('user', JSON.stringify(updated_user));

            this.finished = true;
        }
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
</style>
