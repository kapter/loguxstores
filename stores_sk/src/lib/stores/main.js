// import { writable } from 'svelte/store';
import { atom} from 'nanostores';
import { Client, badge, badgeEn, log,buildNewSyncMap } from '@logux/client'
import { onMount } from 'svelte';

const client = new Client({
    subprotocol: '1.0.0',
    server: 'ws://127.0.0.1:31337/',
    userId: 'user',
    token: 'token'
  })

// log(client);

function createCount() {
	const { subscribe, set, update } = atom(0);

	return {
		subscribe: () => client.log.add({ type: 'logux/subscribe', channel: 'counter' }, { sync: true }).then((r)=>{console.log(r);}),
		increment: () => client.sync({ type: 'INC' }).then((r)=>{console.log(r);}),
		decrement: () => {},
		reset: () => set(0)
	};
}
export const count = createCount(0);


// export const userStore = buildNewSyncMap(client, User, {
//     id: nanoid(),
//     login: 'test'
//   })

// client.start();
// 	client.on('counter', (action, meta) => {
// 		console.log('on');
// 		console.log(action);
// 		console.log(meta);
// 	});
// onMount(async () => {
	
	
// });