<template>
<div>
    <vue-flux
      class="row"
      :options="store.vfOptions"
      :images="store.vfImages_partners"
      :transitions="store.vfTransitions"
      ref="slider"
    >
      <template v-slot:preloader> <flux-preloader /> </template>
    </vue-flux>

    <div class="row" style="text-align: center">
      <h1 class="title">Partneri</h1><br>
      <p class="description_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
        Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
        Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
        Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
      </p>
    </div>
    
    <div v-if="partner_list"><PartnerCard v-bind:key="partner.id" v-bind:info="partner" v-for="partner in partner_list"/></div>
</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';

import PartnerCard from '@/components/partner_card'

import store from '@/store.js';

export default {
	components: {
		VueFlux,
      FluxPreloader,
      
      PartnerCard
    },
    data(){
      return{
        store,
        partner_list: false
      }
    },
    methods:{
      get_partner_list(){
        this.partner_list = this.store.partner_list
      }
    },
    mounted(){
      this.get_partner_list();
    }
}
</script>

<style>

</style>