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
			<div class="input_wrapper">
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
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'name', type: 'string'}"> Ime studenta
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'surname', type: 'string'}"> Prezime studenta
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'year', type: 'number'}"> Godine studija
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'application', type: 'bool'}"> Prijavnica
						</div>
						<div class="filter_item">
							<input type="radio" v-model="sort_values" name="sort_values" :value="{atr: 'journalId', type: 'bool'}"> Dnevnik prakse
						</div>

						<div class="row mr-2 ml-2">
							<div class="col-6">
								<input type="radio" name="sort" v-on:click="sort_items('asc')"> Uzlazno
							</div>
							<div class="col-6">
								<input type="radio" name="sort" v-on:click="sort_items('desc')"> Silazno
							</div>							
						</div>						
					</div>

					<div class="dropdownFooter">
						<button type="submit" class="button_design mr-2" v-on:click="getStudents"> Poništi </button>
					</div>
				</div>
			</div>
		</div>
	</div><hr>

    <StudentCard v-bind:key="student.id" v-bind:info="student" v-for="student in student_list"/>

	<div class="row d-flex justify-content-center">
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

import StudentCard from '@/components/student_card';

import store from '@/store.js';
import { Auth, Students, App } from '@/services';

export default {
	components: {
		VueFlux,
		FluxPreloader,
		Paginate,

		StudentCard,
	},
    data(){
        return {
            store,
            student_list: false,

            search_phrase: null,
            filter_params:{},

			total_pages: null,
			prev: "Prethodna",
			next: "Sljedeća",
			page: 1,
			items_per_page: 3,

            sort_values: false,
        }
    },
	methods:{
		sort_items(sort_order){
			if(!this.sort_values) return;
			this.store.sort_items(this.sort_values, sort_order, "student_list");

			this.getStudents();
		},

		async getStudents(){
			if(!this.store.student_list) this.store.student_list = await Students.getStudents();
			this.student_list = this.store.student_list.slice(0, this.items_per_page)
        },
        
		async search_students(search){
			this.student_list = await Students.getStudents(search);
		},

		async get_total_pages(){
			const total_items = await App.getDocAmount();
			this.total_pages = Math.ceil(total_items.studentCounter / this.items_per_page);
        },

		async clickCallback(pageNum){
			const first_item = pageNum * this.items_per_page - this.items_per_page + 1 
			const last_item = pageNum * this.items_per_page

			const saved_partners = this.store.student_list
			if(saved_partners.length < last_item && saved_partners.length >= first_item){
				this.student_list = this.store.student_list.slice(first_item-1, saved_partners.length+1)
			}
			else{
				this.student_list = this.store.student_list.slice(first_item-1, last_item)
			}
		}
	},
    mounted(){
		/*
        if(Auth.state.account_type != "Admin") this.$router.push({ name: 'Home' });
        else{
            this.get_total_pages();
            this.getStudents();
		}
		*/
		//TEST
		console.log(Auth.a)
		this.get_total_pages();
		this.getStudents();
    },
	watch: {
		"search_phrase": _.debounce(function(search){this.search_students(search)}, 500)
	},
}
</script>

<style>

</style>