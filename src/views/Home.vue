<template>
  <div>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="" alt="Third slide">
          </div>
        </div>
      </div>  
  </div>
</template>

<script>
//import ScrollCard from '@/components/scroll_card.vue'

export default {
  data(){
    return{
      scroll_cards: [
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
        {img_src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'},
      ]
    }
  },
  name: 'Home',
  //components: { ScrollCard }
}
</script>

<style scoped>
.scrolling-wrapper{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}
</style>
