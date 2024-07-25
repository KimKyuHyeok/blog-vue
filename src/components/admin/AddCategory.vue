<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../config/apiClient';

const router = useRouter()
const title = ref('')
const token = localStorage.getItem('token');

const addCategory = async () => {
	try {
		const response = await apiClient.post('/api/admin/add/category', 
		{ 
			title: title.value,
		}, 
		{
			headers: {
                'Authorization': `Bearer ${token}`
            }
		})

		console.log(response.status);

		if (response.status === 200) {
			alert('카테고리 등록이 완료되었습니다.')
			router.go(0)
		} else {
			alert('에러가 발생했습니다.');
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
		<h5>카테고리 추가</h5>
		<form @submit.prevent="addCategory">
			<div class="input-group mb-3">
				<input v-model="title" type="text" class="form-control" aria-describedby="button-addon2" style="width: 100%;" />
				<button class="btn btn-outline-secondary" type="submit">확인</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.input-group.mb-3 {
	display: flex;
	align-items: center;
	width: 100%;
}
.input-group.mb-3 .form-control {
	width: 100%;
	flex: 1;
}

.input-group.mb-3 .btn {
	margin-left: 0.5rem;
}


</style>
