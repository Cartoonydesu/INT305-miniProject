<script setup>
    import { collection, getDoc, getDocs, onSnapshot, orderBy, query, where, limit } from '@firebase/firestore';
    import { ref, onMounted } from 'vue';
    import db from '../firebase/init';
    import ListOrderDetail from '../components/ListOrderDetail.vue'

    const currentLimit = ref(6)
    const orders = ref([])
    const orderRef = collection(db, "orders")
    const filterMode = ref("")
    const filterCompleted = ref("all")
    const startTime = ref()
    const endTime = ref()
    const timeError = ref(false)

    async function getAllOrders(){
        timeError.value = false
        let orderQuery = query(orderRef, orderBy("paidTime", "desc"), limit(currentLimit.value))
        if(filterMode.value=='completedStatus' && filterCompleted.value!='all'){
            if(filterCompleted.value=='completed'){
                orderQuery = query(orderRef, where("completed", "==", true), orderBy("paidTime", "desc"), limit(currentLimit.value))
            }
            else if(filterCompleted.value=='failed'){
                orderQuery = query(orderRef, where("completed", "==", false), orderBy("paidTime", "desc"), limit(currentLimit.value))
            }
        } else if(filterMode.value=='timestampFilter' && startTime!=null && endTime !=null){
            if(startTime.value>endTime.value){
                timeError.value = true
                return
            }
            // orderQuery = query(orderRef, where("paidTime", ">=", new Date(startTime.value)))
            orderQuery = query(orderRef, where("paidTime", ">=", new Date(startTime.value)), where("paidTime", "<=", new Date(endTime.value)))
        }
        onSnapshot(orderRef, async() => {
            orders.value = []
            const orderQuerySnap = await getDocs(orderQuery)
            orderQuerySnap.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                orders.value.push(data)
            })
        })
    }   


    onMounted(() => {
        getAllOrders()
    })




</script>


<template>

    <h1>First {{ currentLimit }} Order</h1>

    <br/>

    <div class="limit">
        <span>Adjust showing limit for the data </span> <input type="number" v-model="currentLimit" class="inputNumber" @click="getAllOrders()"/>
        <button @click="getAllOrders()">Adjust</button>
    </div>

    <br/>

    <div class="filtering">
        <input type="radio" name="filterMode" id="completedStatus" value="completedStatus" v-model="filterMode"/>
        <label for="completedStatus">Filter by completed status</label>
        <br/>
        <div v-if="filterMode=='completedStatus'" style="margin-left:2em;">
            <input type="radio" name="completed" id="all" value="all" v-model="filterCompleted" @click="filterCompleted='all', getAllOrders() "/>
            <label for="all">All</label>
            <input type="radio" name="completed" id="completed" value="completed" v-model="filterCompleted" @click="filterCompleted='completed', getAllOrders()"/>
            <label for="completed">Completed</label>
            <input type="radio" name="completed" id="failed" value="failed" v-model="filterCompleted" @click="filterCompleted='failed', getAllOrders()"/>
            <label for="failed">Failed</label>
        </div>

        <input type="radio" name="filterMode" id="timestampFilter" value="timestampFilter" v-model="filterMode"/>
        <label for="timestampFilter">Filter by timestamp</label>
        <div v-if="filterMode=='timestampFilter'" style="margin-left:2em;">
            <span>Start from </span>
            <input type="datetime-local" v-model="startTime" class="inputTime"/>
            <span> to </span>
            <input type="datetime-local" v-model="endTime" class="inputTime"/>
            <button @click="getAllOrders()">Search</button>
        </div>

    </div>

    <br/>

    <div class="box" v-for="order in orders">
        <!-- {{ order.totalPrice }} -->
        <ListOrderDetail :order="order"/>
    </div>

</template>


<style>

    .box{
        border: 1px solid grey;
        /* background-color: aqua; */
        border-radius: 5px;
        margin: 1em;
        padding: 1em;
    }
    
    input {
        margin-right: 0.5em;
        margin-bottom: 1em;
        font-size: large;
    }

    label{
        margin-right: 1.5em;
        font-size: medium;
        color: hsla(160, 100%, 37%, 1);
        font-weight: 500;
    }
    
    .filtering{
        margin: 0.5em;
        font-size: medium;
    }

    .limit{
        margin-top: 1em;
        margin-left: 1em;
        font-size: medium;
    }

    .inputNumber{
        border-color:  hsla(160, 100%, 37%, 1);
        background-color: rgb(218, 244, 235);;
        border-radius: 5px;
        width: 3em;
    }

    .inputTime{
        border-color:  hsla(160, 100%, 37%, 1);
        background-color: rgb(218, 244, 235);;
        border-radius: 5px;
        width: 14em;
        margin: 0 1em 0 1em;
    }

</style>
