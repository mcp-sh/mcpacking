import { writable } from 'svelte/store';
import { supabase } from '$lib/db.js';

export const guests = writable([]);

async function getGuests() {
	let { data, error } = await supabase.from('guests').select('name,id,age');
	if (!error) {
		// console.log('setting guests', data);
		guests.set(data);
	}
}

// export const getPerson = (id) => {
// 	const person = guests.filter((user) => user.id === id);
// 	return person[0].name;
// };

export const userId = writable(1);

export { getGuests };
