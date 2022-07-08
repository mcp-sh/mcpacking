<script>
	import { userId } from '$lib/stores/userStore.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let newItemTitle = '';
	const addItem = () => {
		const id = Math.floor(Math.random() * 10000);
		const newItem = {
			id,
			title: newItemTitle,
			suggestedBy: $userId,
			claimedBy: []
		};
		dispatch('addItem', newItem);
		newItemTitle = '';
	};
</script>

<h1 class="font-extralight text-3xl text-primary text-center">~</h1>
<div class="add-item-form my-4">
	<div class="w-full mt-4">
		<form on:submit|preventDefault={addItem}>
			<input
				bind:value={newItemTitle}
				type="text"
				placeholder="Wir brauchen..."
				class="input input-bordered w-full text-center text-xl"
			/>
			<button class="btn btn-primary text-primary-content mt-2 w-full">Hinzufügen</button>
		</form>
	</div>
</div>
