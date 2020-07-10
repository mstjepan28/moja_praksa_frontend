<template>
    <div class="card project">
        
        <img class="card-img-top" v-bind:src="info.img" alt="Card image cap" style="border: 2px solid #6DD0F6;">
        
        <div class="card-body">
            <h5 class="card-title">{{info.project_name}}</h5>
            <p class="card-text">{{info.project_description}}</p>
            
            <router-link to="/" class="goto" >Više</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['info']
}
</script>

<style>
.card-text{
    overflow: hidden;
}
.project{
    width: 18rem; 

    margin: 3%;
    display: inline-block;

    border: 2px solid #6DD0F6;
}
.goto{
	padding: 1% 10%;

	display: inline-block;

	font-size: 16px;
	font-weight: bold;
	color: white;

	border: 2px solid #A0E0F6;
	border-radius: 10px;

	background: #6DD0F6
}
.goto:hover{
    color: white;

	border: 2px solid #6DD0F6;
	background: #A0E0F6;
}
</style>