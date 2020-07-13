<template>
<div class="CompanyProjects" v-if="project_list">
	<div class="row">
		<h3 class="company_title">Company#1</h3>
	</div>

	<section>
		<vue-horizontal-list :items="project_list" :options="store.carousel_options">
			<template v-slot:default="{item}">
				<div>
					<router-link to="/" class="card" style="border: 2px solid #6DD0F6;">
						<img class="card-img-top responsive_image" v-bind:src="item.img" alt="Card image cap" style="border-bottom: 2px solid #6DD0F6;">
						<div class="card-body"> <p style="color: black">{{item.project_description}}</p> </div>
					</router-link>
				</div>
			</template>
		</vue-horizontal-list>
	</section>  		
</div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';
import store from '@/store.js';

export default{
	components: { VueHorizontalList },

	data(){
		return{
			store,
			project_list: false,
		}
	},
	mounted(){
		this.project_list = this.store.project_list.slice(0, 8)
	},
}
</script>

<style>
.CompanyProjects{
	width: 100%;
}
.company_title{
	width: 100%;

	padding: 0 0 0.5% 2%;
	text-align: left;

	border-bottom: 1px solid #212529;
}
</style>