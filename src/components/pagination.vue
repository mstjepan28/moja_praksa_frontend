<template>
<span class="pagination">
    <div class="pagination_element"><i class="fas fa-chevron-left"></i></div>
    <div class="pagination_element">1</div>
    <div class="pagination_element">2</div>
    <div class="pagination_element">3</div>
    <div class="pagination_element"><i class="fas fa-chevron-right"></i></div>
</span>
</template>

<script>
export default {

}
</script>

<style>
.pagination{
    margin: 0 auto;
    display: inline-block;
}
.pagination_element{
    padding: 5px 10px;

    display: inline-block;

    font-weight: bold;
    color: #636466;

    border: 2px solid #A0E0F6;
    border-radius: 10%;

	background: transparent;  
}
.pagination_element > .fas{
    color: #636466;
}
.pagination_element:hover{
    color: white;

	border: 2px solid #6DD0F6;
	background: #A0E0F6;    
}
.pagination_element:hover > .fas{
    color: white;
}
</style>