<script setup>
import { collection, getCountFromServer, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { ref } from 'vue';
import { onMounted } from 'vue';
import db from '../firebase/init';
import ListSetMenuDetail from '../components/ListSetMenuDetail.vue'

    const setMenus = ref([])
    const setRef = collection(db, "setMenus")
    const countSetMenus = ref()
    const filterMode = ref()
    const servingRequired = ref()
    const priceFilter = ref()
    const numberFirst = ref()
    const numberLast = ref()
    const priceError = ref(false)
    const rangeError = ref(false)
    

    async function getAllSetMenus(){
        let setQry = query(setRef)
        rangeError.value = false
        priceError.value = false
        if(filterMode.value=='servings' && servingRequired.value!=0){
            setQry = query(setRef, where("servings","==",servingRequired.value))
        } else if(filterMode.value=='price'){
            if(numberFirst.value==null){
                priceError.value = true
                return
            }
            if(priceFilter.value=='cheap'){
                setQry = query(setRef, where('priceBaht','<=',numberFirst.value))
            } else if(priceFilter.value=='expensive'){
                setQry = query(setRef, where('priceBaht','>=',numberFirst.value))
            } else {
                if(numberLast.value==null){
                    priceError.value = true
                    return
                }
                if(numberLast.value<numberFirst.value){
                    rangeError.value = true
                    return
                }
                setQry = query(setRef, where('priceBaht','>=',numberFirst.value), where('priceBaht', '<=', numberLast.value))
            }
        }
        onSnapshot(setQry, async () => {
            setMenus.value = []
            const setQuerySnap = await getDocs(setQry)
            setQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                setMenus.value.push(data)
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
    <div class="filtering">
        <input type="radio" name="filterMode" id="servings" value="servings" v-model="filterMode"/>
        <label for="servings">Filter by number of servings</label>
        <span v-if="filterMode=='servings'">
            <input type="number" v-model="servingRequired" class="inputNumber"/>
            <button @click="getAllSetMenus()">Search</button>
        </span>
        
        <br/>

        <input type="radio" name="filterMode" id="price" value="price" v-model="filterMode"/>
        <label for="price">Filter by price</label>
        <div v-if="filterMode=='price'" style="margin-left: 2em;">
            <select v-model="priceFilter">
                <option disabled value="">Please choose following choice</option>
                <option value="cheap">Cheaper than</option>
                <option value="expensive">More expensive than</option>
                <option value="range">Range between</option>
            </select>
            <span v-if="filterMode=='price' && priceFilter!=null">
                <span v-if="priceFilter=='range'" style="margin-left: 0.5em; font-weight: 600;"> from </span>
                <input type="number" class="inputNumber" style="margin-left: 0.5em; width: 5em;" v-model="numberFirst"/> baht
                <span v-if="priceFilter=='range'" style="margin-left: 0.5em;">
                    <span style=" font-weight: 600;"> to </span> <input type="number" class="inputNumber" style="margin-left: 0.5em; width: 5em;" v-model="numberLast"/> baht
                </span>
                <button @click="getAllSetMenus()" style="margin-left: 0.5em;">Search</button>
                <br/>
                <span v-if="priceError" class="error">Filter needs the input data to query!</span>
                <span v-if="rangeError" class="error">Maximum price is greater than minimum price.</span>
            </span>
        </div>
    </div>

    <br/>

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

    input {
        margin-right: 0.5em;
        margin-bottom: 1em;
        font-size: large;
    }

    label{
        margin-right: 1.5em;
        font-size: medium;
    }

    .filtering{
        margin: 0.5em;
        font-size: medium;
    }

    .inputNumber{
        border-color:  hsla(160, 100%, 37%, 1);
        background-color: rgb(218, 244, 235);;
        border-radius: 5px;
        width: 3em;
    }

    select{
        border-color:  hsla(160, 100%, 37%, 1);
        background-color: rgb(218, 244, 235);;
        padding: 0.5em;
    }

    .error{
        color: red;
        margin-left: 1em;
        font-style: italic;
    }

</style>
