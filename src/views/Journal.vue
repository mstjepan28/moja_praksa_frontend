<template>
<div class="journal mt-4">
    <div class="row">
        <h2>Predajte popunjeni dnevnik prakse</h2>
    </div>
    
    
    <div class="row mt-4">
        <div class="drag_and_drop">
            Dnevnik prakse stavite ovdje
        </div>
    </div>


    <div class="row buttons mt-4">
        <div class="col-md-3 col-sm-0"></div>
        <div class="col-md-3 col-sm-12">
            <button type="button" class="button_design mr-4">Spremi</button>
            <button type="button" class="button_design">Odustani</button>            
        </div>
        <div class="col-md-3 col-sm-0"></div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.journal{text-align: center;}
.journal > .row > * {
    display: inline-block;
    margin: 0 auto;
}

.drag_and_drop{
    padding: 10%;

    font-size: 20px;
    color: white;

    border-radius: 10px;
    border: 2px solid #6DD0F6;
    background: rgb(181, 181, 181);
}
</style>