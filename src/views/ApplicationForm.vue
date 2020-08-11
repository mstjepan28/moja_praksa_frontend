<template>
<div>
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
import {Auth} from "@/services/index.js";

export default {
    data(){
        return{
            start_date: undefined,
            end_date: undefined,

            application_form: {},
            confirmation_check: false,

            auth: Auth.state, 
        }
    },
    methods:{
        send_application(){
            this.convert_date();
            console.log(typeof this.application_form.start_date, this.application_form.start_date);
        },
        convert_date(){
            this.application_form.start_date = Date.parse(this.start_date);
            this.application_form.end_date = Date.parse(this.end_date)
        },
        autocomplete_form(){
            const user_data = Auth.getUser();
            this.application_form.jmbag = user_data.JMBAG;
            this.application_form.student_email = user_data.email;
        }

    },
    mounted(){
        const user_type = this.auth.account_type;
        
        if(!(user_type == "Student" || user_type == "Admin")) console.log("No access")//this.$router.push({ name: 'Home' });
        else if(user_type == "Student") this.autocomplete_form();
    }
}
</script>

<style>
.application_form_element{margin: 5% 0;}
.application_input{
    width: 100%;
    padding-left: 2%;

    border: 2px solid #6DD0F6;
    border-radius: 10px;
    background: rgb(245, 245, 245);
}   
.application_input:focus{
    border: 2px solid #6DD0F6;
    border-radius: 10px;
    background: rgb(245, 245, 245);
}
</style>