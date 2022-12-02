<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { collection, onSnapshot, getDocs, query, orderBy } from "firebase/firestore"
    import db from '../firebase/init.js'
    import { useRoute } from 'vue-router';
    import ListMenuItem from '../components/ListMenuDetail.vue'

    const foods = ref([])
    const foodRef = collection(db, "foods")
    const route = useRoute()

    // getAllMenus()


    async function getAllMenus(){
        console.log("getAllMenu")
        const foodQry = query(foodRef)
        // const foodQuerySnap = await getDocs(foodQry, orderBy("type"));
        onSnapshot(foodQry, async () => {
            foods.value = []
            const foodQuerySnap = await getDocs(foodQry);
            foodQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                // data.ingredients = doc.ingredients
                foods.value.push(data)
                console.log(data)
                // console.log(data.ingredients)
            })
        })

    }

    // watch( () => route, getAllMenus)

    onMounted(() => {
        getAllMenus()
    })

</script>

<template>
    <h1>Menu : </h1>

    <div class="box" v-for="food in foods" :key="food.id">
        <!-- <span class="foodName">{{ food.name }}</span> -->
        <ListMenuItem :menu="food"/>

    </div>

</template>

<style scoped>
    .box{
        border: 1px solid grey;
        /* background-color: aqua; */
        border-radius: 5px;
        margin: 1em;
        padding: 1em;
    }
    
    .foodName{
        font-size: large;
        font-weight: 500;
    }

</style>


