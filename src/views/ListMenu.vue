<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { collection, onSnapshot, getDocs, query, orderBy, where } from "firebase/firestore"
    import db from '../firebase/init.js'
    import { useRoute } from 'vue-router';
    import ListMenuItem from '../components/ListMenuDetail.vue'
    import FilterMenu from '../components/FilterMenu.vue'


    const foods = ref([])
    const foodRef = collection(db, "foods")
    const route = useRoute()
    const foodType = ref("all")

    async function getAllMenus(){
        console.log("getAllMenu")
        let foodQry
        console.log(foodType.value)
        if(foodType.value=='all' || foodType.value==null){
            foodQry = query(foodRef)
        } else {
            foodQry = query(foodRef,where("type","==",foodType.value))
        }
        onSnapshot(foodQry, async () => {
            foods.value = []
            const foodQuerySnap = await getDocs(foodQry);
            foodQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                foods.value.push(data)
                console.log(data)
            })
        })

    }

    // watch( () => foodType, getAllMenus)

    onMounted(() => {
        getAllMenus()
    })

</script>

<template>

    <h1>Menu : </h1>

    <br/>

    <FilterMenu 
        @all="foodType='all', getAllMenus()"
        @burger="foodType='burger', getAllMenus()"
        @snack="foodType='snack', getAllMenus()"
        @drink="foodType='drink', getAllMenus()"/>

    <br/>

    <div class="box" v-for="food in foods" :key="food.id">
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


