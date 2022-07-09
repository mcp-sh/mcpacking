<script>
	import List from '../lib/list.svelte';
	import AddItemForm from '../lib/AddItemForm.svelte';
	import { userId, getGuests } from '$lib/stores/userStore.js';
	import { supabase } from '$lib/db.js';
	import { onMount } from 'svelte/internal';

	let items;

	const addItem = async (event) => {
		const newItem = event.detail;
		console.log(`Adding item with user ${$userId}`, newItem);
		const { data, error } = await supabase
			.from('items')
			.insert([{ title: newItem.title, suggested_by: $userId }]);
		if (!error) {
			const toAdd = data[0];
			items = [...items, toAdd];
		} else {
			console.error(error);
		}
	};

	const deleteItem = async (event) => {
		const itemId = event.detail;
		console.log(`Received delete Event for item  (${itemId}) from user ${$userId}`);
		const { data, error } = await supabase.from('items').delete().eq('id', itemId);
		if (error) {
			console.error(error);
		} else {
			const upd = await getItems();
			items = [...upd];
		}
	};

	async function getItems() {
		const gotGuests = await getGuests();
		const { data, error } = await supabase.from('items').select('*');
		if (!error && gotGuests) {
			return data;
		}
	}

	onMount(async () => {
		const data = await getItems();
		items = [...data];
	});
</script>

<main class="bg-base-100 py-4 px-2 md:px-6 min-h-screen">
	<h1 class="text-primary font-thin text-3xl my-4 text-center cursor-default">
		Ich packe meinen Koffer...
	</h1>
	<h1 class="font-extralight text-3xl text-primary text-center cursor-default">~</h1>
	{#if !items}
		<div class="card bg-base-200 text-base-content shadow-md mb-3 rounded-lg ">
			<div class="card-body">
				<div class="card-title ">Loading ...</div>
			</div>
		</div>
	{:else}
		<List {items} on:delete={deleteItem} />
	{/if}

	<AddItemForm on:addItem={addItem} />
</main>
