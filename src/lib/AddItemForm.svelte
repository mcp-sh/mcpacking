<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let newItemTitle = '';
	const addItem = () => {
		const id = Math.floor(Math.random() * 10000);
		console.log(`ich packe meinen Koffer...${id}`);
		console.log(`und bringe ${newItemTitle}`);
		const newItem = {
			id,
			title: newItemTitle,
			suggestedBy: '',
			claimedBy: '',
			claimed: false
		};
		dispatch('addItem', newItem);
		newItemTitle = '';
	};
</script>

<h1 class="text-center font-extralight text-2xl text-blue-600 mb-4">Mehr Zeug</h1>
<div class="add-item-form mb-4">
	<div class="form-control ">
		<label class="input-group">
			<span>Title</span>
			<input
				bind:value={newItemTitle}
				type="text"
				placeholder="Zeug"
				class="input input-bordered w-full"
			/>
		</label>
		<button on:click={addItem} class="btn btn-primary text-primary-content mt-2">Hinzufügen</button>
	</div>
</div>
