<script setup>
import { collection, getCountFromServer, getDocs, onSnapshot, query } from '@firebase/firestore';
import { ref } from 'vue';
import { onMounted } from 'vue';
import db from '../firebase/init';
import ListSetMenuDetail from '../components/ListSetMenuDetail.vue'

    const setMenus = ref([])
    const setRef = collection(db, "setMenus")
    const countSetMenus = ref()
    

    async function getAllSetMenus(){
        console.log("getAllSetMenus")
        const setQry = query(setRef)
        onSnapshot(setQry, async () => {
            setMenus.value = []
            const setQuerySnap = await getDocs(setQry)
            setQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                setMenus.value.push(data)
                console.log(data)
            })
            const countSetQuerySnap = await getCountFromServer(setQry)
            countSetMenus.value = countSetQuerySnap.data().count
        })
    }

    onMounted(() => {
        getAllSetMenus()
    })


</script>

<template>
    <h1>Set menu :</h1>
    <br/>
    <!-- <h4>Filter by :</h4> -->
    <!-- <input type="radio" id="foodType"/>
    <label for="foodType">Burger only</label> -->

    <span class="foodCount">{{ countSetMenus }} sets available</span>
    <br/>

    <div class="box" v-for="setMenu in setMenus" :key="setMenu.id">
        <ListSetMenuDetail :setMenu="setMenu"/>
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

    
    .foodCount{
        font-size: large;
        font-weight: 500;
        margin: 0.5em;
        font-weight: 500;
        color: grey;
        /* color: hsla(160, 100%, 37%, 1); */
    }

    input {
        margin-right: 0.5em;
        margin-bottom: 1em;
        font-size: large;
    }

    label{
        margin-right: 1.5em;
        font-size: medium;
    }


</style>
