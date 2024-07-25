<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../config/apiClient';

const router = useRouter()
const categories = ref('')
const title = ref('')
const selectedCategory = ref('')
const token = localStorage.getItem('token');

onMounted(() => {
    let url = '/api/post/categories'

    apiClient
        .get(url)
        .then((response) => {
            categories.value = response.data
        })
        .catch((err) => {
            console.log(err)
        })
})

const updateCategory = async () => {
	try {
		const response = await apiClient.post('/api/admin/update/category', { 
            title: title.value,
            id: selectedCategory.value,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

		if (response.status === 200) {
			alert('카테고리 수정이 완료되었습니다.')
			router.go(0)
		}
	} catch (err) {
		if (err.response && err.response.status === 400) {
			alert('카테고리 수정 도중 문제가 발생했습니다.')
		}
	}
}
</script>

<template>
	<div>
		<h5>카테고리 수정</h5>
		<form @submit.prevent="updateCategory">
            <select id="categorySelect" v-model="selectedCategory" class="form-select">
                <option value="" selected disabled>카테고리 선택</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.title }}
                </option>            
            </select>
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
