<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	import HelloWorld from 'components/HelloWorld.vue';

	export default {
		name: 'Home',
		components: {
			HelloWorld,
		},
		mounted() {
			const socket = io("ws://localhost:8080")
			socket.on("news", (data) => {
				console.info(data)
				socket.emit("my other event", my: 'data')
			})
			console.info(process.env)
		}
	}
</script>
