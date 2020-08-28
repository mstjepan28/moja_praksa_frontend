<template>
<div>
    <div class="row" v-if="application_form">
        <div class="col-md-3 col-sm-0"></div>

        <div class="col-md-6 col-sm-12">
            <div class="application_form_element">
                <h6>JMBAG Studenta: </h6>
                <input type="number" class="application_input" placeholder="0303012345..." v-model="application_form.jmbag" disabled> 
            </div>
            <div class="application_form_element">
                <h6>OIB Studenta:</h6>
                <small>Za potrebe prijave osiguranja</small>
                <input type="number" class="application_input" placeholder="123-456-7890..." v-model="application_form.oib" disabled> 
            </div>        
            <div class="application_form_element">
                <h6>Broj mobitela:</h6>
                <small>Za potrebe prijave osiguranja</small>
                <input type="tel" class="application_input" placeholder="Vaš broj mobitela..." v-model="application_form.telephone_num" disabled> 
            </div>
            <div class="application_form_element">
                <h6>E-mail:</h6>
                <input type="email" class="application_input" placeholder="example@email.com..." v-model="application_form.student_email" disabled> 
            </div>              
            <div class="application_form_element">
                <h6>Poduzeće:</h6>
                <input type="text" class="application_input" placeholder="Ime poduzeća kod kojega ćete izvršavati projekt..." v-model="application_form.company" disabled> 
            </div>
            <div class="application_form_element">
                <h6>Mentor iz poduzeća:</h6>
                <input type="text" class="application_input" placeholder="Ivan Horvat..." v-model="application_form.mentor" disabled> 
            </div>
            <div class="application_form_element">
                <h6>E-mail mentora: </h6>
                <input type="email" class="application_input" placeholder="example@email.com..." v-model="application_form.mentor_email" disabled> 
            </div>
            <div class="application_form_element">
                <h6>Dogovoreni zadatak: </h6>
                <textarea class="application_input" placeholder="Opis dogovorenog zadatka..."  v-model="application_form.description" style="margin: 0" disabled></textarea>
            </div>        
            <div class="application_form_element">
                <h6>Dogovoreni broj sati: </h6>
                <input type="number" min=90 max=150 class="application_input" placeholder="U rasponu od 90 do 150..." v-model="application_form.duration" disabled> 
            </div>
            <div class="application_form_element">
                <h6>Datum početka: </h6>
                <input type="text" class="application_input" placeholder="dd/mm/yyyy" v-model="application_form.start_date" disabled> 
            </div>              
            <div class="application_form_element">
                <h6>Datum završetka: </h6>
                <input type="text" class="application_input" placeholder="dd/mm/yyyy" v-model="application_form.end_date" disabled> 
            </div>       
        </div>

        <div class="col-md-3 col-sm-0"></div>
    </div>
</div>
</template>

<script>
import { Students } from '@/services';
import store from '@/store.js';

export default {
    props: ['info'],
    data(){
        return{
            store,

            id: this.$route.params.id,
            application_form: false,
        }
    },
    methods:{
		async getStudents(){
			if(!this.store.student_list) this.store.student_list = await Students.getStudents();
            const student_info = this.store.student_list.filter(student => student.id == this.id)[0]
            this.getApplication(student_info);
        },
        getApplication(student){
            this.application_form = student.application;

            this.application_form.start_date = new Date(this.application_form.start_date).toLocaleDateString('de-DE');
            this.application_form.end_date = new Date(this.application_form.end_date).toLocaleDateString('de-DE')
        }
    },
    mounted(){
        this.getStudents();
    }
}
</script>

<style>

</style>