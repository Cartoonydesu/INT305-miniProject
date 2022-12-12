<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { collection, onSnapshot, getDocs, query, orderBy, where, getCountFromServer } from "firebase/firestore"
    import db from '../firebase/init.js'
    import ListMenuItem from '../components/ListMenuDetail.vue'
    import FilterMenu from '../components/FilterMenu.vue'


    const foods = ref([])
    const foodRef = collection(db, "foods")
    const foodType = ref("all")
    const foodCount = ref()
    const filterMode = ref("")
    const includeIngredient = ref([])

    // const data = db.firestore()
    // console.log(data)

    async function getAllMenus(){
        let foodQry
        foodQry = query(foodRef)
        if(filterMode.value=="type" && foodType.value!="all"){
            foodQry = query(foodRef,where("type","==",foodType.value))
        } else if(filterMode.value=="ingredient" && includeIngredient.value.length>0){
            foodQry = query(foodRef, where('ingredients','array-contains-any',includeIngredient.value))
        }
        
        // includeIngredient.value
        onSnapshot(foodQry, async () => {
            foods.value = []
            const foodQuerySnap = await getDocs(foodQry);
            foodQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                foods.value.push(data)
            })
            const foodQuerySnapCount = await getCountFromServer(foodQry)
            foodCount.value = foodQuerySnapCount.data().count
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

    <div class="filtering">
        <input type="radio" name="filterMode" id="type" value="type" v-model="filterMode"/>
        <label for="type" class="foodName">Filter by food type :</label>
        <br/>
        <FilterMenu v-if="filterMode=='type'" style="margin-left: 2em"
            @all="foodType='all', getAllMenus()"
            @burger="foodType='burger', getAllMenus()"
            @snack="foodType='snack', getAllMenus()"
            @drink="foodType='drink', getAllMenus()"/>

        <input type="radio" name="filterMode" id="ingredient" value="ingredient" v-model="filterMode"/>
        <label for="ingredient" class="foodName">Filter by ingredients :</label>
        <div v-if="filterMode=='ingredient'" style="margin-left: 2em">
            <span class="tell">Menu contains any of these ingredients</span><br/>
            <input type="checkbox" name="ingredient" id="cheese" value="cheese" v-model="includeIngredient"/>
            <label for="cheese">cheese</label>
            <input type="checkbox" name="ingredient" id="milk" value="milk" v-model="includeIngredient"/>
            <label for="milk">milk</label>
            <input type="checkbox" name="ingredient" id="oil" value="oil" v-model="includeIngredient"/>
            <label for="oil">oil</label>
            <button @click="getAllMenus()">Search</button>
        </div>
    </div>

    <br/>
    <span class="foodCount">{{ foodCount }} menus available:</span>
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
        color: hsla(160, 100%, 37%, 1);
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

    .filtering{
        margin: 0.5em;
        font-size: medium;
    }
    
    .tell{
        margin-bottom: 1em;
    }

</style>


