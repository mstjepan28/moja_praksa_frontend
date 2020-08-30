<template>
<div class="company_button">
	<router-link v-if="info.logo" class="mt-4 button_design_no_hover" :to="'/PartnersInfo/' + info.id" :style="{'background-image': 'url(' + info.logo.imgUrl + ')'}">
		<i class="far fa-handshake"></i> {{info.company}}
	</router-link>

	<router-link v-else class="mt-4 button_design" :to="'/PartnersInfo/' + info.id">
		<i class="far fa-handshake"></i> {{info.company}}
	</router-link>
</div>
</template>

<script>
export default {
	props: ['info']
}
</script>

<style>
.company_button > a{
	height: 100%;
	width: 100%;

	padding: 6px;
	font-size: 18px;

	background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.company_button:hover > a{
	color: white;
	transform: scale(1.1);
	transition: all .5s;
}
</style>