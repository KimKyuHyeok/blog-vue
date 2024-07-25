<script setup>
import apiClient from "@/config/apiClient";
import { onMounted, ref } from "vue";

const token = localStorage.getItem('token');
const postList = ref([])

onMounted(() => {
    try {
        let url = '/api/admin/list/post'

    apiClient  
        .get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            postList.value = response.data
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        console.log('Post 불러오기 실패 : ', err);
    }

    return {
        postList
    }


})

</script>

<template>
	<nav>
        <ul v-for="post in postList" :key="post" class="post">
            <li>{{  post.id }}</li>
            <li>{{ post.title }}</li>
            <button>수정</button>
            <button>삭제</button>
        </ul>
    </nav>
</template>

<style scoped>

.post {
    display: flex;
}

</style>
