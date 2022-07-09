<script>
	import Item from './Item.svelte';
	// export let items;

	import { supabase } from '$lib/db.js';
	import { getGuests, userId } from '$lib/stores/userStore.js';

	async function getItems() {
		const gotGuests = await getGuests();
		const { data, error } = await supabase.from('items').select('*');
		if (!error && gotGuests) {
			return data;
		}
	}

	const claimItem = async (event) => {
		const itemId = event.detail;

		items = items.map((item) => {
			if (item.id === event.detail) {
				const claims = [...item.claimedBy];
				if (claims.includes($userId)) {
					let newClaims = claims.filter((i) => i !== $userId);
					item.claimedBy = new Set(newClaims);
				} else {
					item.claimedBy = new Set([...claims, $userId]);
				}
			}
			return item;
		});
	};
</script>

<!-- <div class="list-container py-6 my-2">
	{#each items as item}
		<Item {item} on:claim on:delete />
	{/each}
</div> -->

<div class="list-container py-6 my-2">
	{#await getItems()}
		<div class="card bg-base-200 text-base-content shadow-md mb-3 rounded-lg ">
			<div class="card-body">
				<div class="card-title ">Loading ...</div>
			</div>
		</div>
	{:then items}
		{#each items as item}
			<Item {item} on:claim on:delete />
		{/each}
	{/await}
</div>
