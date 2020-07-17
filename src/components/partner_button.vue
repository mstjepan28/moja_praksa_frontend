<template>
	<div class="company">
		<router-link to="/" style="color: white">
			<i class="far fa-handshake"></i> {{info.name}}
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
a:hover{
	color: white;
	text-decoration: none;
}
</style>