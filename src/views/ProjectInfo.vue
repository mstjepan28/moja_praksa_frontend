<template>
<div v-if="project_info">

    <div class="modal fade" id="DeleteConfirmation" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="text-align: center">
            <div class="modal-content">
                <h4 class="modal-body">
                    Projekata izbrisan!
                </h4>
                <div class="modal-footer" style="display: inline-block; margin: 0 auto;">
                    <button type="button" class="button_design" data-dismiss="modal">Uredu</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="text-align: center">
            <div class="modal-content">
                <h4 class="modal-body">
                    Jeste li sigurni da želite izbrisati ovaj projekt?
                </h4>
                <div class="modal-footer" style="display: inline-block; margin: 0 auto;">
                    <button type="button" v-on:click="delete_project" class="alert_button" data-dismiss="modal" data-toggle="modal" data-target="#DeleteConfirmation">Pošalji odabir</button>
                    <button type="button" class="disabled_button" data-dismiss="modal">Odustani</button>
                </div>
            </div>
        </div>
    </div>

	<vue-flux
		class="row"
		:options="store.vfOptions"
		:images="project_headers"
		:transitions="store.vfTransitions"
		ref="slider"
	>
		<template v-slot:preloader> <flux-preloader /> </template>
	</vue-flux>

	<div v-if="edit_enabled">
		<div class="row option_buttons mt-3">
			<div class="col text-right">
				<button type="button" class="disabled_button mr-3" v-on:click="edit_enabled = !edit_enabled"> Odustani </button>
				<button type="button" class="button_design" v-on:click="update_project"> Pohrani promjene </button>
			</div>
		</div>

		<div class="row description">
			<h1 class="title">
				<input type="text" class="input_wrapper" placeholder="Naziv poduzeća..." v-model="project_info.company" style="text-align: center; width: 100%;">
			</h1><br>
			
			<textarea placeholder="Kratak opis projekta..." v-model="project_info.project_description" style="text-align: center"></textarea>
		</div>

		<div class="row">
			<h4 class="subtitles">Kontakt:</h4> <input type="text" class="input_wrapper" placeholder="Kontakt odgovorne osobe za projekt..." v-model="project_info.contact">

			<h4 class="subtitles">Tehnologije:</h4> <input type="text" class="input_wrapper" placeholder="Tehnologije koje se koriste u projektu..." v-model="project_info.technologies">

			<h4 class="subtitles">Preference:</h4> <input type="text" class="input_wrapper" placeholder="Preference za osobe koje bi obavljale projekt..." v-model="project_info.preferences">

			<h4 class="subtitles">Potrebno imati:</h4> <input type="text" class="input_wrapper" placeholder="Potrebno znannje ili oprema za izvršavanje projekta..." v-model="project_info.requirements">

			<h4 class="subtitles">Trajanje:</h4> <input type="text" class="input_wrapper" placeholder="Vremensko trajanje projekta..." v-model="project_info.duration">

			<h4 class="subtitles">Lokacija:</h4> <input type="text" class="input_wrapper" placeholder="Lokacija za izvršavanje projekta..." v-model="project_info.location">

			<h4 class="subtitles">Napomena:</h4> <textarea placeholder="Napomena vezana za projekt..." v-model="project_info.note"></textarea>
		</div>
	</div>

	<div v-else>
		<div v-if="canEdit" class="row option_buttons mt-3">
			<div class="col text-right">
				<button type="button" class="button_design mr-3" v-on:click="edit_enabled = !edit_enabled"> Uredi </button>
				<button type="button" class="alert_button" v-on:click="delete_project" data-toggle="modal" data-target="#deleteProject"> Izbriši </button>
			</div>
		</div>
			
		<div class="row description">
			<h1 class="title">{{project_info.company}}</h1><br>
			<p class="description_text">{{project_info.project_description}}</p><br>
		</div><hr>
		
		<div class="row text-center">
			<div class="col-md-4 col-sm-12">
				<small class="views"><i class="fas fa-eye"></i> Posjećenost: {{project_info.views}}</small> 	
			</div>
			<div class="col-md-4 col-sm-12">
				<small>Broj studenata potrebnih za ovaj projekt: {{getEmptyPlaces()}}</small>
			</div>
			<div class="col-md-4 col-sm-0"></div>
		</div><hr>

		<div class="row">
			<h4 class="subtitles">Kontakt osoba:</h4> {{project_info.contact}}

			<h4 class="subtitles">Tehnologije:</h4> {{project_info.technologies}}

			<h4 class="subtitles">Preference:</h4> {{project_info.preferences}}

			<h4 class="subtitles">Potrebno imati:</h4> {{project_info.requirements}}

			<h4 class="subtitles">Trajanje:</h4> {{project_info.duration}}

			<h4 class="subtitles">Lokacija:</h4> {{project_info.location}}

			<h4 class="subtitles">Napomena:</h4> {{project_info.note}}
			
		</div>

		<div v-if="canSelectProject" class="row mt-3" style="text-align: center">
			<button type="button" class="alert_button" style="display:inline-block; margin: 0 auto;" v-if="project_selected" v-on:click="unselect_project">Ukloni odabir</button>
			<button type="button" class="button_design" style="display:inline-block; margin: 0 auto;" v-else  v-on:click="select_project">Odaberi projekt</button>
		</div>
	</div>
	


	<!-- -->
