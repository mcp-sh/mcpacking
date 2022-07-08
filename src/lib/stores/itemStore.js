import { writable } from 'svelte/store';
import { supabase } from '$lib/db.js';

export const itemsToBring = writable([]);

async function getItems() {
	let { data, error } = await supabase.from('items').select('*');
	if (!error) {
		// console.log('setting guests', data);
		itemsToBring.set(data);
	}
}
getItems();
export { getItems };
