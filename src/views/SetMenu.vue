<script setup>
import { collection, getDocs, onSnapshot, query } from '@firebase/firestore';
import { ref } from 'vue';
import { onMounted } from 'vue';
import db from '../firebase/init';

    const setMenus = ref([])
    const setRef = collection(db, "setMenus")
    

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
        })
    }

    onMounted(() => {
        getAllSetMenus()
    })

</script>

<template>
    <h1>Set menu :</h1>
    <div class="box">

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

</style>
