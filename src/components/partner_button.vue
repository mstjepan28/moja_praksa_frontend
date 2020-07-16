<template>
	<div>
		<router-link to="/" class="button_design company_button"> <i class="far fa-handshake"></i> {{info.company}} </router-link>
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
a:hover{
	color: white;
	text-decoration: none;
}
</style>