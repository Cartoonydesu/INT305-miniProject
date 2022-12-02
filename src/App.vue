<script>
    import ListMenu from './components/ListMenu.vue'
    import Order from './view/Order.vue'

    export default {
        components: {
            ListMenu,
            Order
        },
    }


</script>


<template>

    const a = "hello"

    <div class="navbar">Navbar</div>

    <!-- <navbar> hello </navbar> -->

    <!-- <h1>App.vue</h1> -->

    <div>
        <p>App: ListMenu</p>
        <ListMenu :test="a" />
        <Order />
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



