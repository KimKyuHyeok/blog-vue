<template>
    <div id="main">
        <div class="category-group">
            <AddCategory/>
            <UpdateCategory/>
            <DeleteCategory/>
        </div>
        <div class="button-group">
            <PostButton/>
        </div>
    </div>
</template>

<script>
import AddCategory from '@/components/admin/category/AddCategory.vue';
import UpdateCategory from '@/components/admin/category/UpdateCategory.vue';
import DeleteCategory from '@/components/admin/category/DeleteCategory.vue';
import PostButton from '@/components/admin/post/PostButton.vue';

export default {
    name: 'AdminPage',
    components: {
        AddCategory,
        UpdateCategory,
        DeleteCategory,
        PostButton
    }
}
</script>

<style>

#main {
    flex-direction: column;
}

#password > h1 {
    margin-bottom: 30%;
}

.button-group {
    margin: 10%;
}
</style>