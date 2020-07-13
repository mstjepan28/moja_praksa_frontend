<template>
<div>
    <vue-flux
      class="row"
      :options="store.vfOptions"
      :images="store.vfImages_projects"
      :transitions="store.vfTransitions"
      ref="slider"
    >
      <template v-slot:preloader> <flux-preloader /> </template>
    </vue-flux>

    <div class="row" style="text-align: center">
      <h1 class="title">Projekti</h1><br>
      <p class="description_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
        Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
        Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
        Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
      </p>
    </div>

	<CompanyProjects v-bind:key="partner.id" v-bind:info="partner" v-for="partner in [1]"/>

</div>
</template>

<script>
import CompanyProjects from '@/components/company_projects';
import { VueFlux, FluxPreloader } from 'vue-flux';
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,

		CompanyProjects
	},
	data() {
		return{
			project_list: null,
			page: 1,
			store
		}
	},
	methods:{
		change_page(new_page){
			this.page = new_page
			this.project_list = this.store.project_list.slice(this.page * 9 - 9, this.page * 9)
		},
		get_projects_number(){
			return{
				'total_pages': this.store.project_list.length,
			}
		}
	},
	mounted() {
		this.change_page(1)
	},
	name:'Projects'
}
</script>

<style>
.title{
	width: default;
}
</style>