<template>
<div>
	<div class="modal fade" id="trigger_filter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" style="font-weight: bold; color: #6DD0F6;">Filter Projekata</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></button>
				</div>

				<div class="modal-body">
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Lokacija:</label>
							<input type="text">
						</div>
						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Tehnologije:</label>
							<input type="text">
						</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="disabled_button" data-dismiss="modal">Odustani</button>
					<button type="button" class="button_design" >Pretraži</button>
				</div>
			</div>
		</div>
	</div>

	<vue-flux
	class="row"
	:options="store.vfOptions"
	:images="store.vfImages_projects"
	:transitions="store.vfTransitions"
	ref="slider"
	>
	<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>

	<div class="row mt-3 h-100">
		<div class="col-md-8 col-sm-0"></div>

		<div class="filter_search col-md-4 col-sm-12 my-auto" style="text-align: right">
			<div class="search_projects mr-3">
				<input v-model="search_phrase" class="custom_input" type="text" placeholder="Pretraživanje..."/>
				<span><i class="fas fa-search"></i></span>
			</div>
			<button class="button_design filter_button" data-toggle="modal" data-target="#trigger_filter"><i class="fas fa-filter"></i></button>			
		</div>
	</div>

	<div class="row" style="text-align: center">
	<h1 class="title" style="margin-top: 0">Projekti</h1><br>
	<p class="description_text">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
		Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
		Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
		Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
	</p>
	</div>

	<div class="row" style="text-align: center;">
		<ProjectCard v-bind:key="project.id" v-bind:info="project" v-for="project in project_list_test"/>
	</div>

	<div class="row">
		<Pagination/>
	</div>
</div>
</template>

<script>
import _ from 'lodash';
import { VueFlux, FluxPreloader } from 'vue-flux';

import ProjectCard from '@/components/project_card';
import Pagination from '@/components/pagination';

import store from '@/store.js';
import { Projects, Content } from '@/services'

export default {
	components: {
		VueFlux,
		FluxPreloader,

		ProjectCard,
		Pagination
	},
	data() {
		return{
			project_list: null,
			project_list_test: null,
			page: 1,
			store,

			search_phrase: null,
			filter_params:{}
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
		},
		search_projects(search){
			this.project_list = Content.search_projects(search);
		}
	},
	async mounted() {
		this.change_page(1)
		this.project_list_test = await Projects.getProjects();
		//console.log(this.partner_list_test)
	},
	watch:{
		"search_phrase": _.debounce(search => this.search_projects(search), 500)
	},
	name:'Projects'
}
</script>

<style>

</style>