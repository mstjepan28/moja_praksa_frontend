<template>
<div>
    <div class="modal fade" id="denyAccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body text-center">
					
                    <h4> Prije popunjavanja prijavnice morata vam biti dodijeljena praksa!</h4>
                    
                    <div class="row mt-3">
                        <button type="button" class="col ml-5 mr-5 d-flex justify-content-center button_design" v-on:click="denyAccess"> Uredu </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-1 col-sm-0"></div>
        <div class="col-md-10 col-sm-12">
            <p>
                <span style="color: red; font-weight: bold">VAŽNO:</span> Prijavnica se popunjava nakon (!) što nastavnik odobri kontakt određenom poduzeću i nakon što 
                student s tim poduzećem dogovori praksu. Popunjenu prijavnicu šaljemo poduzeću na odobrenje i potpis.
            </p>            
        </div>
        <div class="col-md-1 col-sm-0"></div>
    </div>

    <div class="row">
        <div class="col-md-3 col-sm-0"></div>

        <div class="col-md-6 col-sm-12">
            <form v-on:submit.prevent="send_application">
                <div class="application_form_element">
                    <h6>JMBAG Studenta: </h6>
                    <input type="number" class="application_input" placeholder="0303012345..." v-model="application_form.jmbag" required> 
                </div>
                <div class="application_form_element">
                    <h6>OIB Studenta:</h6>
                    <small>Za potrebe prijave osiguranja</small>
                    <input type="number" class="application_input" placeholder="123-456-7890..." v-model="application_form.oib" required> 
                </div>        
                <div class="application_form_element">
                    <h6>Broj mobitela:</h6>
                    <small>Za potrebe prijave osiguranja</small>
                    <input type="tel" class="application_input" placeholder="Vaš broj mobitela..." v-model="application_form.telephone_num" required> 
                </div>
                <div class="application_form_element">
                    <h6>E-mail:</h6>
                    <input type="email" class="application_input" placeholder="example@email.com..." v-model="application_form.student_email" required> 
                </div>              
                <div class="application_form_element">
                    <h6>Poduzeće:</h6>
                    <input type="text" class="application_input" placeholder="Ime poduzeća kod kojega ćete izvršavati projekt..." v-model="application_form.company" required> 
                </div>
                <div class="application_form_element">
                    <h6>Mentor iz poduzeća:</h6>
                    <input type="text" class="application_input" placeholder="Ivan Horvat..." v-model="application_form.mentor" required> 
                </div>
                <div class="application_form_element">
                    <h6>E-mail mentora: </h6>
                    <input type="email" class="application_input" placeholder="example@email.com..." v-model="application_form.mentor_email" required> 
                </div>
                <div class="application_form_element">
                    <h6>Dogovoreni zadatak: </h6>
                    <textarea class="application_input" placeholder="Opis dogovorenog zadatka..."  v-model="application_form.description" style="margin: 0" required></textarea>
                </div>        
                <div class="application_form_element">
                    <h6>Dogovoreni broj sati: </h6>
                    <input type="number" min=90 max=150 class="application_input" placeholder="U rasponu od 90 do 150..." v-model="application_form.duration" required> 
                </div>
                <div class="application_form_element">
                    <h6>Datum početka: </h6>
                    <input type="date" class="application_input" placeholder="dd/mm/yyyy" v-model="start_date" required> 
                </div>              
                <div class="application_form_element">
                    <h6>Datum završetka: </h6>
                    <input type="date" class="application_input" placeholder="dd/mm/yyyy" v-model="end_date" required> 
                </div>

                <div style="text-align: center; font-size: 13px;">
                    Potvrđujem da sam kontaktirao tvrtku i dogovorio detalje koji su ovdje uneseni
                    <input type="checkbox" value="true" v-model="confirmation_check">
                </div>

                <div class="mt-3" style="text-align: center">
                    <button v-if="confirmation_check" type="submit" class="button_design">Prijavi</button>
                    <button v-else type="button" class="disabled_button" disabled>Prijavi</button>
                </div>
            </form>            
        </div>

        <div class="col-md-3 col-sm-0"></div>
    </div>

</div>
</template>

<script>
import { Auth, Projects, App } from "@/services/index.js";
import store from '@/store.js';

export default {
    data(){
        return{
            store,

            start_date: undefined,
            end_date: undefined,

            application_form: {
                jmbag: null,
                student_email: null,
            },
            confirmation_check: false,

            user_data: Auth.state.user_data, 
        }
    },
    methods:{
        denyAccess(){
            $('#denyAccessModal').modal('hide');
            this.$router.push({ name: 'Home' })
        },
        // Provjeri ako je studentu odobren projekt
        async getApprovedProject(){
            const approvedProject = await Projects.getApprovedProject(this.user_data._id);

            if(!approvedProject){
                $('#denyAccessModal').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                $('#denyAccessModal').modal('show');
            }
            else this.autocompleteData(approvedProject);
        },

        // Popuni dio prijavnice iz vec poznatih podataka
        autocompleteData(approvedProject){
            const user = this.user_data

            this.application_form = {
                jmbag: user.jmbag,
                student_email: user.email,

                company: approvedProject.company,
                description: approvedProject.project_description
            }
        },

        // Popunjena prijavnica se pohranjuje u bazu
        async send_application(){
            this.convert_date();
            await App.upload_application_form(this.application_form, this.user_data._id);

            this.user_data.application = this.application_form;
            localStorage.setItem('user', JSON.stringify(this.user_data));

            this.$router.push({ name: 'Home' })
        },

        // Datume pretvaramo u unix time
        convert_date(){
            this.application_form.start_date = Date.parse(this.start_date);
            this.application_form.end_date = Date.parse(this.end_date)
        },

        isFilled(){
            if(this.user_data.application) return true;
            else return false;
        }
    },
    mounted(){
        if(this.user_data.account_type != "Student") 
            this.$router.push({ name: 'Home' });
        else if(this.isFilled())
            this.$router.push({ path: 'ApplicationForm/' + this.user_data._id });
        else
            this.getApprovedProject();
    }
}
</script>

<style>

</style>
