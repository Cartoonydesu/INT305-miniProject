<script setup>
    import {collection,deleteDoc,getCountFromServer,getDoc,getDocs,onSnapshot,query,where, } from '@firebase/firestore'
    import { ref, onMounted } from 'vue'
    import db from '../firebase/init'

    const props = defineProps({
        order: {
            type: Object,
            required: true,
        },
    })
    const date = new Date(props.order.paidTime.toDate())
    const orderings = ref([])
    const orderingRef = collection(db, 'orders', props.order.id, 'ordering')
    const countOrdering = ref()

    async function getAllOrdering() {
        onSnapshot(orderingRef, async () => {
            orderings.value = []
            const orderingQuery = query(orderingRef)
            const orderingQuerySnap = await getDocs(orderingQuery)
            orderingQuerySnap.forEach(async (doc) => {
            let data = doc.data()
            data.id = doc.id
            let foodRef = collection(db, 'foods')
            let foodQuery
            let foodQuerySnap
            if (data.foodId != null) {
                foodQuery = query(foodRef, where('__name__', '==', data.foodId))
                foodQuerySnap = await getDocs(foodQuery)
                foodQuerySnap.forEach(async (docFood) => {
                data.type = 'foods'
                data.name = docFood.data().name
                const priceRef = collection(db, 'foods', data.foodId, 'price')
                // onSnapshot(priceRef, async () => {
                // console.log(data.size)
                const priceQuery = query(priceRef, where('size', '==', data.size))
                const priceQuerySnap = await getDocs(priceQuery)
                priceQuerySnap.forEach((docPrice) => {
                    data.priceBaht = docPrice.data().priceBaht
                    // console.log(data.priceBaht)
                    orderings.value.push(data)
                })
                // })
                })
            } else {
                foodRef = collection(db, 'setMenus')
                foodQuery = query(foodRef, where('__name__', '==', data.setId))
                foodQuerySnap = await getDocs(foodQuery)
                foodQuerySnap.forEach((docFood) => {
                data.type = 'sets'
                data.name = docFood.data().name
                data.priceBaht = docFood.data().priceBaht
                orderings.value.push(data)
                })
            }
            // console.log(data)
            })
            const countOrderingQuerySnap = await getCountFromServer(orderingQuery)
            countOrdering.value = countOrderingQuerySnap.data().count
        })
    }

    onMounted(() => {
        getAllOrdering()
    })
</script>

<template>
  <table>
    <tr>
      <td class="header">Order ID:</td>
      <td>{{ props.order.id }}</td>
    </tr>
    <tr>
      <td class="header">Paid time:</td>
      <td>
        {{ date.getDate() }}/{{
          date.getMonth() == 0 ? 12 : date.getMonth()
        }}/{{ date.getFullYear() + 52 }}
        {{ date.getHours() < 10 ? '0' + date.getHours() : date.getHours() }}:{{
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        }}:{{
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        }}
      </td>
    </tr>
    <tr>
      <td class="header">Number of customers:</td>
      <td>{{ props.order.numCus }}</td>
    </tr>
    <tr>
      <td class="header">Status:</td>
      <td v-if="props.order.completed == true" class="completed">Completed</td>
      <td v-else class="failed">Failed / Cancel</td>
    </tr>
  </table>

  <hr />

  <h4 class="main">Orders ({{ countOrdering }})</h4>
  <table>
    <tr>
      <td class="header" style="padding-right: 5em">Menus</td>
      <td class="header">Size</td>
      <td class="header">Amount</td>
      <td class="header" style="text-align: right">Price</td>
    </tr>
    <tr v-for="ordering in orderings">
      <td v-if="ordering.type === 'sets'" colspan="2">{{ ordering.name }}</td>
      <td v-if="ordering.type === 'foods'">{{ ordering.name }}</td>
      <td v-if="ordering.type === 'foods'">{{ ordering.size }}</td>
      <td class="number">{{ ordering.amount }}</td>
      <td class="number">฿{{ ordering.priceBaht * ordering.amount }}</td>
    </tr>
    <hr />
    <tr>
      <td class="total" colspan="3">Total</td>
      <td class="total" style="text-align: right">
        ฿{{ props.order.totalPrice }}
      </td>
    </tr>
    <hr />
    <tr>
      <td class="header" colspan="3">Paid</td>
      <td class="header" style="text-align: right">฿{{ props.order.paid }}</td>
    </tr>
    <tr>
      <td class="header" colspan="3">Change</td>
      <td class="header" style="text-align: right">
        ฿{{ props.order.change }}
      </td>
    </tr>
  </table>
</template>

<style>
.header {
  font-weight: 700;
}

table,
tr {
  width: inherit;
}

td {
  width: inherit;
  margin: 0.5em;
  padding-right: 2em;
}

.total {
  font-weight: 700;
  font-size: x-large;
  color: hsla(160, 100%, 37%, 1);
}

.number {
  text-align: right;
}

hr {
  margin: 1em;
  border-width: 2px;
  border-style: dotted;
}

.main {
  font-size: large;
  color: hsla(160, 100%, 37%, 1);
  font-weight: 700;
}

.completed {
  font-weight: 500;
  color: hsla(160, 100%, 37%, 1);
}

.failed {
  font-weight: 500;
  color: red;
}
</style>
