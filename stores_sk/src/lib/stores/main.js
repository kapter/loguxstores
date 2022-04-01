// import { writable } from 'svelte/store';
import { atom} from 'nanostores';
import { Client, badge, badgeEn, log,buildNewSyncMap } from '@logux/client'
import { onMount } from 'svelte';
import { writable } from 'svelte/store';


export const client = new Client({
    subprotocol: '1.0.0',
    server: 'ws://localhost:31337/',
    userId: 'user',
    token: 'token'
  })

client.start();
export let worders = writable([]);

client.log.add({ type: 'logux/subscribe', channel: 'point/ggg' }, { sync: true }).then(()=>
	client.on('add', (action, meta) => {
		console.log("add");
		console.log(action);
		if (action.type == 'orders_changed'){
			worders.set(action.orders);
		}
	})
);
// worders.subscribe(ordersValue => {
// 	console.log(ordersValue);
// }); 


log(client);

// function createCount() {
// 	const { subscribe, set, update } = writable(0);

// 	return {
// 		subscribe,
// 		increment: () => {console.log("store increment");client.sync({type: 'INC'}).then((r,data)=>{console.log(r);console.log(data);})},
		
// 	};
// }

export const count = writable(0);
client.log.add({ type: 'logux/subscribe', channel: 'counter' }, { sync: true }).then(
	() => client.on('add', (action, meta) => {
		console.log("add");
		console.log(action);
		if (action.type == 'counter'){
			console.log(action.value);
			count.set(action.value);
			console.log("set value");
		}
	})
);