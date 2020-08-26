<template>
	<router-link v-bind:to="'/ProjectInfo/' + info.id" class="card project">
		<img class="card-img-top" v-bind:src="info.img_url" alt="Card image cap" >
		
		<div class="card-body">
			<h5 class="card-title">{{info.company}}</h5>
			<p class="card-text">{{info.project_description}}</p>
		</div>
	</router-link>
</template>

<script>

export default {
	props: ['info'],
}
</script>

<style>
.card-text{
	min-height: 170px;
	max-height: 170px;

	overflow: hidden;
}
.project{
	width: 18rem; 
	
    margin: 3% auto;
	display: inline-block;
	text-align: center;

	color: black;
	text-decoration: none; 
	
    border: 2px solid #6DD0F6;
}
.project:hover{
	color: black;
	text-decoration: none; 
}
@media only screen and (max-width: 767px) {
	.project{width: 11rem}
	.card-text{
		min-height: 100px;
		max-height: 100px;
	}
}
</style>