export default{
    project_list: null,
    partner_list: null,
    
    vfOptions: {autoplay: true, aspectRatio: '16:6'},
    vfTransitions: [ 'fade' ],
    vfImages_home: [ 
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80', 
        'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80' 
    ],
    vfImages_projects: [ 
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
        'https://images.unsplash.com/photo-1516905041604-7935af78f572?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    ],
    vfImages_partners: [
      'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    ],
    carousel_options: {
        item: {
          // css class to inject into each individual item
          class: '',
          // padding between each item
          padding: 12 
        },
        list: {
          // css class for the parent of item
          class: '', 
          // maximum width of the list it can extend to before switching to windowed mode, basically think of the bootstrap container max-width
          // windowed is used to toggle between full-screen mode and container mode
          windowed: 1200,
          // padding of the list, if container < windowed what is the left-right padding of the list
          // during full-screen mode the padding will added to left & right to centralise the item
          padding: 24
        },
        responsive: [
          // responsive breakpoints to calculate how many items to show in the list at each width interval
          // it will always fall back to these: 
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {start: 992, end: 1200, size: 3},
          {start: 1200, size: 4}
        ],
        navigation: {
          // when to show navigation
          start: 992,
          color: '#000'
        }
    },

    filter_documents(){
        this.extract_documents()
        let filtered_docs = this.documentData
        
        for(let i = 0; i < Object.keys(this.filter_params).length; i++){
            
          let key_ = Object.keys(this.filter_params)[i]
          let value = this.filter_params[key_]
          
          let [key, comparison] = key_.split("__")
          if(comparison == 'is'){
            filtered_docs = filtered_docs.filter((doc) => doc[key] == value)
          }
          else if(comparison == 'greater'){
            filtered_docs = filtered_docs.filter((doc) => doc[key] > value)
          }
          else if(comparison == 'lesser'){
            filtered_docs = filtered_docs.filter((doc) => doc[key] < value)
          }
        }
        this.documentData = filtered_docs
      }
}