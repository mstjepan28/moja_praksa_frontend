<template>
<div>
    <div class="row">
        <div class="col">{{info.name}}</div>
        <div class="col">{{info.surname}}</div>
        <div class="col">{{info.jmbag}}</div>
        <div class="col">{{info.year}}</div>
    </div>
</div>
</template>

<script>

export default {
    props: ['info'],
    mounted(){
        console.log(this.info)
    }
}
</script>

<style>

</style>