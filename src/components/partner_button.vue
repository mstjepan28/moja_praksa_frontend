<template>
	<div class="company">
		<router-link to="/" style="color: white">
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
.company{
	width: 75%;

	margin-top: 5%;
	padding: 2%;

	display: inline-block;

	font-size: 18px;
	font-weight: bold;
	color: #6DD0F6;

	border: 2px solid #A0E0F6;
	border-radius: 10px;

	background: #6DD0F6
}
.company:hover{
	border: 2px solid #6DD0F6;
	background: #A0E0F6;
}
.company > .fa-handshake{
	color: white
}
a:hover{
	text-decoration: none;
}
</style>