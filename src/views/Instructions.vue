<template>
<div class="container mt-3">
    <div v-if="account_type == 'Admin'" class="row option_buttons">
        <div v-if="!edit_enabled" class="col text-right">
            <button type="button" class="button_design mt-3" v-on:click="edit_enabled = !edit_enabled"> Uredi </button>
        </div>
        <div v-else class="col text-right">
            <button type="button" class="button_design" v-on:click="set_instructions"> Pohrani promjene </button>
            <button type="button" class="disabled_button mt-3" v-on:click="edit_enabled = !edit_enabled"> Odustani </button>
        </div>
    </div>

    <div class="row">
        <h2 class="subtitles" style="margin: 0 0 2% 0">Upute za izvršavanje studentske prakse:</h2>
        
        <div v-if="instructions && !edit_enabled">
            <div class="col-md-1 col-sm-0"></div>

            <div class="col-md-10 col-sm-12">
                <ul style="list-style-type: none">
                    <li class="mt-2" v-bind:key="instruction.order" v-for="instruction in instructions">
                        <span class="mr-2">{{instruction.order + 1}}</span> {{instruction.text}}
                    </li>
                </ul>       
            </div>

            <div class="col-md-1 col-sm-0"></div>
        </div>

        <div v-else-if="edit_enabled" class="col">
            <!-- Dodaj novu instrukciju -->
            <div class="mt-5">
                <div class="row">
                    <textarea class="instructions_input" v-model="new_instruction" placeholder="Upišite novu uputu!"></textarea>
                </div>

                <div class="row mt-1">
                    <div class="col-md-10 col-sm-0"></div>
                    <div class="col-md-2 col-sm-12 text-center confirm_button" v-on:click="add_instruction">Dodaj <i class="fas fa-check" style="color: white"></i></div>
                </div>
            </div>


            <!-- Postojece instukcije -->
            <div class="mt-5" v-bind:key="instruction.order" v-for="instruction in instructions">
                <div class="row">
                    <textarea class="instructions_input" v-model="instruction.text"></textarea>
                </div>

                <div class="row mt-1">
                    <div class="col-md-10 col-sm-0"></div>
                    <div class="col-md-2 col-sm-12 text-center alert_button" v-on:click="remove_instruction(instruction.order)">Ukloni <i class="fas fa-times" style="color: white"></i></div>
                </div>
            </div>
            
        </div>

    </div>


</div>
</template>

<script>
import { Content, Auth } from '@/services'

export default {
    data(){
        return{
            instructions: undefined,
            edit_enabled: false,

            new_instruction: "",
            account_type: Auth.state.account_type,
        }
    },
	methods:{
        async get_instruction(){
            const result = await Content.get_instructions();
            this.instructions = result || [];
        },

        async set_instructions(){
            Content.set_instructions(this.instructions)
            this.edit_enabled = false;
        },

        add_instruction(){
            this.instructions.push({
                order: this.instructions.length,
                text: this.new_instruction
            })
            this.new_instruction = "";
        },

        remove_instruction(order){
            let updated_list = this.instructions.filter(instruction => instruction.order != order);
            
            this.instructions = updated_list.map((instruction, index) => {
                instruction.order = index; 
                return instruction
            });
        }
    },
    async mounted(){
        if(!(this.account_type == "Student" || this.account_type == "Admin")) 
            this.$router.push({ name: 'Home' });
        this.get_instruction();
    }
}
</script>

<style>
.instructions_input{
    margin: 0;
    padding: 1%;
}
</style>