<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Item from './Item.svelte';
	export let items;
	export let userId
	// const handleClaim = (event) => {
	// 	console.log(`clicked id ${event.detail}`)
	// }
</script>

<div class="list-container py-6 mb-6">
	{#each items as item}
		<Item {item} {userId} on:claim on:delete />
	{/each}
</div>
