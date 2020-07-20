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

	<div class="row mt-3 h-100">
		<div class="col-md-8 col-sm-0"></div>

		<div class="filter_search col-md-4 col-sm-12 my-auto" style="text-align: right">
			<div class="search_projects mr-3">
				<input v-model="search_phrase" class="custom_input" type="text" placeholder="Pretraživanje..."/>
				<span><i class="fas fa-search"></i></span>
			</div>

			<!-- Filter -->
			<div class="btn-group">
				<button type="button" class="button_design filter_button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fas fa-filter"></i>
				</button>

				<div class="dropdown-menu dropdown-menu-right">
					<div class="dropdownHeader"> <h3>Filter</h3> </div>

					<div class="dropdownBody">                   
						<div class="filter_item">
							<span class="filter_item_tag"><i class="fas fa-filter"></i></span>
							<input v-model ="filter_params.iznos__lesser" type="text" class="filter_item_input" name="selectedFilter" placeholder="Placeholder...">
						</div>
						<div class="filter_item">
							<span class="filter_item_tag"><i class="fas fa-filter"></i></span>
							<input v-model ="filter_params.iznos__lesser" type="text" class="filter_item_input" name="selectedFilter" placeholder="Placeholder...">
						</div>
						<div class="filter_item">
							<span class="filter_item_tag"><i class="fas fa-filter"></i></span>
							<input v-model ="filter_params.iznos__lesser" type="text" class="filter_item_input" name="selectedFilter" placeholder="Placeholder...">
						</div>
						<div class="filter_item">
							<span class="filter_item_tag"><i class="fas fa-filter"></i></span>
							<input v-model ="filter_params.iznos__lesser" type="text" class="filter_item_input" name="selectedFilter" placeholder="Placeholder...">
						</div>
						<div class="filter_item">
							<span class="filter_item_tag"><i class="fas fa-filter"></i></span>
							<input v-model ="filter_params.iznos__lesser" type="text" class="filter_item_input" name="selectedFilter" placeholder="Placeholder...">
						</div>

					</div>

					<div class="dropdownFooter">
						<button type="submit" class="button_design mr-2"> Traži </button>
						<button type="submit" class="disabled_button"> Očisti filter</button>
					</div>
				</div>
			</div>
			<!-- Filter end -->					
		</div>


	</div>

	<div class="row" style="text-align: center">
		<h1 class="title" style="margin-top: 0">Partneri</h1><br>
		<p class="description_text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit nisl, eget venenatis arcu gravida pretium. 
			Praesent vel odio mauris. Etiam porta sapien odio, eu fermentum lectus ultricies convallis. 
			Nam at dolor eu massa facilisis vehicula. Proin consequat eros ligula, ac congue neque rutrum at. 
			Nulla lacinia porta gravida. Curabitur tincidunt aliquet auctor. Aliquam erat volutpat. Mauris et tempor dolor.
		</p>
	</div>

	<div v-if="partner_list"><PartnerCard v-bind:key="partner.id" v-bind:info="partner" v-for="partner in partner_list_test"/></div>

	<div class="row"><Pagination/></div>
</div>
</template>

<script>
import _ from 'lodash';
import { VueFlux, FluxPreloader } from 'vue-flux';

import PartnerCard from '@/components/partner_card';
import Pagination from '@/components/pagination';

import store from '@/store.js';
import { Partners } from '@/services'

export default {
	components: {
		VueFlux,
		FluxPreloader,

		PartnerCard,
		Pagination
	},
	data(){
		return{
			store,
      partner_list: false,
      partner_list_test: null,

			search_phrase: null,
			filter_params:{}
		}
	},
	methods:{
		async get_partner_list(){
			this.partner_list = this.store.partner_list
			this.partner_list_test = await Partners.getPartners()
		},
		async search_partners(search){
			this.partner_list = await Partners.getPartners(search);
			console.log(this.partner_list)
		}
	},
	watch: {
		"search_phrase": _.debounce(function(search){this.search_partners(search)}, 500)
	},
	mounted(){
    this.get_partner_list();
	}
}
</script>

<style>

</style>