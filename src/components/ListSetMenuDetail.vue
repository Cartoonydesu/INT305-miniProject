<script setup>
    import { collection, getDoc, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { defineProps, ref } from 'vue';
import db from '../firebase/init';

    const foods = ref({})
    const foodRef = collection(db, "setMenus", props.setMenu.id, "food")

    const props = defineProps({
        setMenu: {
            type: Object,
            required: true
        }
    })

    onSnapshot(foodRef, async () => {
        foods.value = []
        const foodQuerySnap = await getDocs(query(foodRef))
        foodQuerySnap.forEach(async (doc) => {
            let data = doc.data()
            data.id = doc.id
            const foodNameRef = collection(db, "foods")
            const foodNameQuerySnap = await getDocs(query(foodNameRef,where("__name__","==",data.foodId)))
            foodNameQuerySnap.forEach((docName) => {
                data.foodName = docName.data().name
            })
            foods.value.push(data)
        })
    })

</script>


<template>
    <span class="foodName">{{ setMenu.name }}</span><br/>
    <span class="description">{{ setMenu.description }}</span><br/>
    <span class="header">Recommended servings : </span><span>{{ setMenu.servings }} peoples</span><br/>
    <span class="header">Price : </span><span>{{ setMenu.priceBaht }} baht</span>

    <table>
        <tr>
            <td class="header">Contains : </td>
            <td class="tdBox">
                <ul v-for="food in foods">
                    <li>{{ food.foodName }} <span class="size"> {{food.size }}</span> x {{ food.amount }}</li>
                </ul>
            </td>
        </tr>
    </table>

</template>


<style>

    .foodName{
        font-size: large ;
        color: hsla(160, 100%, 37%, 1);
        font-weight: 700;
    }

    .description{
        color: grey;
        font-style: italic;
    }

    .header{
        font-weight: 700;
    }

    table, tr, td {
        width: inherit;
    }
    
    .tdBox{
        display: block;
        left:0;
        top:0
    }

    .size{
        /* font-style: italic; */
        font-weight: 500;
        color: hsla(160, 100%, 37%, 1);
    }

</style>
