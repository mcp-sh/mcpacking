<script>
	import Item from './Item.svelte';
	// export let items;

	import { supabase } from '$lib/db.js';

	async function getItems() {
		const { data, error } = await supabase.from('items').select('*');
		if (!error) {
			return data;
		}
	}
</script>

<!-- <div class="list-container py-6 my-2">
	{#each items as item}
		<Item {item} on:claim on:delete />
	{/each}
</div> -->

<div class="list-container py-6 my-2">
	{#await getItems()}
		<p>Fetching Data</p>
	{:then data}
		{#each data as item}
			<Item {item} on:claim on:delete />
		{/each}
	{/await}
</div>
