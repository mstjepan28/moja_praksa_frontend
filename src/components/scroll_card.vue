<template>
	<div class="card">
    <div class="carousel-item">
      <img class="d-block w-100" v-bind:src="info.img_src">
    </div>
	</div>
</template>

<script>
export default {
	props: ['info'],
	data(){
	}
}
</script>

<style>

</style>