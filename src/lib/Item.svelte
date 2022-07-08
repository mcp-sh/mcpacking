<script>
	export let item;

	import DeleteButton from './components/DeleteButton.svelte';
	import ClaimButton from './components/ClaimButton.svelte';
	import { guests, getGuests } from '$lib/stores/userStore.js';
	import { onMount } from 'svelte';

	onMount(() => {
		getGuests();
	});

	export const getPerson = (id) => {
		// console.log(`getting name for ${id}`);
		const person = $guests.filter((user) => user.id === id);
		return person[0].name;
	};

	$: claimees = [...item.claimed_by];
	$: claimed = claimees.length > 0;
</script>

<div
	class="card card-compact bg-base-200 text-base-content shadow-md mb-3 border-r-green-500 rounded-lg rounded-r-none"
	class:border-r-4={claimed}
>
	<div class="card-body">
		<h2 class="card-title">{item.title}</h2>
		<!-- <p>{item.description}</p> -->
		<div class="card-actions mt-4 justify-between border-t-2 pt-2">
			<div class="action">
				<DeleteButton itemId={item.id} on:delete />

				<ClaimButton itemId={item.id} on:claim />
			</div>
			<div class="people">
				{#if claimed && $guests.length > 0}
					{#each claimees as i}
						<button class="btn btn-info btn-sm ml-2 text-info-content text-xs">
							{getPerson(i)}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
