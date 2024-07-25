<script setup>
import PasswordInput from '@/components/PasswordInput.vue'
</script>

<template>
	<div id="main">
		<div id="password">
			<h1>관리자 페이지</h1>
			<PasswordInput />
		</div>
	</div>
</template>

<style scoped>
#main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 50vh;
	width: 100vh;
}

#password > h1 {
	margin-bottom: 30%;
}
</style>
