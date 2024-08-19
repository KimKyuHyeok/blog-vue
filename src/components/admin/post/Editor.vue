<template>
  <div>
    <select id="category" v-model="selectedCategory" class="form-select">
      <option value="" selected disabled>카테고리 선택</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.title }}
      </option>
      <div>{{  categories }}</div>
    </select>
    <input type="text" class="form-control" placeholder="제목을 입력해주세요" v-model="title">
    <div ref="editorRoot"></div>
    <button @click="submitPost">작성하기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor } from '@toast-ui/editor'
import apiClient from '@/config/apiClient'
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref([])
const selectedCategory = ref(null)
const editorRoot = ref(null)
const title = ref('')
const token = localStorage.getItem('token');
let editorInstance = null

const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/api/admin/list/category',
     {
          headers: {
                'Authorization': `Bearer ${token}`
          }
      }
    )
    categories.value = response.data
    console.log(categories.value);
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

onMounted(() => {
  editorInstance = new Editor({
    el: editorRoot.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: '',
    hooks: {
      async addImageBlobHook(blob,callback) {
        const formData = new FormData();
        formData.append('image', blob);

        try {
          const response = await apiClient.post('/api/admin/image-upload', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          })

          if (response.status === 200) {
            const filename = response.data.filename;
            const imageUrl = `http://kyuhyeok.site:8080/image/${filename}`
            callback(imageUrl, '이미지')
          }
        } catch (err) {
          alert('Image Upload Error');
          console.error('Error Upload Image : ', err)
        }
      }
    }
  })
  fetchCategories()
})

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
  }
})

const submitPost = async () => {

  if (selectedCategory.value === null || selectedCategory.value === '') throw alert('카테고리를 선택해주세요.')
  if (title.value === null || title.value === '') throw alert('제목을 입력해주세요.')

  if (editorInstance) {
    const postData = {

    }

    try {
      const response = await apiClient.post('/api/admin/add/post',
        {
          title: title.value,
          content: editorInstance.getHTML(),
          categoryId: selectedCategory.value
        },
        {
          headers: {
                'Authorization': `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        alert('게시글 작성 완료')
        router.go(0)
      }
    } catch (error) {
      console.error('Error submitting post:', error)
    }
  }
}
</script>

<style>
@import url('https://uicdn.toast.com/editor/latest/toastui-editor.min.css');
</style>
