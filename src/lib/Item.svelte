<script>
  export let item

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  const deleteItem = (id) => {
		console.log(`Deleting item with id ${id}`);
		dispatch('delete', id);
	};
	const claimItem = (id) => {
		console.log(`Claiming item with id ${id}`);
		dispatch('claim', id);
	};

  import DeleteButton from './components/DeleteButton.svelte';
  import ClaimButton from './components/ClaimButton.svelte';

</script>

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
							<DeleteButton />
						</button>
						<button
							on:click={claimItem(item.id)}
							class="btn btn-sm btn-primary"
						>
							<ClaimButton />
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