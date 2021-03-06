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
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'date_created', type: 'string'}"> Datum dodavanja
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
		<h1 class="title">Partneri</h1>
		<p class="description_text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
			Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
			Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
			Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
		</p>
	</div><hr>

	<div v-if="partner_list">
		<PartnerCard :key="partner.id" :info="partner" v-for="partner in partner_list"/>
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
import Paginate from 'vuejs-paginate';

import PartnerCard from '@/components/partner_card';

import store from '@/store.js';
import { Partners, App } from '@/services'

export default {
	components: {
		VueFlux,
		FluxPreloader,
		Paginate,

		PartnerCard,
	},
	data(){
		return{
			store,
			partner_list: false,

			search_phrase: null,
			filter_params:{},

			total_pages: null,
			prev: "<i class='fas fa-chevron-left'></i>",
			next: "<i class='fas fa-chevron-right'></i>",
			page: 1,
			items_per_page: 3,

			sort_values: false
		}
	},
	methods:{
		sortItems(sort_order){
			if(!this.sort_values) return;
			this.store.sort_items(this.sort_values, sort_order, "partner_list");

			this.getPartnerList();
		},


		async getPartnerList(){
			if(!this.store.partner_list) this.store.partner_list = await Partners.getPartners();
			this.partner_list = this.store.partner_list.slice(0, this.items_per_page)
		},

		async searchPartners(search){
			const result = await Partners.getPartners(search);

			this.total_pages = Math.ceil(result.length / this.items_per_page);

			this.store.partner_list = result;
			this.partner_list = this.store.partner_list.slice(0, this.items_per_page);
		},

		async getTotalPages(){
			const total_items = await App.getDocAmount();
			this.total_pages = Math.ceil(total_items.partnersCounter / this.items_per_page);
		},

		async clickCallback(pageNum){
			const first_item = pageNum * this.items_per_page - this.items_per_page + 1 
			const last_item = pageNum * this.items_per_page

			const saved_partners = this.store.partner_list
			if(saved_partners.length < last_item && saved_partners.length >= first_item){
				this.partner_list = this.store.partner_list.slice(first_item-1, saved_partners.length+1)
			}
			else{
				this.partner_list = this.store.partner_list.slice(first_item-1, last_item)
			}
		}
	},
	watch: {
		"search_phrase": _.debounce(function(search){this.searchPartners(search)}, 500)
	},
	mounted(){
		this.getTotalPages();
		this.getPartnerList();
	}
}
</script>

<style>

</style>