<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import type { Socket } from 'socket.io-client';
    import { onMount } from 'svelte';
    import { getSocket } from '$lib/socket';
	let socket : Socket
	let { children } = $props();

	onMount(()=>{

		socket = getSocket();
		if (!socket.connected){

			socket.connect()
		}

		socket.on("connected",()=>{

			console.log("Connected");
			
		})
		socket.on("connection",()=>{

			console.log("Connected with tion");
			
		})
		//HANDLE INCOMING TRANSMISSIONS OVER HERE
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
