<template>
<span class="pagination">
    <div class="pagination_element" v-on:click="previousPage"><i class="fas fa-chevron-left"></i></div>
    
    <div class="pagination_element" v-on:click="changePage(current_page)">{{current_page}}</div>
    <div class="pagination_element" v-if="current_page + 1 <= totalPages" v-on:click="changePage(current_page+1)">{{current_page + 1}}</div>
    <div class="pagination_element" v-if="current_page + 2 <= totalPages" v-on:click="changePage(current_page+2)">{{current_page + 2}}</div>
    
    <div class="pagination_element" v-on:click="nextPage"><i class="fas fa-chevron-right"></i></div>
</span>
</template>

<script>
export default {
    props: ['info'],
    data() {
        return{
            totalPages: null,
            current_page: 1,
        }
    },
    methods:{
        async nextPage(){
            if(this.current_page + 2 > this.totalPages) return;
            
            this.current_page++;
        },
        async previousPage(){
            if(this.current_page < 1) return;

            this.current_page--;
        },
        changePage(page){
            this.current_page = page;
        }
    },
    mounted(){
        this.current_page = this.info.total_items;

        const total_items = 36; 
        this.totalPages = Math.ceil(total_items / 9)
    }
}
</script>

<style>
.pagination{
    margin: 0 auto;
    display: inline-block;
    user-select: none;
}
.pagination_element{
    padding: 5px 10px;

    display: inline-block;

    font-weight: bold;
    color: #6DD0F6;

    border: 2px solid #A0E0F6;
    border-radius: 10%;

	background: transparent;  
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