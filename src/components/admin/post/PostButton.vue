<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const postWriteLink = () => {
    router.push('/admin/post-write')
}

const postAdminLink = () => {
    router.push('/admin/post-list')
}
</script>

<template>
	<div>
        <nav>
            <button class="btn btn-outline-primary" @click="postWriteLink">게시글 작성</button>
            <button class="btn btn-outline-warning" @click="postAdminLink">게시글 관리</button>
        </nav>
	</div>
</template>

<style scoped>


</style>
