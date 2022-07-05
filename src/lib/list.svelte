<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Item from './Item.svelte';
	export let items;
	const handleClaim = (event) => {
		console.log(`clicked id ${event.detail}`)
	}
</script>

<div class="list-container py-6 mb-6">
	{#each items as item}
		<Item {item} on:claim on:delete />
	{/each}
</div>
