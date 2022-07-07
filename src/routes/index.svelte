<script>
	import List from '../lib/list.svelte';
	import AddItemForm from '../lib/AddItemForm.svelte';
	import users from '$lib/data/users.js';
	import tempItems from '$lib/data/items.js';

	const userId = 1
	let items = tempItems;

	const addItem = (event) => {
		console.log(event.detail);
		items.push(event.detail);
		items = [...items];
	};
	const claimItem = (event) => {
		items = items.map((item) => {
			if (item.id === event.detail) {
				const claims = [...item.claimedBy]
				if (claims.includes(userId)) {
					let newClaims = claims.filter(i => i !== userId)
					item.claimedBy = new Set(newClaims)
				} else {
					item.claimedBy = new Set([...claims, userId]);
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
	<h1 class="text-blue-600 font-thin text-3xl my-4 text-center">Ich packe meinen Koffer...</h1>
	<div class="divider font-extralight text-3xl text-neutral-content">~</div>
	<List {items} {userId} on:claim={claimItem} on:delete={deleteItem} />

	<div class="divider font-extralight text-3xl text-neutral-content">~</div>
	<AddItemForm on:addItem={addItem} />
</main>

{#each users as user}
	<h3>{user.id} - {user.name}</h3>
{/each}
