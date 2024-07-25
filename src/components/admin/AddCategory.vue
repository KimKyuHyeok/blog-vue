<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')

const addCategory = async () => {
	try {
		const response = await axios.post('/api/admin/add/category', { title: title.value })

		if (response.status === 200) {
			alert('카테고리 등록이 완료되었습니다.')
			router.push('/admin')
		}
	} catch (err) {
		if (err.response && err.response.status === 400) {
			alert('카테고리 업로드 도중 문제가 발생했습니다.')
		}
	}
}
</script>

<template>
	<div>
		<form @submit.prevent="addCategory">
			<div class="input-group mb-3">
				<h3>카테고리 추가</h3>
				<input v-model="title" type="text" class="form-control" aria-describedby="button-addon2" />
				<button class="btn btn-outline-secondary" type="submit">확인</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.input-group.mb-3 {
	display: flex;
	flex-direction: column;
}

.input-group.mb-3 h3 {
	margin-bottom: 1rem;
}

.input-group.mb-3 .form-control {
	margin-bottom: 0.5rem;
}

.input-group.mb-3 .btn {
	align-self: flex-end;
}
</style>
