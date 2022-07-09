<script>
	export let item;

	import DeleteButton from './components/DeleteButton.svelte';
	import ClaimButton from './components/ClaimButton.svelte';
	import { guests, getGuests, userId } from '$lib/stores/userStore.js';
	import { supabase } from '$lib/db.js';

	export const getPerson = (id) => {
		const person = $guests.find((guest) => guest.id === id);
		return person.name;
	};

	const claimItem = async () => {
		console.log(`Claiming ${item.title} for ${$userId}`);
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
		if (!error) {
			// console.log('After update', data);
			item = { ...data[0] };
		}
	};

	$: claimees = [...item.claimed_by];
	$: claimed = claimees.length > 0;
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
				<DeleteButton itemId={item.id} on:delete />

				<ClaimButton on:claim={claimItem} />
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
