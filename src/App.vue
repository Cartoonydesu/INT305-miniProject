<script>
    // import Order from './view/Order.vue'
    import { RouterLink, RouterView } from 'vue-router'

    // export default {
    //     components: {
    //         ListMenu,
    //         Order
    //     },
    // }

    const a = "hello"


</script>


<template>


    <!-- <div class="mainmenu"> -->
        <router-link class="router" :to="{name: 'menu'}">List menu</router-link>  
        <router-link class="router" :to="{name: 'set-menu'}">List set menu</router-link>
    <!-- </div> -->
        <!-- <RouterLink to="{name: 'menu'}">Hello</RouterLink> -->
        <!-- <Order /> -->
    <br>
    <div>
        <RouterView />
    </div>

</template>


<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    /* navbar {
        background-color: aqua;
    } */
    .mainmenu {
        font-size: x-large;
    }

    div{
        margin: 1em
    }

    .router{
        font-size: x-large;
        margin-right: 5em;
        /* padding: 0.5em;
        background-color: #5bb450;
        border-radius: 20px;
        color: white; */
    }

    /* .navbar p {
    float: right;
    display: block;
    font-weight: bold;
    text-align: center;
    padding: 10px 30px;
    text-decoration: none;
    margin: 0;
    font-size: 18px;
} */
</style>



