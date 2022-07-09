<script>
	import Item from './Item.svelte';
	export let items;

	import { supabase } from '$lib/db.js';
	import { getGuests, userId } from '$lib/stores/userStore.js';

	async function getItems() {
		const gotGuests = await getGuests();
		const { data, error } = await supabase.from('items').select('*');
		if (!error && gotGuests) {
			return data;
		}
	}

	const deleteItem = async (event) => {
		const itemId = event.detail;
		console.log(`Received delete Event for item  (${itemId}) from user ${$userId}`);
		const { data, error } = await supabase.from('items').delete().eq('id', itemId);
		if (error) {
			console.log(error);
		} else {
			console.log('Deleted item', data);
			const upd = await getItems();
			items = [...upd];
		}
	};
</script>

<div class="list-container py-6 my-2">
	{#each items as item}
		<Item {item} on:claim on:delete />
	{/each}
</div>
