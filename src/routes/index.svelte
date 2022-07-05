<script>
	let items = [
		{
			id: 1,
			suggestedBy: 'Max',
			title: 'Badminton Set',
			claimed: false,
			claimedBy: []
		},
		{
			id: 2,
			suggestedBy: 'Nadia',
			title: 'Bite Away',
			claimed: true,
			claimedBy: ['Max']
		},
		{
			id: 3,
			suggestedBy: 'Max',
			title: 'Karten',
			claimed: false,
			claimedBy: []
		}
	];

	import List from '../lib/list.svelte';
	import AddItemForm from '../lib/AddItemForm.svelte';

	const addItem = (event) => {
		console.log('Received event');
		console.log(event.detail);
		items.push(event.detail);
		items = [...items];
	};
	const claimItem = (event) => {
		console.log('Received claim event');
		items = items.map((item) => {
			if (item.id === event.detail) {
				item.claimed = !item.claimed;
			}
			return item;
		});
	};
	const deleteItem = (event) => {
		console.log('Received delete event');
		items = items.filter((item) => item.id !== event.detail);
	};
</script>

<main class="bg-base-100 py-4 px-2 md:px-6 min-h-screen">
	<h1 class="text-blue-600 font-extralight text-3xl my-4 text-center">Urlaubs Bringliste</h1>
	<div class="divider font-extralight text-3xl text-neutral-content">~</div>
	<List {items} on:claim={claimItem} on:delete={deleteItem} />
	<div class="divider font-extralight text-3xl text-neutral-content">~</div>
	<AddItemForm on:addItem={addItem} />
</main>
