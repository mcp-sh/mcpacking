<script>
	export let item;

	import DeleteButton from './components/DeleteButton.svelte';
	import ClaimButton from './components/ClaimButton.svelte';
	import { guests, getGuests, userId } from '$lib/stores/userStore.js';
	import { supabase } from '$lib/db.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export const getPerson = (id) => {
		if (id === 0) {
			return null;
		}
		const person = $guests.find((guest) => guest.id === id);
		return person.name;
	};

	const claimItem = async () => {
		let { id, claimed_by } = item;
		const newItem = { ...item };
		if (claimed_by.includes($userId)) {
			let newClaims = claimed_by.filter((i) => i !== $userId);
			newItem.claimed_by = new Set(newClaims);
		} else {
			newItem.claimed_by = new Set([...claimed_by, $userId]);
		}
		const { data, error } = await supabase
			.from('items')
			.update({ claimed_by: [...newItem.claimed_by] })
			.eq('id', id);
		if (error) {
			console.error(error);
		} else {
			item = { ...data[0] };
		}
	};

	function deleteItem() {
		dispatch('delete', item.id);
	}

	$: claimees = [...item.claimed_by];
	$: claimed = claimees.length >= 2;
	$: claimedByMe = claimees.includes($userId);
	// $: suggestedBy = getPerson(item.suggested_by);
</script>

<div
	class="card card-compact bg-base-200 text-base-content shadow-md mb-3 border-r-green-500 rounded-lg rounded-r-none"
	class:border-r-4={claimed}
>
	<div class="card-body">
		<div class="card-title ">
			<div class="text-md font-light text-primary">{getPerson(item.suggested_by)}:</div>
			<div>{item.title}</div>
		</div>
		<!-- <p>{item.description}</p> -->
		<div class="card-actions mt-4 justify-between border-t-2 pt-2">
			<div class="action">
				{#if item.suggested_by === $userId}
					<DeleteButton on:delete={deleteItem} />
				{/if}
				<ClaimButton on:claim={claimItem} {claimedByMe} />
			</div>
			<div class="people">
				{#if claimed && $guests.length > 0}
					{#each claimees as i}
						<button
							class:hidden={i === 0}
							class="btn btn-info btn-sm ml-2 text-info-content text-xs"
						>
							{getPerson(i)}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
