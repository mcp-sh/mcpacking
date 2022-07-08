<script>
	import List from '../lib/list.svelte';
	import AddItemForm from '../lib/AddItemForm.svelte';
	import tempItems from '$lib/data/items.js';
	import { userId } from '$lib/stores/userStore.js';

	let items = tempItems;

	const addItem = (event) => {
		console.log(event.detail);
		items.push(event.detail);
		items = [...items];
	};
	const claimItem = (event) => {
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
	const deleteItem = (event) => {
		items = items.filter((item) => item.id !== event.detail);
	};
</script>

<main class="bg-base-100 py-4 px-2 md:px-6 min-h-screen">
	<h1 class="text-primary font-thin text-3xl my-4 text-center">Ich packe meinen Koffer...</h1>
	<h1 class="font-extralight text-3xl text-primary text-center">~</h1>
	<!-- <List {items} on:claim={claimItem} on:delete={deleteItem} /> -->
	<List />

	<AddItemForm on:addItem={addItem} />
</main>
