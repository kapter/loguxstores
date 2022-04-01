<script>
import {count} from "$lib/stores/main.js";
import {client} from "$lib/stores/main.js";
import {worders} from "$lib/stores/main.js";
import { onMount } from 'svelte';

let orders=[];

worders.subscribe(ordersValue => {
	orders=ordersValue;
}); 

let countValue=0;
count.subscribe(ordersValue => {
	countValue=ordersValue;
}); 
</script>
{#if orders}
  {orders.length}  
  {#each orders as order}
    <p>{order.id}</p>
  {/each}
{/if}

<span class="text-2lg">{countValue}</span>
<button on:click={count.increment}>+</button>
<button on:click={count.reset}>0</button>
<button on:click={console.log(orders)}>orders</button>

