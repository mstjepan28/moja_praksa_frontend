export default{
    project_list: null,
    partner_list: null,
    student_list: null,
    
    approved_project: null,
    
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

    // Sorter je objekt za sortiranje lista
    // Liste se sortiraju na temelju predanih parametara
    //
    // U sorter postavi atribut za sortiranje te listu iz trenutnog objekta za sortiranje
    //  Iz sortera se poziva getter funkcija koja vrača sortiranu list(poziva se preko imena funkcije)
    sort_items(sort_values, sort_order, list){
      let sorter = {
        items: false, // Polje elemenata koje sortiramo
        atr: false, // Atribut po kojem sortiramo polje

        get asc_number(){
          return this.number_sort()
        },
        get desc_number(){
          return this.number_sort().reverse();
        },
        get asc_string(){
          return this.string_sort()
        },
        get desc_string(){
          return this.string_sort().reverse()
        },
        get asc_bool(){
          return this.bool_sort()
        },
        get desc_bool(){
          return this.bool_sort().reverse()
        },
        // Funkcije za sortiranje su izdvojene da se ne ponavljaju
        string_sort(){
          return this.items.sort((a, b) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            const first_item = a[this.atr].toUpperCase(); 
            const second_item = b[this.atr].toUpperCase(); 
            
            if (first_item < second_item) return -1;
            if (first_item > second_item) return 1;

            return 0;
          })
        },
        number_sort(){
          return this.items.sort((a, b) => { return a[this.atr] - b[this.atr] })
        },
        bool_sort(){
          return this.items.sort((a, b) => { return (a[this.atr] ===  b[this.atr])? 0 : a[this.atr]? -1 : 1 })
        }
      }

      sorter.atr = sort_values.atr;
			sorter.items = this[list];
      
      this[list] = sorter[sort_order + "_" + sort_values.type]
    },

    getSelectedProjects(project_ids){
      const projects = this.project_list
      let result = [];

      project_ids.forEach(id => {
        const match = projects.filter(project => project.id == id)[0];
        result.push(match);
      })
      return result;
    },

    getEmptyPlaces(allocated_to){
      return allocated_to.filter(element => element == false).length;
    }
}