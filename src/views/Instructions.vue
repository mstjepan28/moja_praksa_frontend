<template>
<div class="container mt-3">
    <div class="row option_buttons mt-4">
        <div class="col-md-8"></div>
        <div v-if="!edit_enabled" class="col-md-4">
            <button type="button" class="button_design" v-on:click="switch_edit"> Uredi </button>
        </div>
        <div v-else class="col-md-4">
            <button type="button" class="button_design" v-on:click="set_instructions"> Pohrani promjene </button>
            <button type="button" class="disabled_button" v-on:click="switch_edit"> Odustani </button>
        </div>
    </div>

    <div class="row">
        <h2 class="subtitles" style="margin: 0 0 2% 0">Upute za izvršavanje studentske prakse:</h2>
        
        <div v-if="instructions && !edit_enabled" class="col">
            <h4 class="mt-2" v-bind:key="instruction.order" v-for="instruction in instructions">
                <span class="button_design mr-1">{{instruction.order + 1}}</span>
                {{instruction.text}}
            </h4>
        </div>

        <div v-else-if="edit_enabled" class="col">
            <div class="mt-2" v-bind:key="instruction.order" v-for="instruction in instructions">
                <div class="button_design mr-2" style="text-align: center; width: 5%;">{{instruction.order + 1}}</div>
                <button class="alert_button" style="text-align: center" v-on:click="remove_instruction(instruction.order)">
                    Ukloni <i class="fas fa-times"></i>
                </button>

                <textarea class="instructions_input" v-model="instruction.text"></textarea>
            </div>

            <div class="mt-2">
                <div class="button_design" style="text-align: center; width: 5%;">{{instructions.length + 1}}</div>
                <button class="confirm_button" style="text-align: center" v-on:click="add_instruction">
                    Dodaj <i class="fas fa-check"></i>
                </button>
                <textarea class="instructions_input" v-model="new_instruction" placeholder="Upišite novu uputu!"></textarea>
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
            instructions: [
                {order: 0, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis mollis est quis sollicitudin. Etiam at nisi odio."},
                {order: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis mollis est quis sollicitudin. Etiam at nisi odio."},
                {order: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis mollis est quis sollicitudin. Etiam at nisi odio."},
            ],
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
            this.instructions = Content.getinstruction();
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
    mounted(){
        const user_type = this.auth.account_type;
        if(!(user_type == "Student" || user_type == "Admin")) this.$router.push({ name: 'Home' });

        //this.get_instruction();
    }
}
</script>

<style>
.instructions_input{
    max-height: 90px;
    margin: 0;
    padding: 1%;
}
</style>