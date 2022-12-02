<script setup>
    import { collection, getDocs, onSnapshot, orderBy, query } from '@firebase/firestore';
    import {ref} from 'vue'
    import db from '../firebase/init';

    const prices = ref([])
    const priceRef = collection(db, "foods", props.menu.id, "price")

    const props = defineProps({
        menu: {
            type: Object,
            required: true
        },
    })

    // console.log(props.menu)

    onSnapshot(priceRef, async () => {
        prices.value = []
        const priceQuerySnap = await getDocs(query(priceRef,orderBy("priceBaht")))
        priceQuerySnap.forEach((doc) => {
            let data = doc.data()
            data.id = doc.id
            prices.value.push(data)
        })
    })




</script>


<template>
    <!-- <h3>List menu item.vue</h3> -->
    <span class="foodName">{{ menu.name }}</span>

    <table>
        <tr>
            <td class="header">Description</td>
            <td>{{ menu.description }}</td>
        </tr>
        <tr>
            <td class="header">Ingredients</td>
            <td class="tdBox" v-for="ingredient in menu.ingredients">
                <ul>
                    <li>{{ingredient}}</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td class="header">Price</td>
            <td class="priceTd" v-for="price in prices">
                <table>
                    <tr>
                        <td style="width:4em" class="header">Size</td>
                        <td style="width:6em" class="header">Price</td>
                    </tr>
                    <tr>
                        <td>{{ price.size }}</td>
                        <td>{{ price.priceBaht}} baht</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</template>


<style>
    .header{
        font-weight: 700;
    }

    /* table {
        width: 60em
    } */
    tr{
        width: auto;
    }

    /* td{
        margin: 0.5em
    } */
    
    .tdBox{
        display: block;
        left:0;
        top:0
    }
    
    .foodName{
        font-size: large ;
        color: hsla(160, 100%, 37%, 1);
        font-weight: 700;
    }

    .priceTd{
        display: block;
        border: 1px solid gray;
        margin: 0.5em;
        padding: 0.5em;
    }
</style>
