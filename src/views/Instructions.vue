<template>
<div class="container mt-3">
    <div class="row option_buttons">
        <div v-if="!edit_enabled" class="col text-right">
            <button type="button" class="button_design mt-3" v-on:click="switch_edit"> Uredi </button>
        </div>
        <div v-else class="col text-right">
            <button type="button" class="button_design" v-on:click="set_instructions"> Pohrani promjene </button>
            <button type="button" class="disabled_button mt-3" v-on:click="switch_edit"> Odustani </button>
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
            <div class="mt-3" v-bind:key="instruction.order" v-for="instruction in instructions">

                <div class="row">
                    <textarea class="instructions_input" v-model="instruction.text"></textarea>
                </div>

                <div class="row mt-1">
                    <div class="col text-right" style="padding: 0">
                        <button class="alert_button" v-on:click="remove_instruction(instruction.order)"> Ukloni <i class="fas fa-times"></i> </button>
                    </div>
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
            new_instruction: "",
            edit_enabled: false,
            auth: Auth.state,
        }
    },
	methods:{
		switch_edit(){
			if(this.edit_enabled) this.edit_enabled = false;
            else this.edit_enabled = true
            
            this.new_instruction = "";
        },
        async get_instruction(){
            this.instructions = await Content.get_instructions();
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
            this.instructions = updated_list.map((instruction, index) => {instruction.order = index; return instruction});
        }
    },
    async mounted(){
        const user_type = this.auth.account_type;
        if(!(user_type == "Student" || user_type == "Admin")) this.$router.push({ name: 'Home' });

        
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