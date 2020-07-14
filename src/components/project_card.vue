<template>
	<div class="card project">
		<img class="card-img-top" v-bind:src="info.img" alt="Card image cap" style="border-bottom: 3px solid #6DD0F6;">
		
		<div class="card-body">
			<h5 class="card-title">{{info.project_name}}</h5>
			<p class="card-text">{{info.project_description}}</p>
		</div>
	</div>
</template>

<script>

export default {
	props: ['info'],
}
</script>

<style>
.card-text{
    overflow: hidden;
}
.project{
    width: 18rem; 
    margin: 3% auto;
    display: inline-block;
    border: 2px solid #6DD0F6;
}
</style>