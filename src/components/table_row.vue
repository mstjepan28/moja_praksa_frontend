<template>
<div>
    <div class="row mt-1 table_row">
        <div class="col">{{info.name}}</div>
        <div class="col">{{info.surname}}</div>
        <div class="col">{{info.jmbag}}</div>
        <div class="col">{{info.year}}</div>

        <div class="col" v-if="info.application">{{info.application.company}}</div>
        <div class="col" v-else> - </div>
    </div>
</div>
</template>

<script>

export default {
    props: ['info'],
}
</script>

<style>
.table_row > .col{
    border: 1px solid black;
}
</style>