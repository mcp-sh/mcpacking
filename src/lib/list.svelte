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
</script>

<div class="list-container py-6 my-2">
	{#each items as item}
		<Item {item} on:claim on:delete />
	{/each}
</div>
