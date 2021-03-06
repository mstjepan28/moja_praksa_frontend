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

	<div class="row option_buttons h-100 mt-3">
		<div class="col-md-7 col-sm-0"></div>

		<div class="col-md-4 col-sm-12 my-auto mt-3">
			<div class="input_wrapper d-flex justify-content-center">
				<input type="text" placeholder="Pretraživanje..." v-model="search_phrase"/>
				<span><i class="fas fa-search"></i></span>
			</div>
		</div>
		
		<div class="col-md-1 col-sm-12 my-auto mt-3" >
			<div class="btn-group">
				<button type="button" class="button_design sort_button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > Sortiraj </button>

				<div class="dropdown-menu dropdown-menu-right" style="font-weight: bold; color: #6DD0F6;">
					<div class="dropdownHeader" style="text-align: center"> 
						<h5>Sortiraj po: </h5>
					</div>

					<div class="dropdownBody">                   
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'company', type: 'string'}"> Naziv poslodavca
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'views', type: 'number'}"> Pregledi
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'date_created', type: 'number'}"> Datum dodavanja
						</div>

						<div class="row mr-2 ml-2">
							<div class="col-6">
								<input type="radio" name="sort" v-on:click="sortItems('asc')"> Uzlazno
							</div>
							<div class="col-6">
								<input type="radio" name="sort" v-on:click="sortItems('desc')"> Silazno
							</div>							
						</div>						
					</div>

				</div>
			</div>
		</div>
	</div><hr>

	<div class="text-center">
		<h1 class="title">Projekti</h1>
		<p class="description_text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
			Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
			Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
			Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
		</p>
	</div><hr>

	<div v-if="project_list" class="row d-flex content-justify-center">
		<ProjectCard v-bind:key="project.id" v-bind:info="project" v-for="project in project_list"/>
	</div>

	<div class="d-flex content-justify-center">
		<paginate
			v-if="total_pages"
			v-model="page"
			
			:page-count="total_pages"
			
			:prev-text="prev"
			:next-text="next"

			:click-handler="clickCallback"

			:container-class="'pagination'"
			:page-class="'pagination_buttons'"
			:prev-class="'pagination_buttons'"
			:next-class="'pagination_buttons'"

			style="margin: 0 auto;"
		>
			<span slot="prevContent">Changed previous button</span>
			<span slot="nextContent">Changed next button</span>
			<span slot="breakViewContent">
				<svg width="16" height="4" viewBox="0 0 16 4">
					<circle fill="#999999" cx="2" cy="2" r="2" />
					<circle fill="#999999" cx="8" cy="2" r="2" />
					<circle fill="#999999" cx="14" cy="2" r="2" />
				</svg>
			</span>
		</paginate>
	</div>
</div>
</template>

<script>
import _ from 'lodash';
import { VueFlux, FluxPreloader } from 'vue-flux';

import ProjectCard from '@/components/project_card';
import Paginate from 'vuejs-paginate';

import store from '@/store.js';
import { Projects, App } from '@/services'

export default {
	components: {
		VueFlux,
		FluxPreloader,

		ProjectCard,
		Paginate
	},
	data() {
		return{
			store,
			project_list: null,

			search_phrase: null,
			filter_params:{},

			total_pages: null,
			prev: "<i class='fas fa-chevron-left'></i>",
			next: "<i class='fas fa-chevron-right'></i>",
			page: 1,
			items_per_page: 6,

			sort_values: false,
		}
	},
	methods:{
		sortItems(sort_order){
			if(!this.sort_values) return;
			this.store.sort_items(this.sort_values, sort_order, "project_list");

			this.getProjects();
		},

		async getTotalPages(){
			const total_items = await App.getDocAmount();
			this.total_pages = Math.ceil(total_items.projectsCounter / this.items_per_page);
		},
		
		async searchProjects(search){
			const result = await Projects.getProjects(search);

			this.total_pages = Math.ceil(result.length / this.items_per_page);

			this.store.project_list = result;
			this.project_list = this.store.project_list.slice(0, this.items_per_page);
		},

		async getProjects(){
			if(!this.store.project_list) this.store.project_list = await Projects.getProjects();
			this.project_list = this.store.project_list.slice(0, this.items_per_page);
		},

		async clickCallback(pageNum){
			const first_item = pageNum * this.items_per_page - this.items_per_page + 1 
			const last_item = pageNum * this.items_per_page

			const saved_projects = this.store.project_list
			if(saved_projects.length < last_item && saved_projects.length >= first_item){
				this.project_list = this.store.project_list.slice(first_item-1, saved_projects.length+1)
			}
			else{
				this.project_list = this.store.project_list.slice(first_item-1, last_item)
			}
		}
	},
	async mounted(){
		this.getTotalPages();
		this.getProjects();
	},
	watch:{
		"search_phrase": _.debounce(function(search){this.searchProjects(search)}, 500)
	},
	name:'Projects'
}
</script>

<style>
</style>