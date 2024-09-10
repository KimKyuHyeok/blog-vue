<script setup>
import apiClient from "@/config/apiClient";
import router from "@/router";
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

const deletePost = (postId) => {
    let url = '/api/admin/delete/post'

    apiClient
        .post(url, {id : postId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                alert('정상적으로 삭제되었습니다.');
                router.go(0);
            }
        })
}

const updatePost = (postId) => {
    let url = `http://localhost:3000/admin/post/edit/${postId}`

    router.push({ name: 'PostEditAdmin', params: { postId }});
}

</script>

<template>
	<nav>
        <table id="table">
            <thead>
                <tr>
                    <th scope="col" class="id-col">ID</th>
                    <th scope="col" class="title-col">제목</th>
                    <th scope="col" class="btn-col">버튼</th>
                </tr>
            </thead>
            <tbody v-for="post in postList" :key="post" class="post">
                <tr>
                    <th scope="row">{{ post.id }}</th>
                    <th>{{ post.title }}</th>
                    <th>
                        <div class="button-list">
                            <button class="btn btn-outline-primary" @click="updatePost(post.id)">수정</button>
                            <button class="btn btn-outline-danger" @click="deletePost(post.id)">삭제</button>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>

    </nav>
</template>

<style scoped>

#table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
    /* table-layout: fixed; 고정 레이아웃 사용하지 않음 */
}

#table thead th {
    background-color: #f2f2f2;
    padding: 12px 15px;
    border-bottom: 2px solid #ddd;
    text-align: left;
}

.id-col {
    width: 10%; /* ID 열의 너비 설정 */
}

.title-col {
    max-width: 55%; /* 제목 열의 최대 너비를 설정 */
    padding-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
}

.btn-col {
    width: 15%; /* 버튼 열의 너비를 설정 */
    text-align: right; /* 버튼을 오른쪽으로 고정 */
    padding-right: 15px; /* 브라우저 끝자락에서 떨어뜨림 */
}

#table tbody th,
#table tbody td {
    padding: 12px 15px;
    vertical-align: middle; /* 수직 정렬을 중간으로 설정 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
}

#table tbody th {
    background-color: #fafafa;
}

#table .button-list {
    display: inline-block; /* inline-block으로 변경하여 위치 고정 */
    gap: 10px;
    white-space: nowrap;
}

.btn {
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
}

.btn-outline-primary {
    color: #007bff;
    border: 1px solid #007bff;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.btn-outline-primary:hover {
    background-color: #007bff;
    color: white;
}

.btn-outline-danger {
    color: #dc3545;
    border: 1px solid #dc3545;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
}




</style>
