<template>
	<router-link v-bind:to="'/ProjectInfo/' + info.id" class="card project">
		<img class="card-img-top" v-bind:src="info.img" alt="Card image cap" >
		
		<div class="card-body">
			<h5 class="card-title">{{info.project_name}}</h5>
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
	line-height: 170px;

	overflow: hidden;
}
.project{
	width: 18rem; 
	
    margin: 3% auto;
	display: inline-block;

	color: black;
	text-decoration: none; 
	
    border: 2px solid #6DD0F6;
}
.project:hover{
	color: black;
	text-decoration: none; 
}
</style>