<script setup>

    defineEmits(['all', 'burger', 'snack', 'drink'])

</script>

<template>
    
    <div class="radio">
        <input type="radio" name="type" id="all" value="all" checked="checked" @click="($emit('all'))"/> 
        <label for="all">All type</label>

        <input type="radio" name="type" id="burger" value="burger" @click="($emit('burger'))"/> 
        <label for="burger">Burgers only</label>

        <input type="radio" name="type" id="snack" value="snack" @click="($emit('snack'))" /> 
        <label for="snack">Snacks only</label>

        <input type="radio" name="type" id="drink" value="drink" @click="($emit('drink'))"/> 
        <label for="drink">Drinks only</label>
    </div>

</template>


<style scoped>

    input {
        margin: 0.5em;
        font-size: large;
    }

    label{
        margin-right: 1.5em;
        font-size: medium;
    }

</style>