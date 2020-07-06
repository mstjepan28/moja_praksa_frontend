<template>
  <div style="width: 100%">
    <vue-flux
      :options="vfOptions"
      :images="vfImages"
      :transitions="vfTransitions"
      ref="slider">

      <template v-slot:preloader>
          <flux-preloader />
      </template>
    </vue-flux>


  </div>
</template>

<script>
  import {
    VueFlux,
    FluxPreloader
  } from 'vue-flux';

  export default {
    components: {
        VueFlux,
        FluxPreloader
    },

    data: () => ({
        vfOptions: {
          autoplay: true,
          aspectRatio: '16:5'
        },
        vfImages: [ 
          'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80', 
          'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 
          'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80' 
        ],
        vfTransitions: [ 'fade' ]
    }),
    name: 'Home'
  }
</script>

<style scoped>
.image_display{
  width: 100%;
  height: 150px;

}
</style>
