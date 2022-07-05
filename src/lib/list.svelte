<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let items;
	const deleteItem = (id) => {
		console.log(`Deleting item with id ${id}`);
		dispatch('delete', id);
	};
	const claimItem = (id) => {
		console.log(`Claiming item with id ${id}`);
		dispatch('claim', id);
	};
</script>

<div class="list-container py-6 mb-6">
	{#each items as item}
		<div
			class="card card-compact bg-base-200 text-base-content shadow-md mb-3 border-r-green-500 rounded-lg rounded-r-none"
			class:border-r-4={item.claimed}
		>
			<div class="card-body">
				<h2 class="card-title">{item.title}</h2>
				<!-- <p>{item.description}</p> -->
				<div class="card-actions mt-4 justify-between border-t-2 pt-2">
					<div class="action">
						<button on:click={deleteItem(item.id)} class="btn btn-sm btn-error">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
						<button
							on:click={claimItem(item.id)}
							class="btn btn-sm btn-primary text-primary-content"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div class="people">
						{#if item.claimedBy.length > 0}
							<button class="btn btn-info btn-sm text-info-content text-xs">{item.claimedBy}</button
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
