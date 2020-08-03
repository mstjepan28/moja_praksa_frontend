<template>
<div>
	<router-link v-bind:to="'/PartnersInfo/' + info._id" class="company_button button_design" style="color: white">
		<i class="far fa-handshake"></i> {{info.company}}
	</router-link>
	<br>
</div>
</template>

<script>
export default {
	props: ['info']
}
</script>

<style>
.company_button{
	width: 75%;

	margin-top: 5%;
	padding: 2%;

	font-size: 18px;
}
.company_button > *{
	color: white
}
</style>