</div>
</template>

<script>
import { VueFlux, FluxPreloader } from 'vue-flux';
import { Projects, Auth } from '@/services'
import store from '@/store.js';

export default {
	components: {
		VueFlux,
		FluxPreloader,
	},
	data(){
		return{
			store,

			id: this.$route.params.id,
			project_info: false,
			project_selected: false,
			edit_enabled: false,
			project_headers: false,
		}
	},
	methods:{
		switch_edit(){
			if(this.edit_enabled) this.edit_enabled = false;
			else this.edit_enabled = true
		},
		
		async add_view(){
			await Projects.addProjectView({
				'_id': this.id,
				'views': this.project_info.views,
				'collectionName' : 'projects'
			});
		},

		// TEMP
		add_view_local(views){
			if(views == undefined) return 0;
			return views;
		},

		async get_project_info(){
			if(this.store.project_list){
				const project_index = this.store.project_list.findIndex(project => project.id == this.id);

				// TEMP 
				this.store.project_list[project_index].views = this.add_view_local(this.store.project_list[project_index].views) 
				this.store.project_list[project_index].views++;

				this.project_info = this.store.project_list[project_index];
			}
			else{
				const result = await Projects.getOneProject(this.$route.params.id);
				this.project_info = result[0];			
				
				// TEMP 
				this.project_info.views = this.add_view_local(this.project_info.views);
				this.project_info.views++;
			}
			this.add_view();
			this.getHeaders();
		},

		async update_project(){
			const result = await Projects.UpdateProject(this.project_info, this.id, 'true');
			console.log(result);

			this.edit_enabled = false;
		},

		async delete_project(){
			const result = await Projects.DeleteProject(this.$route.params.id, 'false');
			console.log(result);
		},

		select_project(){
			let selected_projects = JSON.parse(localStorage.getItem('selected_projects'));

			if(selected_projects.length >= 3) return;

			this.project_info.priority = selected_projects.length + 1;
			selected_projects.push(this.project_info);
			localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
			
			this.is_selected()
		},

		unselect_project(){
			let selected_projects = JSON.parse(localStorage.getItem('selected_projects'));
			selected_projects = selected_projects.filter(project => project.id != this.id);

			selected_projects.map((project, index) => project.priority = index+1)
			
			localStorage.setItem('selected_projects', JSON.stringify(selected_projects));
			this.is_selected()
		},
		
		is_selected(){
			const selected_projects = JSON.parse(localStorage.getItem('selected_projects'));
			
			if(selected_projects.length == 0)
				this.project_selected = false;
			else{
				const result = selected_projects.filter(project => project.id == this.id);
				
				if(result.length == 1) this.project_selected = true;
				else this.project_selected = false;
			}
		},

        getEmptyPlaces(){
            return this.project_info.allocated_to.filter(element => element == false).length;
		},

		getHeaders(){
			if(!this.project_info.headers) this.project_headers = this.store.vfImages_partners;
			else this.project_headers = this.project_info.headers.map(img => img.imgUrl)
		},
	},
	computed:{
		canSelectProject(){
			const user_data = Auth.state.user_data;
			if(user_data.account_type == "Student" && !user_data.chosenProjects) return true;
			else return false;
		},
		canEdit(){
			const user_data = Auth.state.user_data;
			if(user_data._id == this.project_info.partnerID) return true;
			return false;
		}
	},
	mounted(){
		if(Auth.isAuthenticated()){
			this.is_selected();
			this.get_project_info();		
		}
		else this.$router.push({ name: 'Login' });

	}
}
</script>

<style>

</style>